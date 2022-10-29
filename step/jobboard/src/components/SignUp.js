// Inside header.js/button SignUp

import React, { useState } from "react";
import "./SIgnUp.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'


function SignUp() {

    const apiURL = 'http://localhost:8000/api'
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [phone, setPhone] = useState("")
    const [bio, setBio] = useState("")
    const [cv, setCv] = useState("")
    const [cover_letter, setLM] = useState("")

    const navigate = useNavigate();

    const handleCv = (event) => {
        setCv(event.target.files[0]);
    }

    const handleLM = (event) => {
        setLM(event.target.files[0]);
    }

    const register = async () => {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("bio", bio);
        formData.append("password_confirmation", password_confirmation);
        formData.append("phone", phone);
        formData.append("cv", cv);
        formData.append("cover_letter", cover_letter);

        await axios.post(apiURL + `/auth/register/jobseeker`, formData).then(response => {

            navigate("/Login")
            Swal.fire({
                icon: "success",
                text: "Inscription Validée",
                confirmButtonColor: "#2c74d3"
            },)          

        })
            .catch(({response:{data}})=> {

                Swal.fire({
                    icon: "error",
                    text: "Une erreur est survenue",
                    confirmButtonColor: "#2c74d3"
                })
            });
    }

    return (
        <div className="main-id">
            <h1>Créer un compte</h1>
            <div className="register-form">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="mb-4">
                                <div className="col">
                                    <label htmlFor="firstName" className="form-label">Prénom</label>
                                    <input type="text" className="form-control" placeholder="votre prénom" aria-label="First name" name="firstName" onChange={(e) => setFirstName(e.target.value)} required></input>
                                </div>
                                <div className="col">
                                    <label htmlFor="lastName" className="form-label">Nom</label>
                                    <input type="text" className="form-control" placeholder="votre nom" aria-label="Last name" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} required></input>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="entrez votre email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Mot de passe</label>
                                <input type="password" className="form-control" id="password" placeholder="votre mot de passe" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password_confirmation" className="form-label">Confirmez votre mot de passe</label>
                                <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="confirmation de votre mot de passe" required></input>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label">Téléphone</label>
                                <input type="tel" className="form-control" id="phone" pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}" placeholder="numéro de téléphone" onChange={(e) => setPhone(e.target.value)} name="phone"></input>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="bio" className="form-label">Bio (Optionnel) </label>
                                <p className="bio"> Décrivez-vous en quelques mots.</p>
                                <textarea className="form-control" aria-label="message" name="bio" id="bio" onChange={(e)=>setBio(e.target.value)}></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cv" className="form-label">CV</label>
                                <input type="file" className="form-control" id="cv" name="cv" onChange={handleCv}></input>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cover_letter" className="form-label">Lettre de motivation</label>
                                <input type="file" className="form-control" id="cover_letter" name="cover_letter" onChange={handleLM}></input>
                            </div>
                            <div>
                                <button className="btn btn-primary" type="button" onClick={(e) => { register() }}>S'inscrire</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUp;