import React from 'react';

import './Balance.css';

const Balance = (props) => {

    let future = props.income - props.totalBudget;
    let actual = props.income - props.expense;
    
    return (
        <div className="mt-3 d-flex justify-content-between">
            <div className="flex-fill stat-box text-center">
                <div className="field-value">{future > 100000 ? ((future/1000).toFixed()) + 'K' : future.toLocaleString()}</div>
                <div className="field-label">Future</div>
            </div>
            <div className="flex-fill stat-box text-center">
                <div className="field-value">{actual > 100000 ? ((actual/1000).toFixed()) + 'K' : actual.toLocaleString()}</div>
                <div className="field-label">Actual</div>
            </div>
            <div className="flex-fill stat-box text-center">
                <div className="field-value">{props.income > 100000 ? ((props.income/1000).toFixed()) + 'K' : props.income.toLocaleString()}</div>
                <div className="field-label">Income</div>
            </div>
            <div className="flex-fill stat-box text-center">
                <div className="field-value">{props.expense > 100000 ? ((props.expense/1000).toFixed()) + 'K' : props.expense.toLocaleString()}</div>
                <div className="field-label">Expense</div>
            </div>
        </div>
    );
};

export default Balance;