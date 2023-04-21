import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { database, storage } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { addDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [percent, setPercent] = useState(0);
  function handleChange(e) {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) {
      console.log("noner");
      return;
    }

    const id = uuidV4();
    setUploadingFiles((prev) => [
      ...prev,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const folderPath = currentFolder.path.map((a) => a.name);
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${folderPath.join("/")}/${file.name}`
        : `${folderPath.join("/")}/${currentFolder.name}/${file.name}`;

    const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prev) =>
          prev.map((uploadfile) => {
            if (uploadfile.id === id) {
              return { ...uploadfile, progress: progress };
            }
            return uploadfile;
          })
        );
      },
      (err) => {
        console.log(err);
        setUploadingFiles((prev) => {
          return prev.map((uploadfile) => {
            if (uploadfile.id === id) {
              return { ...uploadfile, error: true };
            }
            return uploadfile;
          });
        });
      },
      () => {
        setUploadingFiles((prev) => {
          return prev.filter((uf) => uf.id !== id);
        });
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            const q= query(database.files,where("name","==",file.name),where("userId","==",currentUser.uid),where("folderId","==",currentFolder.id));
            getDocs(q).then((doc)=>{
                const exisiting = doc.docs[0];
                if(exisiting) {
                    updateDoc(database.files,exisiting).then((dc)=>{
                        console.log("value updated");
                    })
                }else{
                    addDoc(database.files, {
                        url: url,
                        name: file.name,
                        createdAt: database.getCurrentTimestamp,
                        folderId: currentFolder.id,
                        userId: currentUser.uid,
                      });
                }
            });
        });
      }
    );
  }
  console.log(uploadingFiles);
  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0 mx-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleChange}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        ></input>
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "350px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                // onClose={() => {
                //   setUploadingFiles((prev) => {
                //     return prev.filter((f) => {
                //       return f.id !== file.id;
                //     });
                //   });
                // }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {" "}
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    variant={file.error ? "danger" : "success"}
                    animated={file.error}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
