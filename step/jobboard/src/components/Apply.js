import React, { Component } from "react";
import "./apply.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

const apiURL = 'http://localhost:8000/api'

class Apply extends Component {




    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        cv: "",
        cover_letter: "",
        bio: "",
        password: "",
        password_confirmation: "",
        subject: 'Offre emploi: ' + this.props.subject,
        body: "",
    }

    constructor(props) {
        super(props)
        SimpleReactValidator.addLocale('fr', {
            required: `:attribute est requis`,
            email: `le format de l'email est invalide`,
            min: `le mot de passe doit être composé d'au moins 6 caractères`,
            alpha: `le :attribute ne peut contenir que des lettres`,
            typeof: `seuls les format .pdf sont acceptés`

        });

        this.validator = new SimpleReactValidator({
            validators: {
                match_password: {
                    message: 'Les 2 mots de passe doivent être identiques',
                    rule: (val, params, validator) => {
                        return val === params[0]
                    }
                },
                phone: {
                    message: `le numéro de téléphone est invalide`,
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val, /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)
                    }

                }
            },
            locale: 'fr'
        });
    }
    handleForm = (event) => {
        this.setState({ [event.target.name]: event.target.value });


    }

    handleCv = (event) => {
        this.setState({ [event.target.name]: event.target.files[0] });

    }

    handleLM = (event) => {
        this.setState({ [event.target.name]: event.target.files[0] });

    }

    apply = async () => {


        const formData = new FormData();
        if (this.props.user) {
            formData.append("subject", this.state.subject);
            formData.append("body", this.state.body);
            formData.append("advertisement_id", this.props.advertisement.advertisement_id);
            formData.append("jobseeker_id", this.props.user.id);
            await this.props.http.post('/auth/applications/advertisement/apply', formData).then(response => {
                Swal.fire({
                    icon: "success",
                    text: "Candidature envoyée",
                    confirmButtonColor: "#2c74d3"
                })
            })
                .catch(error => {
                    if (error.response) {
                        Swal.fire({
                            icon: "error",
                            text: `Vous avez déja une candidature en cours pour cette offre d'emploi`,
                            confirmButtonColor: "#2c74d3"

                        })
                    } else if (error.request) {

                        console.log(error.request)

                    } else if (error.message) {

                        console.log(error.message)
                    }

                    this.props.closeDialog();

                });

            this.props.closeDialog();
        } else {

            if (this.validator.allValid()) {

                formData.append("firstName", this.state.firstName);
                formData.append("lastName", this.state.lastName);
                formData.append("email", this.state.email);
                formData.append("password", this.state.password);
                formData.append("password_confirmation", this.state.password_confirmation);
                formData.append("phone", this.state.phone);
                formData.append("bio", this.state.bio);
                formData.append("cv", this.state.cv);
                formData.append("cover_letter", this.state.cover_letter);


                await axios.post(apiURL + `/auth/register/jobseeker`, formData)
                    .then(response => {


                        this.props.http.post(`/auth/login/`, {
                            email: this.state.email,
                            password: this.state.password
                        }).then((response) => {

                            this.props.setToken(response.data.user, response.data.access_token)


                            const http = axios.create({
                                baseURL: "http://localhost:8000/api",
                                headers: {
                                    "Content-type": "application/json",
                                    "Authorization": `Bearer ` + response.data.access_token
                                }
                            });
                            http.post('/auth/applications/advertisement/apply',
                                {
                                    subject: this.state.subject,
                                    body: this.state.body,
                                    advertisement_id: this.props.advertisement.advertisement_id,
                                    jobseeker_id: response.data.user.id
                                }
                            ).then(response => {
                                Swal.fire({
                                    icon: "success",
                                    text: "Candidature envoyée"
                                })
                            })
                                .catch(error => {
                                    if (error.response) {
                                        console.log("error")
                                        Swal.fire({
                                            icon: "error",
                                            text: `Vous avez déja une candidature en cours pour cette offre d'emploi`,
                                            confirmButtonColor: "#2c74d3"
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            text: `Une erreur est survenue. Veuillez réessayez ultérieurement`,
                                            confirmButtonColor: "#2c74d3"
                                        })
                                    }
                                });

                        }).catch(error => {
                            Swal.fire({
                                icon: "error",
                                text: "Une erreur est survenue. Veuillez réessayer ultérieurement.",
                                confirmButtonColor: "#2c74d3"
                            })
                            this.props.navigate('/Login')
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: "error",
                            text: "Une erreur est survenue. Veuillez créez un compte.",
                            confirmButtonColor: "#2c74d3"
                        })
                        this.props.navigate('/SignUp')
                        
                    });

            this.props.closeDialog();
            }

            else {
                this.validator.showMessages();
                this.forceUpdate();
            }


        }

    }



    render() {
        this.validator.purgeFields();
        return <>
            <form onSubmit={(e) => this.apply()} files="true" noValidate>
                <div className="no-authentified" hidden={this.props.user}>
                    <div className="mb-4">
                        <div className="col1">
                            <label htmlFor="firstName" className="form-label">Prénom</label>
                            <input type="text" className="form-control" placeholder="First name" aria-label="First name" name="firstName" required onChange={this.handleForm}></input>
                            {this.validator.message('Votre prénom', this.state.firstName, 'required|alpha', { className: 'text-danger' })}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" name="lastName" required onChange={this.handleForm}></input>
                        {this.validator.message('Votre nom de famille', this.state.lastName, 'required|alpha', { className: 'text-danger' })}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" name="email" required onChange={this.handleForm}></input>
                        {this.validator.message('Votre adresse email', this.state.email, 'required|email', { className: 'text-danger' })}

                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" placeholder="mot de passe" name="password" required onChange={this.handleForm}></input>
                        {this.validator.message('Votre mot de passe', this.state.password, 'required|min:6', { className: 'text-danger' })}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="form-label">Confirmez votre mot de passe</label>
                        <input type="password" className="form-control" id="password_confirmation" placeholder="confirmation du mot de passe" name="password_confirmation" required onChange={this.handleForm}></input>    {this.validator.message('mot de passe', this.state.password, 'required|min:6', { className: 'text-danger' })}
                        {this.validator.message('Votre mot de passe de confirmation', this.state.password_confirmation, `required|match_password:${this.state.password}`, { className: 'text-danger' })}

                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="form-label">Téléphone</label>
                        <input type="tel" className="form-control" id="numphone" name="phone" onChange={this.handleForm}></input>
                        {this.validator.message('Votre numéro de téléphone', this.state.phone, `required|phone`, { className: 'text-danger' })}

                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="body" className="form-label">Message</label>
                    <textarea className="form-control" aria-label="message" name="body" onChange={this.handleForm}></textarea>
                    {this.validator.message('Votre message', this.state.body, `required`, { className: 'text-danger' })}

                </div>
                <div className="mb-4">
                    <label htmlFor="cv" className="form-label">CV</label>
                    <input type="file" className="form-control" id="cv" name="cv" required onChange={this.handleCv}></input>
                    {this.validator.message('Votre cv', this.state.cv, `required`, { className: 'text-danger' })}

                </div>
                <div className="mb-4">
                    <label htmlFor="cover_letter" className="form-label">Lettre de motivation</label>
                    <input type="file" className="form-control" id="coverr_letter" name="cover_letter" onChange={this.handleLM}></input>
                    {this.validator.message('Votre lettre de motivation', this.state.cover_letter, `required`, { className: 'text-danger' })}
                </div>
                <div>
                    <Link to="/">
                        <button className="btn btn-primary" type="button" onClick={(e) => { this.apply(); }}>Postuler</button>
                    </Link>
                </div>
            </form>
        </>
    }

}



export default Apply;

