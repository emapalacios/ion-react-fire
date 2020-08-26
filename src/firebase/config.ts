import * as firebase from 'firebase';
import { toast } from '../toast';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
}

firebase.initializeApp( config );

export async function loginUser( email: string, password: string) {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);

        return res;
    } catch(error){
        console.log(error);
        toast(error.message)
        return false;
    }
}

export function getCurrentUser(){
    return new Promise( (resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged( user => {
            if( user ) {
                resolve(user)
            } else {
                resolve(null)
            }
            unsubscribe()
        })
    }) 
}

export async function registerUser(email: string, password: string) {
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(
            email, password
        )
        console.log(res)
        return true
    } catch(error){
        console.log(error)
        toast(error.message)
        return false
    }
}

export function logoutUser(){
    return firebase.auth().signOut()
}