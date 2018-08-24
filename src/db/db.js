import Dexie from 'dexie';

let db = new Dexie('com.mywallet');
db.version(1).stores({
    transactions: '++id, [year+month], date, budgetId, desc, amount',
    budget: '++id, year, month, type, desc, isRecurring, amount'
});

export var budget = db.table('budget');
export var transactions = db.table('transactions');

db.initialize = () => {
    console.log('[start] Initializing DB');
    budget.count()
    .then(count => {
        if (count === 0) {
            budget.bulkAdd([{
                type: 'INCOME',
                desc: 'Salary',
                isRecurring: true
            }, {
                type: 'EXPENSE',
                desc: 'Other',
                isRecurring: true
            }]);
        }
    })
    .finally(()=>{
        console.log('[success] Initializing DB')
    })
};

export default db;
