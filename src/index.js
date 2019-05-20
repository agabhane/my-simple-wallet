import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {purple, teal} from '@material-ui/core/colors';

import store from './store';
import './index.scss';
import App from './App';

import serviceWorker from './registerServiceWorker';
serviceWorker();

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#121212'
        },
        primary: purple,
        secondary: teal,
        tonalOffset: 0.3
    },
    typography: { useNextVariants: true }
});

ReactDOM.render((
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </MuiThemeProvider>
), document.getElementById('root'));
