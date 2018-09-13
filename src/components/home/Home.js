import React, { Component } from 'react';
import Balance from './balance/Balance';
import TransactionGroup from './transactions/TransactionGroup';
import ChartComponent from './chart/chart';

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
            trxGroup: [],
            trxDisplayMode: 'TRANSACTION-LIST',
            month: this.today.month
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

    trxDisplayModeChange(value) {
        this.setState({
            trxDisplayMode: value
        });
    }

    render() {
        let income = 0, expense = 0, totalBudget = 0;
        _.forEach(this.state.trxGroup, (trxGrp) => {
            if (trxGrp.type === 'INCOME') {
                income += trxGrp.trxSum
            } else {
                expense += trxGrp.trxSum;
                totalBudget += Math.max(trxGrp.amount ? trxGrp.amount : 0, trxGrp.trxSum);
            }
        });

        return (
            <div className="home container">
                <Balance income={income} expense={expense} totalBudget={totalBudget} />
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <div className="title">Income &amp; Spendings</div>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="btn btn-secondary btn-sm active"
                            onClick={()=>this.trxDisplayModeChange('TRANSACTION-LIST')}>
                            <input type="radio" name="trxDisplayMode" value="TRANSACTION-LIST"/>
                                <i className="fa fa-list" aria-hidden="true"></i>
                        </label>
                        <label className="btn btn-secondary btn-sm"
                            onClick={()=>this.trxDisplayModeChange('CHART')}>
                            <input type="radio" name="trxDisplayMode" value="CHART"/>
                                <i className="fa fa-pie-chart" aria-hidden="true"></i>
                        </label>
                    </div>
                </div>
                {
                    this.state.trxDisplayMode === 'TRANSACTION-LIST' ? <TransactionGroup trxGroup={this.state.trxGroup} /> : <ChartComponent trxGroup={this.state.trxGroup}/>

                }
            </div>
        );
    }
}

export default Home;