import {auth} from "./firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
export const doCreateUserWithEmailAndPassword=async (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
}

export const doSignInWithEmailAndPassword=(email,password)=>{
    try{
    return signInWithEmailAndPassword(auth,email,password)
    }
    catch(err){
        console.log(err)
    }
}

export const doSignInWithGoogle=async()=>{
    try{
const provider=new GoogleAuthProvider();
const result=await signInWithPopup(auth,provider);
return result
    }
    catch(err){
    console.log(err)
    }
}

export const doSignOut=()=>{
    return auth.signOut()
}