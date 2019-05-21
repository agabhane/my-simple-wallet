import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';

const styles = {
    card: {
        minWidth: 275,
    },
    formControl: {
        marginBottom: '20px'
    },
    button: {
        flex: 1
    }
};


class EditCategory extends React.PureComponent {
    render() {
        const { classes, category, updateProperty, onSaveCategory } = this.props;
        return (
            <Card className={classes.card} elevation={1}>
                <CardContent>
                    <form className={classes.root} autoComplete="off">
                        <FormGroup>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Type</InputLabel>
                                <Select value={category.type} onChange={(e) => { updateProperty('type', e.target.value) }}>
                                    <MenuItem value="EXPENSE">Expense</MenuItem>
                                    <MenuItem value="INCOME">Income</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Amount"
                                    type="number"
                                    onChange={(e) => { updateProperty('amount', parseInt(e.target.value)) }} value={category.amount}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Name"
                                    onChange={(e) => { updateProperty('name', e.target.value) }} value={category.name}
                                />

                            </FormControl>
                            <FormControlLabel className={classes.formControl}
                                control={
                                    <Switch
                                        onChange={(e) => { updateProperty('isRecurring', e.target.checked) }} checked={category.isRecurring}
                                    />
                                }
                                label="Is Recurring"
                            />
                        </FormGroup>
                    </form>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" className={classes.button}>CANCEL</Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={onSaveCategory}>SAVE</Button>
                </CardActions>
            </Card>
        )
    }
}
export default withStyles(styles)(EditCategory);