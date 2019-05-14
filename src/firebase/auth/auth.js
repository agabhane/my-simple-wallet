import firebase from 'firebase/app';
import 'firebase/auth';

export function signIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}