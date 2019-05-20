import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
    categories: {
        height: '100%',
        display: 'inline-grid',
        gridTemplateRows: 'repeat(auto-fill, 100px)',
        gridAutoColumns: '120px',
        gridAutoFlow: 'column',
        gridGap: '10px',
    },
    categoryTile: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        whiteSpace: 'nowrap',
        textTransform: 'ellipsis',
        overflow: 'hidden',
        position: 'relative',
        '& .amount': {
            color: '#ffffff'
        },

        '& .name': {
            color: '#ffffff',
            opacity: 0.5,
            fontSize: '14px',
            letterSpacing: '1px'
        },
        '& .icon-type': {
            height: '40px',
            width: '40px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            lineHeight: '60px',
            textAlign: 'center',
            position: 'absolute',
            right: '-10px',
            top: '-10px'
        }
    },
    income: {
        color: '#A5D6A7'
    },
    expense: {
        color: '#EF9A9A'
    }
}

class Categories extends React.PureComponent {
    getIconClass = (type, classes) => {
        return "icon-type " + (type === 'INCOME' ? classes.income : classes.expense);
    }

    render() {
        const { classes, categories, onSelectCategory } = this.props;
        return (
            <div className={classes.categories}>
                {
                    categories.map(category => (
                        <Paper elevation={1} className={classes.categoryTile} key={category.id} onClick={()=> onSelectCategory ? onSelectCategory(category) : ''}>
                            <div className={this.getIconClass(category.type, classes)}>
                                {
                                    category.type === 'INCOME' ? <i className="material-icons">arrow_downward</i> : <i className="material-icons">arrow_upward</i>
                                }
                            </div>
                            <div className="amount">{category.amount}</div>
                            <div className="name">{category.name}</div>
                        </Paper>
                    ))
                }

            </div>
        )
    }
};

export default withStyles(styles)(Categories);