import React from 'react';
import {
    Grid,
    withStyles,
    Paper,
    Typography,
    Fab,
    List,
    ListItem,
    withTheme
} from '@material-ui/core';
import { DateTime } from 'luxon';

import AppNavBar from '../common/AppNavBar';

const styles = {
    page: {
        height: '100vh',
    },
    main: {
        flex: 1,
        minHeight: '0px',
        padding: '10px',
        width: '100%'
    },
    snapShotWrapper: {
        display: 'grid',
        padding: '10px',
        gridTemplate: 'auto auto / 1fr 1fr 1fr'
    },
    snapShotBox: {
        borderRight: '1px solid #666666',
        textAlign: 'center',
        padding: '10px',
        minWidth: '0px',
        overflow: 'hidden',
        '& .value': {
            fontSize: '24px'
        },
        '& .label': {
            fontSize: '14px',
            opacity: '0.5',
            letterSpacing: '1px'
        }
    },
    actions: {
        gridColumnStart: 1,
        gridColumnEnd: 4,
        textAlign: 'right',
        padding: '10px 10px 0',
        borderTop: '1px solid #666666',
        marginTop: '10px'
    },
    transactionItem: {
        '& .date': {
            opacity: '0.5'
        },
        '& .amount': {
            fontSize: '16px'
        }
    },
    title: {
        margin: '10px 0 0',
        letterSpacing: '1px'
    }
};

class Transactions extends React.PureComponent {
    render() {
        const { classes, goBack, theme, category, onCategoryDone } = this.props;
        const doneButtonStyle = {
            background: theme.palette.primary[200],
            color: '#000'
        }

        const markAsDoneButton = (
            <div className={classes.actions}>
                <Fab variant="extended"
                    size="medium"
                    color="primary"
                    style={doneButtonStyle}
                    onClick={onCategoryDone}>
                    MARK AS DONE
                </Fab>
            </div>
        )
        return (
            <Grid container direction="column" className={classes.page}>
                <Grid item>
                    <AppNavBar heading={category.name} onBack={goBack}></AppNavBar>
                </Grid>
                <Grid item className={classes.main}>
                    <Paper elevation={1} className={classes.snapShotWrapper}>
                        <div className={classes.snapShotBox}>
                            <Typography variant="body1" className="value">{category.amount - category.transactionsSum}</Typography>
                            <Typography variant="body1" className="label">Balance</Typography>
                        </div>
                        <div className={classes.snapShotBox}>
                            <Typography variant="body1" className="value">{category.amount}</Typography>
                            <Typography variant="body1" className="label">Budget</Typography>
                        </div>
                        <div className={classes.snapShotBox} style={{ borderRightWidth: '0px' }}>
                            <Typography variant="body1" className="value">{category.transactionsSum}</Typography>
                            <Typography variant="body1" className="label">Spent</Typography>
                        </div>
                        {
                            category.transactionsSum === 0 && category.amount > 0 ? markAsDoneButton : ''
                        }
                    </Paper>
                    <Typography variant="subtitle1" className={classes.title}>Transactions</Typography>
                    {
                        category.transactions.length ? 
                        (
                            <Paper elevation={1}>
                                <List dense={true}>
                                    {
                                        category.transactions.map(transaction => {
                                            return (
                                                <ListItem divider={true} className={classes.transactionItem} key={transaction.id}>
                                                    <Grid container direction="row" justify="space-between" alignItems="center">
                                                        <Grid item>
                                                            <Typography variant="body2" className="desc">{transaction.desc}</Typography>
                                                            <Typography variant="body2" className="date">{DateTime.fromFormat(transaction.date, 'yyyy-MM-dd').toFormat('dd MMM')}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body2" className="amount">{transaction.amount}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Paper>
                        ) : ''
                    }
                </Grid>
            </Grid>
        );
    }
};

export default withTheme()(withStyles(styles)(Transactions));