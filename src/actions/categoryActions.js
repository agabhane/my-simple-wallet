import { UPDATE_CATEGORY_FORM_FIELD, RESET_CATEOGRY, GET_CATEGORIES } from './types';
import { addCategory, getCategories as getCategoriesFirebase } from '../firebase/firestore/categories';
import sortBy from 'lodash/sortBy';
import store from '../store';

export function updateCategoryField(field, value) {
    return {
        type: UPDATE_CATEGORY_FORM_FIELD,
        payload: {
            field,
            value
        }
    };
};

export function resetCategory() {
    return {
        type: RESET_CATEOGRY,
        payload: {
            year: store.getState().activeDate.year,
            month: store.getState().activeDate.month
        }
    };
};

export async function saveCategory(category) {
    let response = await addCategory({
        ...category,
        userId: store.getState().auth.user.uid
    });
    return response;
}

export function getCategories() {
    return async function (dispatch) {
        let categories = await getCategoriesFirebase();
        const { year, month } = store.getState().activeDate;
        categories = categories.filter(category => (category.year === year && category.month === month) || category.isRecurring);
        categories = sortBy(categories, category => {
            return category.type === 'INCOME' ? 0 : 1;
        })
        dispatch({
            type: GET_CATEGORIES,
            payload: categories
        });

    }
}