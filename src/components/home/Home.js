import React, { Component } from 'react';
import Balance from './balance/Balance';
import TransactionGroup from './transactions/TransactionGroup';

import { DateTime } from 'luxon';
import { budget, transactions } from '../../db/db';

import './Home.css';
import { Promise } from 'es6-promise';
let _ = require("lodash/collection");
let _Math = require('lodash/math');

class Home extends Component {
    constructor(props) {
        super(props);
        this.today = DateTime.local();
        this.state = {
            trxGroup: []
        }
    }

    fetchBudget() {
        return budget
            .filter((budget) => {
                return ((budget.year === this.today.year && budget.month === this.today.month) || budget.isRecurring)
            })
            .toArray()
            .then(budget => budget);
    }

    fetchTrx() {
        return transactions
            .where({
                year: this.today.year,
                month: this.today.month
            })
            .toArray()
            .then(transactions => transactions);
    }

    groupTransactions(budget, trx) {
        let trxGroup = [];
        _.forEach(budget, (budget) => {
            let budgetGrp = { ...budget };
            budgetGrp.trx = _.filter(trx, { 'budgetId': budget.id });
            budgetGrp.trxSum = _Math.sumBy(budgetGrp.trx, 'amount');
            trxGroup.push(budgetGrp);
        });
        this.setState({
            trxGroup
        });
    }

    componentDidMount() {
        Promise.all([this.fetchBudget(), this.fetchTrx()])
            .then((response) => {
                this.groupTransactions(response[0], response[1]);

            });
    }

    render() {
        let income = 0, expense = 0, totalBudget = 0;
        _.forEach(this.state.trxGroup, (trxGrp) => {
            if (trxGrp.type === 'INCOME') {
                income += trxGrp.trxSum
            } else {
                expense += trxGrp.trxSum;
                if (trxGrp.amount > 0) {
                    totalBudget += trxGrp.amount;
                }
            }
        });

        return (
            <div className="home container">
                <Balance income={income} expense={expense} totalBudget={totalBudget} />
                <TransactionGroup trxGroup={this.state.trxGroup} />
            </div>
        );
    }
}

export default Home;