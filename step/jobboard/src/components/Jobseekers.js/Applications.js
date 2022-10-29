import React, { useState, useEffect } from "react";

import axios from 'axios';
import Swal from 'sweetalert2';
import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'



function ApplicationsJobseeker() {



    const { token, http, user } = AuthUser();
    const [open, setOpen] = useState(false)
    const [applications, setApplication] = useState([])
    const [p, setP] = useState({})

    const getAllApplications = async () => {
        await http.get(`/auth/jobseekers/${user.id}/applications`)
            .then(res => {
                const application = res.data
                setApplication(application)
            })

    }


    const handleClickOpen = (post) => {
        setOpen(true)
        setP(post)

    }



    useEffect(() => {
        getAllApplications();
    }, [])


    const cancelApplication = async (post) => {
        const isConfirm = await Swal.fire({
            title: `Êtes-vous sûre de vouloir annuler votre candidature ${post.title}?`,
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c74d3',
            cancelButtonColor: '#d33',
            cancelButtonText: "Non",
            confirmButtonText: 'Oui, je suis sûr.'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }
        const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        await http.delete('/auth/applications/' + post.id,).then(res => {
            Swal.fire({
                icon: "success",
                text: "Votre candidature a bien été annulée",
                confirmButtonColor: "#2c74d3"
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue. Veuillez réessayez ultérieurement.",
                confirmButtonColor: "#2c74d3"
            })
        });

        getAllApplications()

    }
    return (
        <>

            <div className="title-section"><h3> Mes candidatures en cours</h3></div>


            {applications.map(application => {
                return <div className="myposts" key={application.id} >
                    <div className="card mb-3 posts">
                        <div className="card-body">

                            <h1> {application.title}</h1>

                            <h4> DESCRIPTION DU POSTE</h4>
                            <p> {application.description}</p>
                            <h4> Type de contrat</h4>
                            <p> {application.contract}</p>
                            <h4>Lieu du poste</h4>
                            <p>({application.postcode}) {application.city}</p>
                            <h4> Salaire</h4>
                            <p>{application.salary}€</p>
                            <h4> Nombre de postes à pourvoir</h4>
                            <p> {application.places} </p>

                            <button className="btn btn-primary posts" onClick={e => cancelApplication(application)}>Annuler candidature</button>
                        </div>
                    </div>
                </div>

            })}


        </>
    )
}

export default ApplicationsJobseeker;