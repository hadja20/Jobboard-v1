
import React from 'react';
import './guest.css';
import { Link } from "react-router-dom";
import logo from './logo.png';

function Guest(){

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" whidth="100" height="90" className="img" ></img>
                </Link>
                <div className='btn-navbar'>
                    <Link to="/login">
                        <button type="button" className="btn btn-primary">Se connecter</button>
                    </Link>
                    <Link to="/login1">
                        <button type="button" className="btn btn-primary">Créer un compte</button>
                    </Link>
                </div>
            </nav>
        </>

    )
}


export default Guest