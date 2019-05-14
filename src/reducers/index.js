import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import activeDateReducer from './activeDateReducer';
import categoriesReducer from './categoriesReducer';
import transactionReducer from './transactionReducer';
import transactionsReducer from './transactionsReducer'

export default combineReducers({
    auth: authReducer,
    category: categoryReducer,
    activeDate: activeDateReducer,
    categories: categoriesReducer,
    transaction: transactionReducer,
    transactions: transactionsReducer
});