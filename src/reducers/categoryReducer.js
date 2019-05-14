import { UPDATE_CATEGORY_FORM_FIELD, RESET_CATEOGRY } from '../actions/types';
import { DateTime } from 'luxon';

const initialState = {
    name: '',
    type: 'EXPENSE',
    amount: '',
    isRecurring: false,
    year: DateTime.local().year,
    month: DateTime.local().month
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_CATEGORY_FORM_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case RESET_CATEOGRY:
            return {
                ...state,
                name: '',
                type: 'EXPENSE',
                amount: '',
                isRecurring: false,
                ...action.payload
            };
        default:
            return state;
    }
}