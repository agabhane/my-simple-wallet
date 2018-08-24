import React from 'react';
import TransactionList from './TransactionList';

const TransactionGroupItem = (props) => {
    return (
        <li className={'list-group-item transaction-group-item ' + (props.trxSum === props.amount ? 'text-muted bg-light' : '')}
            onClick={() => { props.toggleGroupOpenClose(props.id) }}>
            <div className="d-flex justify-content-between align-items-center w-100">
                <div className={'group-name ' + (props.type === 'INCOME' ? 'border-success' : 'border-danger')}>{props.desc}</div>
                <div className="data text-right">
                    <div className="spending">
                        {props.trxSum.toLocaleString()}
                    </div>
                    <div className="budget font-weight-bold">
                        {props.amount ? props.amount.toLocaleString() : '--'}
                    </div>
                </div>
            </div>
            <div style={{
                display: props.isOpen ? 'block' : 'none'
            }}>
                <TransactionList trx={props.trx} />
            </div>
        </li>
    );
}

export default TransactionGroupItem;