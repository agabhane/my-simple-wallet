import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import store from '../../store';
import { isUserSignedIn } from '../auth/auth';


export function addCategory(category) {
    const db = firebase.firestore();
    return db.collection('categories').add(category);
}

export async function getCategories() {
    await isUserSignedIn();
    const db = firebase.firestore();
    return db.collection('categories')
        .where("userId", "==", store.getState().auth.user.uid)
        .orderBy("name")
        .get()
        .then(querySnapshot => {
            let docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            })
            return docs;
        });
}