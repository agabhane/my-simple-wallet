import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';

import db from './db/db';
db.initialize();

ReactDOM.render((
    <Router>
        <App />
    </Router>
), document.getElementById('root'));
