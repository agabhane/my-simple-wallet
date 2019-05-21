import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Transactions from './Transactions';
import {
    addTransaction,
    resetTransactionField as resetTransactionFieldAction,
    updateTransactionField as updateTransactionFieldAction
} from '../../actions/transactionActions';

class TransactionsContainer extends React.Component {
    componentDidMount() {
        if (!this.props.category) {
            this.props.history.goBack();
        }
    }

    saveTransation = async () => {
        const {resetTransactionFields, updateTransactionFields, category, saveTransation, history} = this.props;
        resetTransactionFields();
        updateTransactionFields('categoryId', category.id);
        updateTransactionFields('desc', category.name);
        updateTransactionFields('amount', category.amount);
        setTimeout(async () => {
            await saveTransation(this.props.transaction);
            history.go(-1);
        })
    }

    render() {
        const { history, category } = this.props;
        return category ?
            <Transactions
                goBack={history.goBack}
                category={category}
                onCategoryDone={this.saveTransation}>
            </Transactions> : ''
    }
}

const mapStateToProp = (state, ownProps) => ({
    category: state.transactions.groups.find(grp => grp.id === ownProps.match.params.categoryId),
    transaction: state.transaction
})

const mapDispatchToProp = dispatch => ({
    async saveTransation(transaction) {
        await addTransaction(transaction);
    },
    resetTransactionFields() {
        dispatch(resetTransactionFieldAction());
    },
    updateTransactionFields(field, value) {
        dispatch(updateTransactionFieldAction(field, value))
    }
})

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(TransactionsContainer));