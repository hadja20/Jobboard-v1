
import React, { useState } from "react";
import AuthUser from "../AuthUser";
import axios from 'axios';
import Form from 'react-bootstrap/Form';


import Swal from 'sweetalert2';


function EditJobseeker(props) {

    const { token } = AuthUser()
    const [firstName, setFirstName] = useState(props.jobseeker.firstName)
    const [lastName, setLastName] = useState(props.jobseeker.lastName)
    const [email, setEmail] = useState(props.jobseeker.email)
    const [phone, setPhone] = useState(props.jobseeker.phone)
    const [bio, setBio] = useState(props.jobseeker.bio)


    const editJobseeker = async () => {

        const formData = new FormData();     
        formData.append("firstName",firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("bio", bio);
        formData.append("phone", phone);

        const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        await http.post(`/auth/jobseekers/`+props.jobseeker.id, formData).then(response => {
            Swal.fire({
                icon: "success",
                text: "Les informations du rechercheur d'emploi ont bien été modifiées.",
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

            props.getAllJobseekers()
            props.close()

    }



    return (
        <>
            <Form>
                <div className="mb-4">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input type="text" className="form-control" placeholder="Le prénom" aria-label="First name" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={props.jobseeker.firstName}required></input>
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input type="text" className="form-control" placeholder="Le nom" aria-label="Last name" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} value={props.jobseeker.lastName} required></input>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Entrez l'email" name="email" onChange={(e) => setEmail(e.target.value)} required value={props.jobseeker.email}></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input type="tel" className="form-control" id="phone" pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}" placeholder="numéro de téléphone" onChange={(e) => setPhone(e.target.value)} value={props.jobseeker.phone} name="phone"></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="bio" className="form-label">Bio (Optionnel) </label>                    
                    <textarea className="form-control" aria-label="message" name="bio" id="bio" onChange={(e) => setBio(e.target.value)} value={props.jobseeker.bio}></textarea>
                </div>
                <div>
                    <button className="btn btn-primary" type="button" onClick={e => editJobseeker()} >Modifier rechercheur d'emploi</button>
                </div>
            </Form>

        </>
    )
}

export default EditJobseeker;
