import React, { PureComponent } from "react";

import {
    withStyles,
    Grid,
    Card,
    CardActions,
    CardContent,
    Button,
    TextField,
    FormControl,
    FormGroup
} from '@material-ui/core';

import AppNavBar from '../AppNavBar';

const styles = {
    page: {
        height: '100vh',
    },
    main: {
        flex: 1,
        minHeight: '0px',
        minWidth: '0px'
    },
    card: {
        minWidth: 275,
        margin: '2em'
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

        return (
            <Grid container direction="column" className={classes.page}>
                <Grid item>
                    <AppNavBar heading="Enter Description" onBack={goBack}></AppNavBar>
                </Grid>
                <Grid item className={classes.main}>
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
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Description);