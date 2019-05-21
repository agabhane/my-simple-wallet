import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AppNavBar from '../common/AppNavBar';
import EditCategory from './EditCategory';
import { updateCategoryField, resetCategory, saveCategory } from '../../actions/categoryActions';


const styles = {
    page: {
        height: '100vh',
    },
    main: {
        flex: 1,
        minHeight: '0px',
        minWidth: '0px'
    },
    container: {
        margin: '2em'
    }
}

class EditCategoryContainer extends React.Component {

    componentDidMount() {
        if (this.props.match.params.id === 'new') {
            this.props.resetCategory();
        }
    }

    updateProperty = (field, value) => {
        if (field === 'isRecurring') {
            this.props.updateProperty('year', value ? null : this.props.activeDate.year);
            this.props.updateProperty('month', value ? null : this.props.activeDate.month);
        }
        this.props.updateProperty(field, value);
    }

    saveCategory = async () => {
        await this.props.saveCategory(this.props.category);
        this.props.history.goBack();
    }

    render() {

        const { history, classes, category } = this.props;
        return (
            <Grid container direction="column" className={classes.page}>
                <Grid item>
                    <AppNavBar heading="Add Category" onBack={history.goBack}></AppNavBar>
                </Grid>
                <Grid item className={classes.main}>
                    <div className={classes.container}>
                        <EditCategory className={classes.container} category={category} updateProperty={this.updateProperty} onSaveCategory={this.saveCategory}></EditCategory>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProp = (state) => ({
    category: state.category,
    activeDate: state.activeDate
});

const mapDispatchToProp = (dispatch) => ({
    updateProperty(field, value) {
        dispatch(updateCategoryField(field, value))
    },
    resetCategory() {
        dispatch(resetCategory());
    },
    saveCategory: async (category) => {
        return await saveCategory(category);
    }
})

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(EditCategoryContainer)));