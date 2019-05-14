import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    categoryCard: {
        marginBottom: '10px'
    },
    incomeColor: {
        backgroundColor: 'rgba(0, 200, 0, 0.7)'
    },
    expenseColor: {
        backgroundColor: 'rgba(200, 0, 0, 0.7)'
    }
};

class Category extends React.PureComponent {
    render() {
        let { name, amount, type, classes } = this.props;
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={type === 'INCOME' ? classes.incomeColor : classes.expenseColor }>
                        {
                            type === 'INCOME' ?
                                <i className="material-icons">arrow_downward</i> :
                                <i className="material-icons">arrow_upward</i>
                        }
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={amount}></ListItemText>
            </ListItem>

        )
    }
}

export default withStyles(styles)(Category);