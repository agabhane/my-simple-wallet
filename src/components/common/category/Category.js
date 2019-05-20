import React, { PureComponent } from "react";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppNavBar from '../AppNavBar';
import Categories from './Categories'
import { Typography } from "@material-ui/core";

const styles = {
    page: {
        height: '100vh',
    },
    main: {
        flex: 1,
        minHeight: '0px',
        minWidth: '0px'
    },
    amount: {
        height: '130px',
        lineHeight: '130px'
    },
    categoriesWrapper: {
        flex: 1,
        minHeight: '0px',
        padding: '0 10px 10px',
        overflowX: 'auto',
        width: '100%'
    }
}

class Category extends PureComponent {

    selectCategory = (category) => {
        this.props.onSelectCategory(category.id);
    }

    render() {

        let { transaction, categories, goBack, classes } = this.props;

        return (
            <Grid container direction="column" className={classes.page}>
                <Grid item>
                    <AppNavBar heading="Select Category" onBack={goBack}></AppNavBar>
                </Grid>
                <Grid item container direction="column" className={classes.main}>
                    <Typography variant="h4" align="center" className={classes.amount}>{transaction.amount}</Typography>
                    <Grid item className={classes.categoriesWrapper}>
                        <Categories categories={categories} onSelectCategory={this.selectCategory}></Categories>
                    </Grid>
                </Grid>
            </Grid>
        );

    }
}

export default withStyles(styles)(Category);