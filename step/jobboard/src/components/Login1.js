import React from "react";
import { Link } from "react-router-dom";
import './login1.css'

function Login1(){
    return(
        <div className="main-content">
    <div className="d-grid gap-2">
        <h1>Vous êtes ... </h1>
        <Link to="/SignUp">
        <button className="btn btn-primary" type="button">Chercheur d'emploi</button>
        </Link>
        <Link to="/recruteur">
        <button className="btn btn-primary" type="button">Employeur</button>
        </Link>
    </div>
    </div>
    )
}

export default Login1;