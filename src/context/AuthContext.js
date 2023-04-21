import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase'
import {  createUserWithEmailAndPassword ,sendPasswordResetEmail,signInWithEmailAndPassword , signOut , updatePassword ,updateEmail  } from 'firebase/auth';
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true);

    function signup(email,password) {
        // await createUserWithEmailAndPassword(auth,email,password).then(user=>{
        //     console.log(user);
        // }).catch((error)=>{
        //     console.log(error);
        // })

        return createUserWithEmailAndPassword(auth,email,password);
    }

    function login(email,password){
        console.log(email,password);
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth);
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth,email);
    }

    function updatemail(email){
        return updateEmail(currentUser,email);
    }
    function updatepassword(password){
        return updatePassword(currentUser,password);
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    },[])

    const value = {
        login,
        signup,
        logout,
        resetPassword,
        updatemail,
        updatepassword,
        currentUser,
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
