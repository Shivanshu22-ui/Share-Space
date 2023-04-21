import React from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";

import NavbarComponent from "./NavbarComponent";
import AddFolderButton from "./AddFolderButton";
import SingleFolder from "./SingleFolder";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation, useParams } from "react-router-dom";
import FolderBreadCrums from "./FolderBreadCrums";
import AddFileButton from "./AddFileButton";
import SingleFile from "./SingleFile";

export default function Dashboard() {
  const {currentUser} = useAuth();
  const {folderId} = useParams();
  // const {state} = useLocation();
  const {folder, childFolders , childFiles} = useFolder(folderId);

  if(currentUser==null){
    return <Navigate replace to="/login"/>;
  }
  return (
    <>
      <NavbarComponent />
      <Container fluid className="my-2">
        <div className="d-flex align-items-center">
        <FolderBreadCrums currentFolder={folder}/>
        <AddFileButton currentFolder={folder}/>
        <AddFolderButton currentFolder ={folder}/>
        </div>
       {childFolders.length>0 && (
       <div className="d-flex flex-wrap">
        {childFolders.map(fold=>(
          <div key={fold.id} style={{maxWidth:'250px'}} className="p-2">
            <SingleFolder foldr = {fold}/>
          </div>
        ))}
       </div>
       )}
       {childFolders.length>0 && childFiles.length>0 && <hr/>}
       {childFiles.length>0 && (
       <div className="d-flex flex-wrap">
        {childFiles.map(file=>(
          <div key={file.id} style={{maxWidth:'250px'}} className="p-2">
            <SingleFile file = {file}/>
          </div>
        ))}
       </div>
       )}
      </Container>
    </>
  );
}
