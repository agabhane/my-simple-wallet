import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand text-white" to="/">#mysimplewallet</Link>
            <ul className="navbar-nav ml-sm-auto">
                <li className="navbar-item dropdown">
                    <button className="btn btn-outline-light btn-sm d-sm-none" id="navbarDropdown" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        +
                    </button>
                    <div className="dropdown-menu full" aria-labelledby="navbarDropdown">
                        <button className="dropdown-item" type="button"><Link to="/income">Income</Link></button>
                        <button className="dropdown-item" type="button"><Link to="/budget">Budget</Link></button>
                        <button className="dropdown-item" type="button"><Link to="/expense">Expense</Link></button>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Header;