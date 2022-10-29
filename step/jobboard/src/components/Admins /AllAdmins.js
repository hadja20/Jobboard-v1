import React, { useState, useEffect } from "react";

import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddAdmin from "./AddAdmin";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import EditAdminById from "./EditAdmin";
import Swal from 'sweetalert2';
import axios from "axios";

function AllAdmins() {

    const { http,token } = AuthUser();
    const [open, setOpen] = useState(false)
    const [admins, setAdmins] = useState([])


    const [openAdd, setOpenAdd] = useState(false)
    const [admin, setAdmin] = useState({})


    const deleteAdmin = async (admin)=>{
        const isConfirm = await Swal.fire({
            title: `Êtes-vous sûre de vouloir supprimer l'administarteur ${admin.firstName} ${admin.lastName}?`,
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c74d3',
            cancelButtonColor: '#d33',
            cancelButtonText:"Non",
            confirmButtonText: 'Oui, je suis sûr.'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        await http.delete('/auth/admins/' + admin.id,).then(res => {
            Swal.fire({
                icon: "success",
                text: "L'administrateur a bien été supprimé",
                confirmButtonColor: "#2c74d3"
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue. Veuillez réessayez ultérieurement.",
                confirmButtonColor: "#2c74d3"
            })
        });

        getAllAdmins()
    }


    const getAllAdmins = async () => {
        await http.get(`auth/admins/`)
            .then(res => {
                const admins = res.data
                setAdmins(admins)
            })
    }

    useEffect(() => {
        getAllAdmins();
    }, [])


    const handleClickOpen = (admin) => {
        setOpen(true)
        setAdmin(admin)
    }

    const handleClose = () => {
        setOpen(false)

    }


    const openAddAdmin = () => {
        setOpenAdd(true)
    }

    const closeAddAdmin = () => {
        setOpenAdd(false)
    }

    return (
        <>
        <div className="title-section"><h3> Les admininistrateurs</h3></div>
            <button className="btn btn-outline-primary px-4" onClick={e=>openAddAdmin()}>Ajouter un administrateur</button>

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
                        {admins.map(admin => {
                            return <tr key={admin.person_id}>
                                <th scope="row">{admin.person_id}</th>
                                <td>{admin.firstName}</td>
                                <td>{admin.lastName}</td>
                                <td>{admin.email}</td>
                                <td>
                                    <button className="btn edit-user" onClick={e=>handleClickOpen(admin)} ><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn delete-user" onClick={e=> deleteAdmin(admin) }><FontAwesomeIcon icon={faTrash} /></button>
                                </td>

                            </tr>
                        })}

                    </tbody>
                </table>
            </div>

            <Dialog open={open}>
                <DialogTitle> Modifier l'administrateur {admin.firstName}  {admin.lastName} </DialogTitle>
                <DialogContent>
                   <EditAdminById admin={admin} close={handleClose} getAllAdmins={getAllAdmins} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()}>Annuler</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd}>
                <DialogTitle>Ajouter un rechercheur d'emploi</DialogTitle>
                <DialogContent>
                    <AddAdmin closeAddAdmin={closeAddAdmin} getAllAdmins={getAllAdmins} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => closeAddAdmin()}>Annuler</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default  AllAdmins;