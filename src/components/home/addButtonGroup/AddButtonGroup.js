import React, { Component } from "react";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    linkButton: {
        '& a': {
            color: 'inherit'
        }
    }
}

class AddButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        };

        this.expandButtonGroup = this.expandButtonGroup.bind(this);
        this.collapseButtonGroup = this.collapseButtonGroup.bind(this);
    }

    expandButtonGroup(e) {
        this.setState({
            isExpanded: true
        });
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    collapseButtonGroup() {
        if (this.state.isExpanded) {
            this.setState({
                isExpanded: false
            });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.collapseButtonGroup);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.collapseButtonGroup);
    }

    render() {
        var buttonCmp;
        const { classes } = this.props;
        if (!this.state.isExpanded) {
            buttonCmp = (
                <IconButton onClick={e => { this.expandButtonGroup(e) }}>
                    <i className="material-icons">add</i>
                </IconButton>
            );
        } else {
            buttonCmp = (
                <React.Fragment>
                    <IconButton className={classes.linkButton}>
                        <Link to="/income/amount"><i className="material-icons">arrow_downward</i></Link>
                    </IconButton>
                    <IconButton className={classes.linkButton}>
                        <Link to="/expense/amount"><i className="material-icons">arrow_upward</i></Link>
                    </IconButton>
                    <IconButton className={classes.linkButton}>
                        <Link to="/categories"><i className="material-icons">bar_chart</i></Link>
                    </IconButton>
                </React.Fragment>
            );
        }
        return buttonCmp;
    }
}

export default withStyles(styles)(AddButtonGroup);