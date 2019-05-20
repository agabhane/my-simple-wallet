import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles, withTheme } from '@material-ui/core/styles';

const styles = {
    wrapper: {
        display: 'grid',
        gridTemplate: '100px 100px / 1fr 1fr 1fr',
        gridGap: '10px',
        color: '#FFFFFF',
        overflow: 'hidden',
        minWidth: 0,
        width: '100%'
    },
    box: {
        padding: '20px',

        '& .label': {
            fontSize: '14px',
            opacity: '0.5',
            letterSpacing: '1px'
        },
        '& .value': {
            fontSize: '24px',
            marginTop: '10px'
        }
    },
    totalBox: {
        gridColumnStart: 2,
        gridColumnEnd: 4,
        textAlign: 'right'
    },
    monthBox: {
        color: '#000'
    }
}

const Balance = (props) => {

    let future = props.income - props.totalBudget;
    let actual = props.income - props.expense;

    const localizeValue = function (value) {
        return value > 10000 ? ((value / 1000).toFixed()) + ' K' : value.toLocaleString();
    };

    const {activeDate, theme, classes} = props;

    return (
        <div className={props.classes.wrapper + ' ' + props.className}>
            <Paper elevation={1} className={classes.box + ' ' + classes.monthBox} style={{background: theme.palette.primary[200]}}>
                <div className="label">{activeDate.year}</div>
                <div className="value">{activeDate.monthLong}</div>
            </Paper>
            <Paper elevation={1} className={classes.totalBox + ' ' + classes.box}>
                <div className="label">Total</div>
                <div className="value">{localizeValue(future)}</div>
            </Paper>
            <Paper elevation={1} className={classes.box}>
                <div className="label">Income</div>
                <div className="value">{localizeValue(props.income)}</div>
            </Paper>
            <Paper elevation={1} className={classes.box}>
                <div className="label">Expenses</div>
                <div className="value">{localizeValue(props.expense)}</div>
            </Paper>
            <Paper elevation={1} className={classes.box}>
                <div className="label">Balance</div>
                <div className="value">{localizeValue(actual)}</div>
            </Paper>
        </div>
    );
};

export default withTheme()(withStyles(styles)(Balance));