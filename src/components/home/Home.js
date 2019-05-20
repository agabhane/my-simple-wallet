import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _forEach from 'lodash/forEach';

import Balance from './balance/Balance';
import AddButtonGroup from './addButtonGroup/AddButtonGroup';
import Categories from '../common/category/Categories';
import AppNavBar from '../common/AppNavBar';

import { getTransactionGroups as getTransactionGroupsAction } from '../../actions/transactionActions';

const styles = {
    page: {
        height: '100vh'
    },
    main: {
        flex: 1,
        minHeight: '0px',
        minWidth: '0px'
    },
    container: {
        padding: '0 10px'
    },
    title: {
        marginTop: '10px',
        letterSpacing: '1px'
    },
    categoriesWrapper: {
        flex: 1,
        minHeight: '0px',
        padding: '0 10px 10px',
        overflowX: 'auto',
        width: '100%'
    }
}

class Home extends Component {

    componentDidMount() {
        this.props.getTransactionGroups();
    }

    render() {
        const { classes, activeDate, transactionGroups } = this.props;
        let income = 0, expense = 0, totalBudget = 0;

        _forEach(transactionGroups, (trxGrp) => {
            if (trxGrp.type === 'INCOME') {
                income += trxGrp.transactionsSum
            } else {
                expense += trxGrp.transactionsSum;
                totalBudget += Math.max(trxGrp.amount ? trxGrp.amount : 0, trxGrp.transactionsSum);
            }
        });

        const buttonGroup = <AddButtonGroup></AddButtonGroup>;

        return (
            <Grid container direction="column" className={classes.page}>
                <Grid item>
                    <AppNavBar heading="#mywallet" action={buttonGroup}></AppNavBar>
                </Grid>
                <Grid item container direction="column" className={classes.main}>
                    <Typography gutterBottom={true} variant="subtitle1" className={classes.container + ' ' + classes.title}>Current Stat</Typography>
                    <Balance activeDate={activeDate} income={income} expense={expense} totalBudget={totalBudget} className={classes.container}></Balance>

                    <Typography gutterBottom={true} variant="subtitle1" className={classes.container + ' ' + classes.title}>Income and expenses</Typography>
                    <Grid item className={classes.categoriesWrapper}>
                        <Categories categories={transactionGroups}></Categories>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProp = (state) => ({
    transactionGroups: state.transactions.groups,
    activeDate: state.activeDate
})

const mapDispatchToProp = (dispatch) => ({
    getTransactionGroups() {
        dispatch(getTransactionGroupsAction());
    }
})

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(Home)));