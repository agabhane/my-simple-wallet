import { UPDATE_TRANSACTION_FIELD, RESET_TRANSACTION, GET_TRANSACTIONS, GET_TRANSACTION_GROUPS } from './types';
import store from '../store';
import {
    addTransaction as addTransactionFirebase,
    getTransactions as getTransactionsFirebase
} from '../firebase/firestore/transactions';
import { getCategories } from './categoryActions';
import { Promise } from 'es6-promise';
let _filter = require("lodash/filter");
let _sumBy = require('lodash/sumBy');
let _forEach = require('lodash/forEach');

export function updateTransactionField(field, value) {
    return {
        type: UPDATE_TRANSACTION_FIELD,
        payload: {
            field,
            value
        }
    };
};

export function resetTransactionField() {
    return {
        type: RESET_TRANSACTION,
        payload: {
            ...store.getState().activeDate,
        }
    };
};

export async function addTransaction(transaction) {
    return await addTransactionFirebase({
        ...transaction,
        userId: store.getState().auth.user.uid
    });
};

export function getTransactions() {
    return async function (dispatch) {
        let transactions = await getTransactionsFirebase();
        dispatch({
            type: GET_TRANSACTIONS,
            payload: transactions
        })
    }
};

function groupTransactions(categories, transactions) {
    let trxGroup = [];
    _forEach(categories, (category) => {
        let categoryGroup = { ...category };
        categoryGroup.transactions = _filter(transactions, { 'categoryId': category.id });
        categoryGroup.transactionsSum = _sumBy(categoryGroup.transactions, 'amount');
        trxGroup.push(categoryGroup);
    });
    return trxGroup;
}

export function getTransactionGroups() {
    return async function (dispatch, getState) {
        await Promise.all([dispatch(getCategories()), dispatch(getTransactions())]);

        let transactionGroups = groupTransactions(getState().categories, getState().transactions.list);
        return dispatch({
            type: GET_TRANSACTION_GROUPS,
            payload: transactionGroups
        })
    }
};



