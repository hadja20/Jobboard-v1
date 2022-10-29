
import React, { useState } from "react";
import AuthUser from "../AuthUser";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';


function EditCompany(props) {

    const { token } = AuthUser()
    const [name, setName] = useState(props.company.name)
    const [description, setDescription] = useState(props.company.description)
    const [website, setWebsite] = useState(props.company.website)
    const [logo, setLogo] = useState(props.company.logo)



    const handleLogo = (event) => {

        const momo = event.target.files[0]
        setLogo(momo)
    }


    const addCompany = async () => {

        const params = new URLSearchParams();
        const formData = new FormData();
        formData.append("name", name)
        formData.append("website", website)
        formData.append("description", description)
        formData.append("logo", logo)


        const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        http.post('/auth/companies/'+props.company.id,
            formData

        ).then((res) => {
            Swal.fire({
                icon: "success",
                text: "La compagnie a bien été modifiée",
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

        props.getAllCompanies()
        props.close()

    }



    return (
        <>
            <Form>
                <div className="mb-4">
                    <div className="col">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input type="text" className="form-control" placeholder="Entrez le nom de votre compagnie" aria-label="First name" name="nom" onChange={(e) => setName(e.target.value)} value={name}></input>
                    </div>
                    <div className="col">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="textarea" className="form-control" placeholder="Entrez une description" aria-label="Last name" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="website" className="form-label">Site web</label>
                    <input type="text" className="form-control" id="website" placeholder="site web de votre compagnie" name="website" onChange={(e) => setWebsite(e.target.value)} value={website}></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="logo" className="form-label">Logo</label>
                    <div className="d-flex">
                    <p> Logo Actuel: </p>
                    <img src={`http://localhost:8000/storage/images/companiesLogo/${props.company.logo}`} width="50" height="50"></img>

                    </div>
                   
                    <input type="file" encType="multipart/form-data" className="form-control" id="logo" placeholder="logo de votre compagnie" name="logo" onChange={(e) => handleLogo(e)} required></input>
                </div>
                <div>
                    <button className="btn btn-primary" type="button" onClick={e => addCompany()} >Modifier Compagnie</button>
                </div>
            </Form>

        </>
    )
}

export default EditCompany;
