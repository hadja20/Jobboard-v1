import React, { useState, useEffect } from "react";

import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Swal from 'sweetalert2';
import axios from "axios";
import AddRecruiter from "./AddRecruiter";
import EditRecruiterById from "./EditRecruiterById";

function AllRecruiters() {

    const { http, token } = AuthUser();
    const [open, setOpen] = useState(false)
    const [recruiters, setRecruiters] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [recruiter, setRecruiter] = useState({})


    const deleteRecruiter = async (recruiter) => {
        const isConfirm = await Swal.fire({
            title: `Êtes-vous sûre de vouloir supprimer le recruteur ${recruiter.firstName} ${recruiter.lastName}?`,
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

        await http.delete('/auth/recruiters/' + recruiter.id,).then(res => {
            Swal.fire({
                icon: "success",
                text: "Le recruteur a bien été supprimé",
                confirmButtonColor: "#2c74d3"
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue. Veuillez réessayez ultérieurement.",
                confirmButtonColor: "#2c74d3"
            })
        });

        getAllRecruiters()
    }




    const getAllRecruiters = async () => {
        await http.get(`auth/recruiters/`)
            .then(res => {
                const recruiters = res.data
               
                setRecruiters(recruiters)
            })
    }

    useEffect(() => {
        getAllRecruiters();
    }, [])



    const handleClickOpen = (recruiter) => {
        setOpen(true)
        setRecruiter(recruiter)
    }

    const handleClose = () => {
        setOpen(false)

    }


    const openAddRecruiter = () => {
        setOpenAdd(true)
    }

    const closeAddRecruiter = () => {
        setOpenAdd(false)
    }

    return (
        <>

            <div className="title-section"><h3> Les recruteurs</h3></div>
            <button className="btn btn-outline-primary px-4" onClick={e => openAddRecruiter()} >Ajouter un recruteur</button>

            <div className="table">
                <table className=" table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruiters.map(recruiter => {
                            return <tr key={recruiter.person_id}>
                                <th scope="row">{recruiter.person_id}</th>
                                <td>{recruiter.firstName}</td>
                                <td>{recruiter.lastName}</td>
                                <td>{recruiter.email}</td>
                                <td>
                                    <button className="btn edit-user" onClick={e => handleClickOpen(recruiter)}><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn delete-user" onClick={e => deleteRecruiter(recruiter)}><FontAwesomeIcon icon={faTrash} /></button>
                                </td>

                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            <Dialog open={open}>
                <DialogTitle> Modifier le recruteur {recruiter.firstName}  {recruiter.lastName} </DialogTitle>
                <DialogContent>
                    <EditRecruiterById recruiter={recruiter} close={handleClose} getAllRecruiters={getAllRecruiters} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()}>Annuler</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd}>
                <DialogTitle>Ajouter un recruteur</DialogTitle>
                <DialogContent>
                    <AddRecruiter closeAddRecruiter={closeAddRecruiter} getAllRecruiters={getAllRecruiters} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => closeAddRecruiter()}>Annuler</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default AllRecruiters;

// <EditAdminById recruiter={recruiter} close={handleClose} getAllRecruiters={getAllRecruiters} />

//   <AddAdmin closeAddRecruiter={closeAddRecruiter} getAllRecruiters={getAllRecruiters} />
