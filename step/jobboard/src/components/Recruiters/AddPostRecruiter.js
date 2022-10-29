
import React, { useState } from "react";
import AuthUser from "../AuthUser";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import Swal from 'sweetalert2';


function AddPostRecruiter(props) {

    const { token } = AuthUser()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState("")
    const [postcode, setPostcode] = useState("")
    const [city, setCity] = useState("")
    const [places, setPlaces] = useState("")
    const [salary, setSalary] = useState("")
    const [contract, setContract] = useState("")




    const addPost = async () => {


        const params = new URLSearchParams();
        const formData = new FormData();
        formData.append("title", title)
        formData.append("postcode", postcode)
        formData.append("description", description)
        formData.append("city", city)
        formData.append("places", places)
        formData.append("salary", salary)
        formData.append("contract", contract)
        formData.append("recruiter_id",props.recruteur.person_id)

    


        const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        http.post('/auth/advertisements',
            formData

        ).then((res) => {
            Swal.fire({
                icon: "success",
                text: "Votre offre d'emploi a bien été publiée",
                confirmButtonColor: "#2c74d3"
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue lors de la publication de votre offre d'emploi. Veuillez rééssayez ultérieurement.",
                confirmButtonColor: "#2c74d3"
            })
            if (error.response) {

                console.log(error.response)
            } else if (error.request) {

                console.log(error.request)

            } else if (error.message) {

                console.log(error.message)
            }
        })

        props.closeAddPost();
        props.getAllPosts();

    }



    return (
        <>
            <Form>
                <div className="mb-4">
                    <div className="col">
                        <label htmlFor="title" className="form-label">Intitulé du poste</label>
                        <input type="text" className="form-control" aria-label="title" name="title" onChange={(e) => setTitle(e.target.value)} required></input>
                      
                    </div>
                    <div className="col">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="textarea" className="form-control" placeholder="Entrez une description" aria-label="Last name" name="description" id="description" onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="postcode" className="form-label">Code Postal</label>
                    <input type="text" className="form-control" id="postcode" name="postcode" onChange={(e) => setPostcode(e.target.value)} required></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="form-label">Ville</label>
                    <input type="text" className="form-control" id="city" name="city" onChange={(e) => setCity(e.target.value)} required></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="places" className="form-label">Nombre de poste à pourvoir</label>
                    <input type="number" className="form-control" id="places" name="places" onChange={(e) => setPlaces(e.target.value)} min={1} required></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="salary" className="form-label">Salaire (€/mois)</label>
                    <input type="number" className="form-control" id="salary" name="salary" onChange={(e) => setSalary(e.target.value)} min={0} required></input>
                </div>

                <select className="form-select" aria-label="Default select" onChange={(e)=>setContract(e.target.value)} name="contract">
                   <option > Type de contrat</option>
                    <option value="CDD">CDD</option>
                    <option value="CDI">CDI</option>
                    <option value="ALTERNANCE">Alternance</option>
                    <option value="STAGE">Stage</option>
                </select>
                

                <div className="mt-4">
                    <button className="btn btn-primary" type="button" onClick={e => addPost()} >Ajouter Offre d'emploi</button>
                </div>
            </Form>

        </>
    )
}

export default AddPostRecruiter;
