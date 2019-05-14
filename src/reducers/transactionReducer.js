import { UPDATE_TRANSACTION_FIELD, RESET_TRANSACTION } from '../actions/types';
import { DateTime } from 'luxon';

const initialState = {
    year: DateTime.local().year,
    month: DateTime.local().month,
    date: DateTime.local().toISODate(),
    categoryId: null,
    desc: '',
    amount: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_TRANSACTION_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };

        case RESET_TRANSACTION:
            return {
                ...initialState,
                year: action.payload.year,
                month: action.payload.month
            }
        default:
            return state;
    }
}