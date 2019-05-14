import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import store from '../../store';
import { Promise } from 'es6-promise';


export function addCategory(category) {
    const db = firebase.firestore();
    return db.collection('categories').add(category);
}

export function getCategories() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const db = firebase.firestore();
                db.collection('categories')
                    .where("userId", "==", store.getState().auth.user.uid)
                    .get()
                    .then(querySnapshot => {
                        let docs = [];
                        querySnapshot.forEach(doc => {
                            docs.push({ ...doc.data(), id: doc.id });
                        })
                        resolve(docs);
                    });
            } else {
                this.props.history.push('/auth');
                reject(Error('User is not logged in'));
            }
        });
    })

}