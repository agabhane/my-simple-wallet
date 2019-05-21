import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppNavBar from '../common/AppNavBar';
import CategoryList from '../common/selectCategory/Categories';

import { getCategories as getCategoriesAction } from '../../actions/categoryActions';

const styles = {
    page: {
        height: '100vh',
    },
    main: {
        flex: 1,
        minHeight: '0px',
        minWidth: '0px',
        padding: '10px 10px 10px',
        overflowX: 'auto',
        width: '100%'
    }
};

class Categories extends React.Component {

    componentDidMount() {
        this.props.getCategories();
    }

    gotoEditCategory = () => {
        this.props.history.push('/categories/new');
    }

    render() {
        let addAction = (
            <IconButton color="inherit" onClick={this.gotoEditCategory}>
                <i className="material-icons">add</i>
            </IconButton>
        );

        const { classes, categories } = this.props;

        return (
            <Grid container direction="column" className={classes.page}>
                <Grid item>
                    <AppNavBar heading="Categories" onBack={this.props.history.goBack} action={addAction}></AppNavBar>
                </Grid>
                <Grid item className={classes.main}>
                    <CategoryList categories={categories}></CategoryList>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProp = (state) => ({
    categories: state.categories
});

const mapDispatchToProp = (dispatch) => ({
    async getCategories() {
        dispatch(await getCategoriesAction());
    }
})

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(Categories)));