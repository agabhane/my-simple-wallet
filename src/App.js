import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from './components/home/Home';
import AddIncome from './components/income/addIncome/AddIncome';
import CategoriesContainer from './components/category/CategoriesContainer';
import EditCategoryContainer from './components/category/EditCategoryContainer';
import AddExpense from './components/expense/addExpense/AddExpense';
import Auth from './components/auth/Auth';

import { SET_USER } from './actions/types';
import { initializeFirebaseApp } from './firebase/firebaseInitialize';

class App extends Component {
    componentWillMount() {
        initializeFirebaseApp();
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let { displayName, email, emailVerified, phoneNumber, photoURL, uid } = user;
                this.props.setUser({
                    displayName,
                    email,
                    emailVerified,
                    phoneNumber,
                    photoURL,
                    uid
                });
            } else {
                this.props.history.push('/auth');
            }
        })
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/income/:step" component={AddIncome} />
                <Route path="/categories/:id" component={EditCategoryContainer} />
                <Route path="/categories" component={CategoriesContainer} />
                <Route path="/expense/:step" component={AddExpense} />
                <Route path="/auth" component={Auth} />
            </Switch >
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => {
        dispatch({
            type: SET_USER,
            payload: user
        })
    }
});

export default withRouter(connect(null, mapDispatchToProps)(App));
