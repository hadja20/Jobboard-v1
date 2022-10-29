
import React, { useState } from "react";
import AuthUser from "../AuthUser";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import EditCompany from "./EditCompany";


function EditPost(props) {

    const { token,user } = AuthUser()
    const [title, setTitle] = useState(props.post.title)
    const [description, setDescription] = useState(props.post.description)
    const [postcode, setPostcode] = useState(props.post.postcode)
    const [city, setCity] = useState(props.post.city)
    const [places, setPlaces] = useState(props.post.places)
    const [salary, setSalary] = useState(props.post.salary)
    const [contract, setContract] = useState(props.post.contract)


    const editPost = async () => {

        const params = new URLSearchParams();
        const formData = new FormData();
        formData.append("title", title)
        formData.append("postcode", postcode)
        formData.append("description", description)
        formData.append("city", city)
        formData.append("places", places)
        formData.append("salary", salary)
        formData.append("contract", contract)
        formData.append("recruiter_id", user.person_id)
     

        const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        http.post('/auth/advertisements/' + props.post.id,
            formData

        ).then((res) => {
            Swal.fire({
                icon: "success",
                text: "L'offre d'emploi a bien été modifiée",
                confirmButtonColor: "#2c74d3"
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue lors de la modification. Veuillez rééssayez ultérieurement.",
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

        props.getAllPosts()
        props.close()

    }



    return (
        <>
            <Form>
                <div className="mb-4">
                    <div className="col">
                        <label htmlFor="title" className="form-label">Intitulé du poste</label>
                        <input type="text" className="form-control" aria-label="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
                    </div>
                    <div className="col">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="textarea" className="form-control" placeholder="Entrez une description" aria-label="Last name" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="postcode" className="form-label">Code Postal</label>
                    <input type="text" className="form-control" id="postcode" name="postcode"  onChange={(e) => setPostcode(e.target.value)} value={postcode} required></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="city" className="form-label">Ville</label>
                    <input type="text" className="form-control" id="city" name="city" onChange={(e) => setCity(e.target.value)} value={city} required></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="places" className="form-label">Nombre de poste à pourvoir</label>
                    <input type="number" className="form-control" id="places" name="places" onChange={(e) => setPlaces(e.target.value)} value={places} min={1} required></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="salary" className="form-label">Salaire (€/mois)</label>
                    <input type="number" className="form-control" id="salary" name="salary" onChange={(e) => setSalary(e.target.value)} min={0}   value={salary} required></input>
                </div>

                <select className="form-select" aria-label="Default select" onChange={(e) => setContract(e.target.value)} name="contract" value={contract}>
                    <option > Type de contrat</option>
                    <option value="CDD">CDD</option>
                    <option value="CDI">CDI</option>
                    <option value="ALTERNANCE">Alternance</option>
                    <option value="STAGE">Stage</option>
                </select>


                <div className="mt-4">
                    <button className="btn btn-primary" type="button" onClick={e => editPost()} >Modifier offre d'emploi</button>
                </div>
            </Form>

        </>
    )
}

export default EditPost;
