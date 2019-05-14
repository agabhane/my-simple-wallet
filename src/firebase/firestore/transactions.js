import * as firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../../store';
import { Promise } from 'es6-promise';


export function addTransaction(transaction) {
    const db = firebase.firestore();
    return db.collection('transactions').add(transaction)
        .then(response => {
            console.log(response);
            return response;
        }, (error) => {
            console.log(error);
        })
}

export function getTransactions() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const db = firebase.firestore();
                db.collection('transactions')
                    .where("userId", "==", store.getState().auth.user.uid)
                    .where("year", "==", store.getState().activeDate.year)
                    .where("month", "==", store.getState().activeDate.month)
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