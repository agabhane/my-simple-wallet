import React, { Component } from 'react';
import { DateTime } from 'luxon';

class TransactionList extends Component {
    render() {
        let transactionList = this.props.trx.map((tran) => {
            return (
                <tr key={tran.id}>
                    <td style={{ width: '70px' }}>
                        {DateTime.fromFormat(tran.date, 'yyyy-LL-dd').toLocaleString({ month: 'short', day: 'numeric' })}
                    </td>
                    <td>{tran.desc}</td>
                    <td className="text-right">{tran.amount.toLocaleString()}</td>
                </tr>
            );
        });

        let trxTable = '';

        if (transactionList.length > 0) {
            trxTable = (
                <table className="table table-sm table-striped table-borderless mt-2">
                    <tbody>
                        {transactionList}
                    </tbody>
                </table>
            );
        }

        return trxTable;
    }
}

export default TransactionList;