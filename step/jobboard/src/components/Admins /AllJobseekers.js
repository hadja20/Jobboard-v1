import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import AddJobseeker from "./AddJobseeker";
import EditJobseeker from "./EditJobseeker";
import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

import Swal from 'sweetalert2';
import axios from 'axios'
function AllJobseekers() {

    const { http, token } = AuthUser();
    const [open, setOpen] = useState(false)
    const [jobseekers, setJobseekers] = useState([])

    const [openAdd, setOpenAdd] = useState(false)
    const [jobseeker, setJobseeker] = useState({})

    const deleteJobseeker = async (jobseeker) => {
        const isConfirm = await Swal.fire({
            title: `Êtes-vous sûre de vouloir supprimer l'utilisateur ${jobseeker.firstName} ${jobseeker.lastName} ?`,
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

        http.delete('/auth/jobseekers/' + jobseeker.id).then(res => {
            Swal.fire({
                icon: "success",
                text: "L'utilisateur a bien été supprimé",
                confirmButtonColor: "#2c74d3"
            })
            getAllJobseekers()
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue. Veuillez réessayez ultérieurement.",
                confirmButtonColor: "#2c74d3"
            })
        });
    }

    const getAllJobseekers = async () => {
        await http.get(`auth/jobseekers/`)
            .then(res => {
                const jobseekers = res.data
                setJobseekers(jobseekers)
            })
    }

    const openAddJobseeker = () => {
        setOpenAdd(true)
    }

    const closeAddJobseeker = () => {
        setOpenAdd(false)


    }


    useEffect(() => {
        getAllJobseekers();
    }, [])


    const handleClickOpen = (jobseeker) => {
        setOpen(true)
        setJobseeker(jobseeker)
    }

    const handleClose = () => {
        setOpen(false)

    }
    return (
        <>

            <div className="title-section"><h3> Les rechercheurs d'emploi</h3></div>

            <button className="btn btn-outline-primary px-4" onClick={e => openAddJobseeker()}>Ajouter un rechercheur d'emploi</button>

            <div className="table">
                <table className=" table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">email</th>
                            <th scope="col">Bio</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobseekers.map(jobseeker => {
                            return <tr key={jobseeker.id}>
                                <th scope="row">{jobseeker.id}</th>
                                <td>{jobseeker.firstName}</td>
                                <td>{jobseeker.lastName}</td>
                                <td>{jobseeker.email}</td>
                                <td>{jobseeker.bio}</td>
                                <td>
                                    <button className="btn edit-user" onClick={e => handleClickOpen(jobseeker)} ><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn delete-user" onClick={e => deleteJobseeker(jobseeker)}><FontAwesomeIcon icon={faTrash} /></button>
                                </td>

                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            <Dialog open={open}>
                <DialogTitle> Modifier le rechercheur d'emploi {jobseeker.firstName}  {jobseeker.lastName} </DialogTitle>
                <DialogContent>
                    <EditJobseeker jobseeker={jobseeker} close={handleClose} getAllJobseekers={getAllJobseekers} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()}>Annuler</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd}>
                <DialogTitle>Ajouter un rechercheur d'emploi</DialogTitle>
                <DialogContent>
                    <AddJobseeker closeAddJobseeker={closeAddJobseeker} getAllJobseekers={getAllJobseekers} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => closeAddJobseeker()}>Annuler</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default AllJobseekers;