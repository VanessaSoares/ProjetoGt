import React, { Component } from 'react';
import { Link } from 'react-router'
const AppBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link to='/' className='navbar-brand logo'>{props.logo}</Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <Link to='/mapas' className='nav-link'>Mapa</Link>
                    <li className="nav-item">
                    </li>

                </ul>

            </div>
        </nav>
    )
}

export default AppBar