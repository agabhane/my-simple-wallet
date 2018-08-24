import React, { Component } from 'react';
import { budget } from '../../../db/db';

class AddBudget extends Component {
    constructor(props) {
        super(props);

        this.date = new Date();

        this.state = {
            desc: '',
            amount: '',
            isRecurring: false,
            month: this.date.getMonth() + 1,
            year: this.date.getFullYear(),
            type: 'EXPENSE'
        }

        this.updateProperty = this.updateProperty.bind(this);
        this.addNewBudget = this.addNewBudget.bind(this);
    }

    updateProperty(property, value) {
        let obj = {};
        obj[property] = value;
        this.setState(obj);

        if (property === 'isRecurring') {
            if (value) {
                this.setState({
                    year: null,
                    month: null
                });
            } else {
                this.setState({
                    month: this.date.getMonth() + 1,
                    year: this.date.getFullYear(),
                })
            }
        }
    }

    addNewBudget() {
        budget.add({ ...this.state })
            .then((id) => {
                console.log(`[success] add budget (${id})`);
                this.props.history.push('/');
            });
    }

    render() {
        return (
            <div className="container home">
                <h5 className="mt-3 mb-3">Add Budget</h5>
                <form>
                    <div className="form-group">
                        <select className="form-control" value={this.state.type} onChange={(e) => { this.updateProperty('type', e.target.value) }}>
                            <option value="INCOME">Income</option>
                            <option value="EXPENSE">Expense</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Description" required
                            onChange={(e) => { this.updateProperty('desc', e.target.value) }} value={this.state.desc} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Amount" required
                            onChange={(e) => { this.updateProperty('amount', parseInt(e.target.value, 10)) }} value={this.state.amount} />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="cbIsRecurring"
                            onChange={(e) => { this.updateProperty('isRecurring', e.target.checked) }} checked={this.state.isRecurring} />
                        <label htmlFor="cbIsRecurring" className="form-check-label">Is Recurring</label>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-outline-primary mr-3 btn-block">Cancel</button>
                        <button type="button" className="btn btn-primary btn-block mt-0" onClick={this.addNewBudget}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddBudget;