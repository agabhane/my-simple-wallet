import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DateTime } from 'luxon';

import Amount from '../../common/amount/Amount';
import Category from "../../common/category/Category";
import Description from '../../common/description/Description';

import { getCategories as getCategoriesAction } from '../../../actions/categoryActions';

import {
    updateTransactionField as updateTransactionFieldAction,
    resetTransactionField as resetTransactionFieldAction,
    addTransaction
} from '../../../actions/transactionActions';


class AddExpense extends Component {

    componentDidMount() {
        this.props.getCategories();
    }

    updateAmount = (amount) => {
        this.props.updateTransactionField('amount', amount);
    }

    onSetAmount = () => {
        this.props.history.push('/expense/category');
    }

    onSelectCategory = (categoryId) => {
        this.props.updateTransactionField('categoryId', categoryId);
        this.props.history.push('/expense/desc');
    }

    onSave = async() => {
        await this.props.saveTransation(this.props.transaction);
        this.props.history.go(-3);
    }

    render() {
        return (
            <div className="add-income-wrapper">
                {
                    (() => {
                        let { step } = this.props.match.params;
                        let { transaction, categories, updateTransactionField } = this.props;

                        switch (step) {
                            case 'amount':
                                return <Amount onSetAmount={this.onSetAmount}
                                    goBack={this.props.history.goBack}
                                    transaction={transaction} updateAmount={this.updateAmount}>
                                </Amount>;
                            case 'category':
                                categories = categories.filter(category => category.type === 'EXPENSE');
                                return <Category onSelectCategory={this.onSelectCategory}
                                    categories={categories}
                                    goBack={this.props.history.goBack}
                                    transaction={transaction}>
                                </Category>;
                            case 'desc':
                                let selectedCaterogy = categories.find(category => category.id === transaction.categoryId);
                                return <Description goBack={this.props.history.goBack}
                                    onSave={this.onSave}
                                    transaction={transaction}
                                    category={selectedCaterogy ? selectedCaterogy.name : ''}
                                    updateProperty={updateTransactionField}>
                                </Description>;
                            default:
                                return '';
                        }
                    })()
                }
            </div>

        );
    }
}

const mapStateToProp = state => ({
    transaction: state.transaction,
    categories: state.categories
});

const mapDispatchToProp = dispatch => ({
    updateTransactionField(field, value) {
        if (field === 'date') {
            dispatch(updateTransactionFieldAction('year', DateTime.fromISO(value).year));
            dispatch(updateTransactionFieldAction('month', DateTime.fromISO(value).month));
        }
        dispatch(updateTransactionFieldAction(field, value));
    },
    resetTransactionField() {
        dispatch(resetTransactionFieldAction());
    },
    async getCategories() {
        dispatch(await getCategoriesAction());
    },
    async saveTransation(transaction) {
        await addTransaction(transaction);
    }
})

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(AddExpense));