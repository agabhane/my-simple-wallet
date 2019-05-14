import React, { PureComponent } from "react";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import SmartLayout from '../smartLayout/SmartLayout';
import Header from '../header/Header';
import './Description.scss';

const styles = {
    card: {
        minWidth: 275,
        margin: '0 2em'
    },
    formControl: {
        marginBottom: '20px'
    },
    button: {
        flex: 1
    }
};


class Description extends PureComponent {
    render() {
        let { updateProperty, transaction, category, classes, goBack, onSave } = this.props;
        
        let header = <Header heading="Enter Description" goBack={goBack}></Header>;

        let main = (
            <Card className={classes.card}>
                <CardContent>
                    <form className={classes.root} autoComplete="off">
                        <FormGroup>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Description"
                                    autoFocus={true}
                                    onChange={(e) => { updateProperty('desc', e.target.value) }} value={transaction.desc}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Amount"
                                    type="number"
                                    value={transaction.amount}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Category"
                                    value={category}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    onChange={(e) => { updateProperty('date', e.target.value) }} value={transaction.date}
                                />
                            </FormControl>
                        </FormGroup>
                    </form>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" className={classes.button} onClick={goBack}>CANCEL</Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={onSave}>SAVE</Button>
                </CardActions>
            </Card>
        )

        return (
            <SmartLayout header={header} main={main}></SmartLayout>
        );
    }
}

export default withStyles(styles)(Description);