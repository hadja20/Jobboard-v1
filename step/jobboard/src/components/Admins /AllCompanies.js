
import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import EditCompany from "./EditCompany";
import axios from 'axios';
import AddCompany from "./AddCompany";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash} from '@fortawesome/free-solid-svg-icons'


import Swal from 'sweetalert2';


import AuthUser from "../AuthUser";

function AllCompanies() {



    const { token, http } = AuthUser();
    const [open, setOpen] = useState(false)
    const [companies, setCompanies] = useState([])

    const [openAdd, setOpenAdd] = useState(false)
    const [comp, setComp] = useState({})

    const getAllCompanies = async () => {
        await http.get(`/companies/`)
            .then(res => {
                const companies = res.data
                setCompanies(companies)
            })

    }

    const openAddCompany = () => {
        setOpenAdd(true)
    }

    const closeAddCompany = () => {
        setOpenAdd(false)


    }

    useEffect(() => {
        getAllCompanies();
    }, [])


    const handleClickOpen = (comp) => {
        setOpen(true)
        setComp(comp)
    }

    const handleClose = () => {
        setOpen(false)

    }

    const deleteCompany = async (comp) => {
        const isConfirm = await Swal.fire({
            title: `Êtes-vous sûre de vouloir supprimer la companie ${comp.name}?`,
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2c74d3',
            cancelButtonColor: '#d33',
            cancelButtonText:"Non",
            confirmButtonText: 'Oui, je suis sûre.'
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

        await http.delete('/auth/companies/' + comp.id,).then(res => {
            Swal.fire({
                icon: "success",
                text: "La compagnie a bien été supprimée",
                confirmButtonColor: "#2c74d3"
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue. Veuillez réessayez ultérieurement.",
                confirmButtonColor: "#2c74d3"
            })
        });

        getAllCompanies()

    }
    return (
        <>

            <button className="btn btn-outline-primary px-4" onClick={e => { openAddCompany() }}>Ajouter une compagnie</button>
            <div className="companies">
                {companies.map(company => {

                    return <div className="card mb-3" key={company.id}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`http://localhost:8000/storage/images/companiesLogo/${company.logo}`} className="img-fluid rounded-start" alt="logo"></img>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{company.name}</h5>
                                    <p className="card-text">{company.description}</p>
                                    <p className="card-text"><small className="text-muted">{company.website}</small></p>
                                    <button className="btn btn-primary company" onClick={e => handleClickOpen(company)} ><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn btn-primary company" onClick={e => deleteCompany(company)}><FontAwesomeIcon icon={faTrash} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                })}
            </div>

            <Dialog open={open}>
                <DialogTitle> Modifier la compagnie {comp.name} </DialogTitle>
                <DialogContent>
                    <EditCompany company={comp} close={handleClose} getAllCompanies={getAllCompanies} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()}>Annuler</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd}>
                <DialogTitle>Ajouter une compagnie</DialogTitle>
                <DialogContent>
                    <AddCompany closeAddCompany={closeAddCompany} getAllCompanies={getAllCompanies} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => closeAddCompany()}>Annuler</Button>
                </DialogActions>
            </Dialog>



        </>
    )
}

export default AllCompanies;