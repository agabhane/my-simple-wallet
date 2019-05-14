import { GET_TRANSACTIONS, GET_TRANSACTION_GROUPS } from '../actions/types';

const initialState = {
    list: [],
    groups: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                list: action.payload
            };
        case GET_TRANSACTION_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        default:
            return state;
    }
}