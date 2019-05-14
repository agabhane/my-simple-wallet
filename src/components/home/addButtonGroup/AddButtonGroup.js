import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        };

        this.expandButtonGroup = this.expandButtonGroup.bind(this);
        this.collapseButtonGroup = this.collapseButtonGroup.bind(this);

        document.body.addEventListener('click', this.collapseButtonGroup);
    }

    expandButtonGroup(e) {
        e.stopPropagation();
        this.setState({
            isExpanded: true
        });
    }

    collapseButtonGroup() {
        if (this.state.isExpanded) {
            this.setState({
                isExpanded: false
            }); 
        }
    }

    render() {
        var buttonCmp;
        if (!this.state.isExpanded) {
            buttonCmp = (
                <button className="button-group" onClick={e => { this.expandButtonGroup(e) }}>
                    <i className="material-icons">add</i>
                </button>
            );
        } else {
            buttonCmp = (
                <div className="button-group">
                    <Link to="/income/amount"><i className="material-icons">arrow_downward</i></Link>
                    <Link to="/expense/amount"><i className="material-icons">arrow_upward</i></Link>
                    <Link to="/categories"><i className="material-icons">bar_chart</i></Link>
                </div>
            );
        }
        return buttonCmp;
    }
}

export default AddButtonGroup;