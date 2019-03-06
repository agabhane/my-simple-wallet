import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary fixed-top">
            <Link className="navbar-brand text-white" to="/">#mysimplewallet</Link>
            <div className="d-flex">
                {/* <button className="btn btn-sm btn-outline-light mr-2">Aug</button> */}
                <ul className="navbar-nav">
                    <li className="navbar-item dropdown">
                        <button className="btn btn-outline-light btn-sm" id="navbarDropdown" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-plus"></i>
                        </button>
                        <div className="dropdown-menu full" aria-labelledby="navbarDropdown">
                            <button className="dropdown-item" type="button"><Link to="/income">Income</Link></button>
                            <button className="dropdown-item" type="button"><Link to="/budget">Budget</Link></button>
                            <button className="dropdown-item" type="button"><Link to="/expense">Expense</Link></button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default Header;