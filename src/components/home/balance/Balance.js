import React from 'react';
import { DateTime } from 'luxon';

import './Balance.scss';

const Balance = (props) => {

    let future = props.income - props.totalBudget;
    let actual = props.income - props.expense;

    const localizeValue = function (value) {
        return value > 100000 ? ((value / 1000).toFixed()) + 'K' : value.toLocaleString();
    };

    let today = DateTime.local();

    return (
        <React.Fragment>
            <div className="month-end-balance">
                <div className="month-wrapper">
                    <div className="year">{today.year}</div>
                    <div className="month">{today.monthLong}</div>
                </div>
                <div className="balance">
                    <div className="label">Total</div>
                    <div className="value">{localizeValue(future)}</div>
                </div>
            </div>
            <div className="month-snapshot">
                <div className="tile">
                    <div className="label">Income</div>
                    <div className="value">{localizeValue(props.income)}</div>
                </div>
                <div className="tile">
                    <div className="label">Expenses</div>
                    <div className="value">{localizeValue(props.expense)}</div>
                </div>
                <div className="tile">
                    <div className="label">Balance</div>
                    <div className="value">{localizeValue(actual)}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Balance;