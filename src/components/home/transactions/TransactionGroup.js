import React, { Component } from 'react';
import './TransactionGroup.css';
import TransactionGroupItem from './TransactionGroupItem';
const _ = require('lodash/collection');

class TransactionGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openGroupId: -1
        }

        this.toggleGroupOpenClose = this.toggleGroupOpenClose.bind(this);
    };

    toggleGroupOpenClose(id) {
        this.setState((prevState) => {
            return {
                openGroupId: prevState.openGroupId === id ? -1 : id
            };
        });
    }

    render() {

        let groupList = _.sortBy(this.props.trxGroup, (group)=>{
            return group.amount === group.trxSum;
        }).map(
            (group) => <TransactionGroupItem key={group.id} {...group} isOpen={this.state.openGroupId === group.id} toggleGroupOpenClose={this.toggleGroupOpenClose} />
        );

        return (
            <div className="mt-3 mb-3">
                <h6 className="title">Income & Spendings</h6>
                <ul className="list-group">
                    {groupList}
                </ul>
            </div>
        );
    }
}
export default TransactionGroup;