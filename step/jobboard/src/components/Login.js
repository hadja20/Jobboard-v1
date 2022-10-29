// Inside header.js/button login

import React, { useState } from "react";
import "./login.css";
import AuthUser from "./AuthUser";
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from "react-router-dom";

function Login() {

    const navigate=useNavigate()
    const {http,setToken}=AuthUser();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAUthAdmin, setAuthAdmin]=useState(false)

    const handleSubmit = async e => {
        const formData = new FormData();
        formData.append("email", email)
        formData.append("password", password)
        e.preventDefault();
        await http.post(`/auth/login`,
            formData                   
        ).then(response => {
            setToken(response.data.user,response.data.access_token)    
          
            if(response.data.user.role_id===1){
               navigate('admin-profile')
            }else if(response.data.user.role_id===2){
                navigate('recruiter-profile')
            }
        })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    text: "Une erreur est survenue. Veuillez réessayez.",
                    confirmButtonColor: "#2c74d3"
                })
                
            });

          
    }

    return (
        <div className="main-content">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Se connecter</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <div className="liensignup">
                            <a href="http://localhost:3000/login1" className="card-link">Vous n'avez pas de compte ? Cliquez-ici</a>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary" >Connexion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
