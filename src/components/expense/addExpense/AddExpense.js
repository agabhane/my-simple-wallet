import React, { Component } from 'react';
import { budget, transactions } from '../../../db/db';
import { DateTime } from 'luxon';

class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.today = DateTime.local();
        this.state = {
            expense: {
                desc: '',
                amount: '',
                date: this.today.toISODate(),
                budgetId: ''
            },
            budgetList: []
        };
        this.updateProperty = this.updateProperty.bind(this);
        this.addNewExpense = this.addNewExpense.bind(this);
    }

    fetchExpenseBudget() {
        budget.where('type').equals('EXPENSE')
            .filter((budget) => {
                return ((budget.year === this.today.year &&
                    budget.month === this.today.month + 1) || budget.isRecurring);
            })
            .toArray()
            .then((response) => {
                this.setState({
                    budgetList: response
                });
                this.setState({
                    expense: Object.assign(this.state.expense, { budgetId: response[0].id })
                })
            });
    }

    componentDidMount() {
        this.fetchExpenseBudget();
    }

    updateProperty(property, value) {
        let obj = {};
        obj[property] = value;
        this.setState({
            expense: Object.assign(this.state.expense, obj)
        });
    }

    addNewExpense() {
        let { date, budgetId, desc, amount } = this.state.expense;
        transactions.add({
            year: DateTime.fromFormat(date, 'yyyy-LL-dd').year,
            month: DateTime.fromFormat(date, 'yyyy-LL-dd').month,
            date,
            budgetId,
            desc,
            amount
        })
        .then((id)=>{
            console.log(`[success] add expense (${id})`);
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="container home">
                <h5 className="mt-3 mb-3">Add Expense</h5>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Description" required
                            value={this.state.expense.desc}
                            onChange={(e) => { this.updateProperty('desc', e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Amount" required
                            value={this.state.expense.amount}
                            onChange={(e) => { this.updateProperty('amount', parseInt(e.target.value, 10)) }} />
                    </div>
                    <div className="form-group">
                        <select className="form-control" value={this.state.expense.budgetId}
                            onChange={(e) => { this.updateProperty('budgetId', parseInt(e.target.value, 10)) }}>
                            {
                                this.state.budgetList.map((b) => {
                                    return <option value={b.id} key={b.id}>{b.desc}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="date" className="form-control" placeholder="Date" required
                            value={this.state.expense.date}
                            onChange={(e) => { this.updateProperty('date', e.target.value) }} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-primary mr-3 btn-block">Cancel</button>
                        <button type="button" className="btn btn-primary btn-block mt-0"
                        onClick={this.addNewExpense}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddExpense;