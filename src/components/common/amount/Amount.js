import React, { PureComponent } from "react";

import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AppNavBar from '../AppNavBar';

const styles = {
    page: {
        height: '100vh',
    },
    main: {
        flex: 1,
        minHeight: '0px',
        minWidth: '0px'
    },
    amountWrapper: {
        height: '130px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 2em',
        '& .amount': {
            flex: 1,
            fontSize: '40px',
            textAlign: 'center',
            color: '#ffffff'
        }
    },
    numPad: {
        flex: 1,
        margin: '1em 2em 2em',
        display: 'grid',
        gridTemplate: '1fr 1fr 1fr 1fr / 1fr 1fr 1fr'
    },
    numButton: {
        height: '100%',
        width: '100%',
        fontSize: '32px',
        fontWeight: '400',
        '& .material-icons': {
            fontSize: '32px'
        }
    }
};

class Amount extends PureComponent {

    updateAmount = (digit) => {
        this.props.updateAmount(parseInt(this.props.transaction.amount + digit));
    }

    deleteDigit = () => {
        let digits = this.props.transaction.amount.toString().split('');
        digits.pop();
        this.props.updateAmount(digits.length > 0 ? parseInt(digits.join('')) : 0);
    }

    clearAmount = () => {
        this.props.updateAmount(0);
    }

    render() {
        const { classes, theme } = this.props;
        const checkButtonStyle = {
            background: theme.palette.primary[200],
            color: '#000'
        }
        return (
            <Grid container direction="column" className={classes.page}>
                <Grid item>
                    <AppNavBar heading="Enter amount" onBack={this.props.goBack}></AppNavBar>
                </Grid>
                <Grid item container direction="column" className={classes.main}>
                    <div className={classes.amountWrapper}>
                        <IconButton onClick={this.clearAmount}><i className="material-icons">clear</i></IconButton>
                        <div className="amount">{this.props.transaction.amount}</div>
                        <IconButton onClick={this.deleteDigit}><i className="material-icons">keyboard_arrow_left</i></IconButton>
                    </div>
                    <div className={classes.numPad}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => {
                                return (
                                    <Paper elevation={1} key={digit} square={true}>
                                        <Button color="default" className={classes.numButton} onClick={() => { this.updateAmount(digit.toString()) }}>{digit}</Button>
                                    </Paper>
                                )
                            })
                        }
                        <Paper elevation={1} square={true}>
                            <Button color="default" className={classes.numButton}><i className="material-icons">clear</i></Button>
                        </Paper>
                        <Paper elevation={1} square={true}>
                            <Button color="default" className={classes.numButton} onClick={() => { this.updateAmount('0') }}>0</Button>
                        </Paper>
                        <Paper elevation={1} square={true}>
                            <Button color="primary" style={checkButtonStyle} variant="contained" className={classes.numButton} onClick={this.props.onSetAmount}>
                                <i className="material-icons">check</i>
                            </Button>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withTheme()(withStyles(styles)(Amount));