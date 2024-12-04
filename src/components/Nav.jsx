import React, { useState } from 'react';
import '../Styles/Nav.css';
import { NavLink } from 'react-router-dom';

export default function Nav() {


    return (
        <header className="nav-header">
            <div className="container">
                <nav className="navbar">
                    <ul className="nav-list">
                        <NavLink to={'/'}>
                            <li>Home</li>
                        </NavLink>
                        <NavLink to={'/verify/checkCertificate'}>
                            <li>Check</li>
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
