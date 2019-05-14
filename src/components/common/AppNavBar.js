import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: 20
    },
};

class AppNavBar extends React.PureComponent {
    render() {
        const { classes, heading, onBack, action } = this.props;
        return (
            <div className={classes.root}>
                <AppBar>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                            onClick={onBack}>
                            <i className="material-icons">arrow_back</i>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {heading}
                        </Typography>
                        {action}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(AppNavBar);