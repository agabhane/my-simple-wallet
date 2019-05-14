import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppNavBar from '../common/AppNavBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

import Category from './Category';
import { getCategories as getCategoriesAction } from '../../actions/categoryActions';

const styles = {
    listContainer: {
        marginTop: '60px'
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
            <React.Fragment>
                <AppNavBar heading="Categories" onBack={this.props.history.goBack} action={addAction}></AppNavBar>
                <List className={classes.listContainer}>
                    {
                        categories.map(category => {
                            return <Category className={classes.categoryCard} {...category} key={category.id}></Category>
                        })
                    }
                </List>
            </React.Fragment>
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