import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import 'firebase/auth';

import { withTheme } from '@material-ui/core/styles';

import Home from './components/home/Home';
import AddIncome from './components/income/addIncome/AddIncome';
import CategoriesContainer from './components/categories/CategoriesContainer';
import EditCategoryContainer from './components/categories/EditCategoryContainer';
import AddExpense from './components/expense/addExpense/AddExpense';
import Auth from './components/auth/Auth';
import TrasactionsContainer from './components/transations/TrasactionsContainer';

import { SET_USER } from './actions/types';
import { initializeFirebaseApp } from './firebase/firebaseInitialize';
import { onAuthStateChanged } from './firebase/auth/auth';

class App extends Component {
    componentWillMount() {
        initializeFirebaseApp();
        onAuthStateChanged()
            .then(user => {
                this.props.setUser(user);
            })
            .catch(() => {
                this.props.history.push('/auth');
            });
    }

    render() {
        return (
            <div style={{ background: this.props.theme.palette.background.default }}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/income/:step" component={AddIncome} />
                    <Route path="/categories/:id" component={EditCategoryContainer} />
                    <Route path="/transactions/:categoryId" component={TrasactionsContainer} />
                    <Route path="/categories" component={CategoriesContainer} />
                    <Route path="/expense/:step" component={AddExpense} />
                    <Route path="/auth" component={Auth} />
                </Switch >
            </div>
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

export default withRouter(connect(null, mapDispatchToProps)(withTheme()(App)));
