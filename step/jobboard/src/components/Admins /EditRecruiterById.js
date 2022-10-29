
import React, { useState } from "react";
import AuthUser from "../AuthUser";
import axios from 'axios';
import Form from 'react-bootstrap/Form';


import Swal from 'sweetalert2';
import EditAdmin from "../User Profile/editAdmin";


function EditRecruiterById(props) {

    const { token } = AuthUser()
    const [firstName, setFirstName] = useState(props.recruiter.firstName)
    const [lastName, setLastName] = useState(props.recruiter.lastName)
    const [email, setEmail] = useState(props.recruiter.email)


    const editRecruiter = async () => {

        const formData = new FormData();     
        formData.append("firstName",firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);

        const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        await http.post(`/auth/recruiters/`+props.recruiter.id, formData).then(response => {
            Swal.fire({
                icon: "success",
                text: "Les informations du recruteur ont bien été modifiées.",
                confirmButtonColor: "#2c74d3"
            },)          

        })
            .catch((error)=> {

                Swal.fire({
                    icon: "error",
                    text: "Une erreur est survenue",
                    confirmButtonColor: "#2c74d3"
                })
            });

            props.getAllRecruiters()
            props.close()

    }



    return (
        <>
            <Form>
            <div className="mb-4">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input type="text" className="form-control" placeholder="Le prénom" aria-label="First name" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={props.recruiter.firstName}required></input>
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input type="text" className="form-control" placeholder="Le nom" aria-label="Last name" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} value={props.recruiter.lastName} required></input>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Entrez l'email" name="email" onChange={(e) => setEmail(e.target.value)} required value={props.recruiter.email}></input>
                </div>
                <div>
                    <button className="btn btn-primary" type="button" onClick={e => editRecruiter()} >Modifier recruteur</button>
                </div>
            </Form>

        </>
    )
}

export default EditRecruiterById;
