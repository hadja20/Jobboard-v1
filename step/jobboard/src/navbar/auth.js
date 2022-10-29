
import React from 'react';
import './guest.css';
import { Link } from "react-router-dom";
import logo from './logo.png';
import AuthUser from '../components/AuthUser';

function Auth() {

    const { token, logout, isAdmin, isRecruiter, isJobseeker } = AuthUser()

    const noJobseeker = isRecruiter() || isAdmin()
    const noAdmin = isRecruiter() || isJobseeker()
    const noRrecruiter= isAdmin() || isJobseeker()

    const logoutUser = () => {
        if (token !== undefined) {
            logout()
        }
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" whidth="100" height="90" className="img" ></img>
                </Link>
                <div className='btn-navbar'>


                    <Link to="/Login">
                        <button type="button" className="btn btn-primary" onClick={e => logoutUser()}>Se déconnecter</button>
                    </Link>


                    <div hidden={noJobseeker}>

                        <Link to="/user-profile">
                            <button type="button" className="btn btn-primary">Mon profil</button>
                        </Link>
                    </div>
                    <div  hidden={noAdmin}>
                        <Link to="/Login/admin-profile">
                            <button type="button" className="btn btn-primary">Mon profil</button>
                        </Link>
                    </div>

                    <div  hidden={noRrecruiter}>
                        <Link to="/Login/recruiter-profile">
                            <button type="button" className="btn btn-primary">Mon profil</button>
                        </Link>
                    </div>


                </div>
            </nav>
        </>

    )
}


export default Auth