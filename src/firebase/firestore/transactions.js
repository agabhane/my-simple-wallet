import * as firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../../store';
import { isUserSignedIn } from '../auth/auth';


export function addTransaction(transaction) {
    const db = firebase.firestore();
    return db.collection('transactions').add(transaction)
        .then(response => {
            return response;
        }, (error) => {
            console.log(error);
            return error;
        })
}

export async function getTransactions() {
    await isUserSignedIn();
    const db = firebase.firestore();
    return db.collection('transactions')
        .where("userId", "==", store.getState().auth.user.uid)
        .where("year", "==", store.getState().activeDate.year)
        .where("month", "==", store.getState().activeDate.month)
        .get()
        .then(querySnapshot => {
            let docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id });
            })
            return docs;
        });
}