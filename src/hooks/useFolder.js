import { useEffect, useReducer } from "react";
import { database } from "../firebase";
import { doc, getDoc, onSnapshot, orderBy, query , where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ACTIONS = {
  SELECT_FOLDER: "selectFolder",
  UPDATE_FOLDER: "updateFolder",
  SET_CHILD_FOLDER: "setChildFolder",
  SET_CHILD_FILES: "setChildFiles",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDER:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  
  const { currentUser} = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
    getDoc(doc(database.folders, folderId))
      .then((doc) => {
        const formattedDoc = database.formatDoc(doc);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: formattedDoc },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(()=>{
    const q = query(database.folders,where("parentId","==",folderId),where("userId","==",currentUser.uid),
    orderBy("createdAt")
    );
    onSnapshot(q,(snapshot)=>{
        dispatch({type: ACTIONS.SET_CHILD_FOLDER, payload:{childFolders: snapshot.docs.map(database.formatDoc)}})
    })
  },[folderId,currentUser])


  useEffect(()=>{
    const q = query(database.files,where("folderId","==",folderId),where("userId","==",currentUser.uid),
    // orderBy("createdAt")
    );
    onSnapshot(q,(snapshot)=>{
        dispatch({type: ACTIONS.SET_CHILD_FILES, payload:{childFiles: snapshot.docs.map(database.formatDoc)}})
    })
  },[folderId,currentUser])
  return state;
}
