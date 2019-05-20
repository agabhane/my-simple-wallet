import firebase from 'firebase/app';
import 'firebase/auth';
import { Promise } from 'es6-promise'

let onAuthStateChangedPromise;

export function signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

export function isUserSignedIn() {
    return onAuthStateChangedPromise;
}

export function onAuthStateChanged() {
    onAuthStateChangedPromise = new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let { displayName, email, emailVerified, phoneNumber, photoURL, uid } = user;
                resolve({
                    displayName,
                    email,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    uid
                });
            } else {
                reject('User is not logged in');
            }
        })
    });
    return onAuthStateChangedPromise;
}