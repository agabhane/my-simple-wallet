import React, { PureComponent, Fragment } from "react";

import './Amount.scss';
import SmartLayout from '../smartLayout/SmartLayout';
import Header from '../header/Header';


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
        let header = (
            <Header heading="Enter amount" goBack={this.props.goBack}></Header>
        );

        let main = (
            <Fragment>
                <div className="amount-wrapper">
                    <button className="btn btn-clear" onClick={this.clearAmount}><i className="material-icons">clear</i></button>
                    <div className="amount">{this.props.transaction.amount}</div>
                    <button className="btn btn-delete" onClick={this.deleteDigit}><i className="material-icons">keyboard_arrow_left</i></button>
                </div>
                <div className="number-pad">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => {
                            return <button className="btn" key={digit} onClick={() => { this.updateAmount(digit.toString()) }}>{digit}</button>;
                        })
                    }
                    <button className="btn"><i className="material-icons">clear</i></button>
                    <button className="btn" onClick={() => { this.updateAmount('0') }}>0</button>
                    <button className="btn" onClick={this.props.onSetAmount}><i className="material-icons">check</i></button>
                </div>
            </Fragment>
        );

        return (
            <SmartLayout header={header} main={main}></SmartLayout>
        );
    }
}

export default Amount;