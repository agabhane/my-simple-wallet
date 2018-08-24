import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './components/header/Header';
import Home from './components/home/Home';
import AddIncome from './components/income/addIncome/AddIncome';
import AddBudget from './components/budget/addBudget/AddBudget';
import AddExpense from './components/expense/addExpense/AddExpense';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/income" component={AddIncome} />
          <Route path="/budget" component={AddBudget} />
          <Route path="/expense" component={AddExpense} /> 
        </Switch>
      </div>
    );
  }
}

export default App;
