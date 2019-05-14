import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Balance from './balance/Balance';
import AddButtonGroup from './addButtonGroup/AddButtonGroup';
import CategoryTile from '../common/category/CategoryTile';

import { getTransactionGroups as getTransactionGroupsAction } from '../../actions/transactionActions';

import './Home.scss';
import _forEach from 'lodash/forEach';

const styles = {
    categoriesWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflowX: 'auto',

        '& h4': {
            color: '#333',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '2px'
        }
    },
    categories: {
        flex: 1,
        display: 'inline-grid',
        gridTemplateRows: 'repeat(auto-fill, 100px)',
        gridAutoColumns: '100px',
        gridAutoFlow: 'column',
        gridGap: '15px',
        padding: '0 1em 1em 2em',
    },
    categoryTile:  {
        background: '#fff',
        color: '#000',
        padding: '10px',
        borderRadius: '3px',
        boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        fontSize: '1em',
        fontWeight: '500',
        border: '1px solid #f1f1f1',

        '& .budget': {
            color: '#aaa'
        },

        '& .name': {
            color: '#333'
        }
    }
}

class Home extends Component {

    componentDidMount() {
        this.props.getTransactionGroups();
    }

    render() {
        let income = 0, expense = 0, totalBudget = 0;
        _forEach(this.props.transactionGroups, (trxGrp) => {
            if (trxGrp.type === 'INCOME') {
                income += trxGrp.transactionsSum
            } else {
                expense += trxGrp.transactionsSum;
                totalBudget += Math.max(trxGrp.amount ? trxGrp.amount : 0, trxGrp.transactionsSum);
            }
        });

        const { classes } = this.props;

        return (
            <div className="home-wrapper">
                <div className="backdrop"></div>
                <div className="frontdrop">
                    <header className="container">
                        <h1>My money</h1>
                        <AddButtonGroup></AddButtonGroup>
                    </header>
                    <main>
                        <div className="container">
                            <Balance income={income} expense={expense} totalBudget={totalBudget}></Balance>
                        </div>
                        <div className={classes.categoriesWrapper}>
                            <h4 className="container">Category-wise spendings</h4>
                            <div className={classes.categories}>
                                {
                                    this.props.transactionGroups.map(group => (
                                        <CategoryTile className={classes.categoryTile} category={group} key={group.id}></CategoryTile>
                                    ))
                                }
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProp = (state) => ({
    transactionGroups: state.transactions.groups
})

const mapDispatchToProp = (dispatch) => ({
    getTransactionGroups() {
        dispatch(getTransactionGroupsAction());
    }
})

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(Home)));