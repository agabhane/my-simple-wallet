import { SET_ACTIVE_DATE } from '../actions/types';
import { DateTime } from 'luxon';

const { year, month, day, monthLong } = DateTime.local();

const initialValue = {
    year,
    month,
    monthLong,
    day
}

export default function (state = initialValue, action) {
    switch (action.type) {
        case SET_ACTIVE_DATE:
            return {
                ...state
            }

        default:
            return state;
    }
}