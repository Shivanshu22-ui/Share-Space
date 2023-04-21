import React, {  useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import { database } from '../../firebase'
import { addDoc } from 'firebase/firestore'
import { useAuth } from '../../context/AuthContext'
import { ROOT_FOLDER } from '../../hooks/useFolder'

export default function AddFolderButton({currentFolder}) {
    const [open,setOpen] = useState(false);
    const [name,setname]  = useState('');
    const { currentUser} = useAuth();

    function openModal(){
        setOpen(true);
    }
    function closeModal(){
        setOpen(false)
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(currentFolder === null) return;

        const path =[...currentFolder.path];
        if(currentFolder !==ROOT_FOLDER){
            path.push({name:currentFolder.name,id:currentFolder.id})
        }
        await addDoc(database.folders,{
            name : name,
            userId : currentUser.uid,
            parentId:currentFolder.id,
            path:path,
            createdAt:database.getCurrentTimestamp,
        }).then(()=>{
            console.log("added folder");
        })
        .catch(err=>{
            console.log(err);
        })
        setname("");
        closeModal();
    }
  return (
    <>
    <Button onClick={openModal} variant='outline-success' size='sm'>
        <FontAwesomeIcon icon={faFolderPlus}/>
    </Button>
    <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control
                    type='text'
                    required
                    value={name}
                    onChange={(e)=>setname(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeModal}>Close</Button>
                <Button variant='success' type='submit'>Add Folder</Button>
            </Modal.Footer>
        </Form>
    </Modal>
    </>
  )
}
