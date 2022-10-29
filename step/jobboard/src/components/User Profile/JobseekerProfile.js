
import React, { useState, useEffect, useLayoutEffect } from "react";
import "./userProfile.css";
import AuthUser from "../../components/AuthUser";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import EditProfile from "./editProfile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faEnvelope, faUsers, faPager, faUser } from '@fortawesome/free-solid-svg-icons'
import ApplicationsJobseeker from "../Jobseekers.js/Applications";
import MessagesJobseeker from "../Jobseekers.js/MessageJobseeker";
function JobseekerProfile() {

    const { user, http, token } = AuthUser();
    const [open, setOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [hideApplications, setHideApplication] = useState(true)
    const [hideMessage, setHideMessage] = useState(true)
    const [hideProfile, setHideProfile] = useState(false)


    const hideProfil = () => {
        setHideProfile(false)
        setHideApplication(true)
        setHideMessage(true)
    }



    const hideApplication = () => {

        setHideProfile(true)
        setHideApplication(false)
        setHideMessage(true)
    }

    const hideMsg = () => {
        setHideProfile(true)
        setHideApplication(true)
        setHideMessage(false)
    }
    
    const getCurrentUser = async () => {

        await http.get('/auth/jobseekers/' + user.id)
            .then(res => {
                const currentUser = res.data;
             
                setCurrentUser(currentUser)
            })
    }
    useEffect(() => {
        getCurrentUser();
    }, [])



    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {

        setOpen(false)

    }
    return (
        <>
            <div id="admin-profile">
                <div className="sidebar-profile" id="sidebar">
                    <nav className="nav">
                        <div>
                            <div className="nav_list">
                                <a onClick={e => hideProfil()} className="nav_link"> <FontAwesomeIcon icon={faUser} /><span className="nav_name">Mon profil</span> </a>
                                <a onClick={e => hideMsg()} className="nav_link"> <FontAwesomeIcon icon={faEnvelope} /><span className="nav_name">Boite d'envoi</span> </a>
                                <a onClick={e => hideApplication()} className="nav_link" ><FontAwesomeIcon icon={faPager} /> <span className="nav_name">Mes candidatures</span> </a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="profile-content" id="content">
                    <div className="text-center mt-3" >
                        <span className="bg-secondary p-1 px-4 rounded text-white">RECHERCHEUR EMPLOI</span>
                        <h5 className="mt-2 mb-0"> {currentUser.firstName}   {currentUser.lastName} </h5>
                        <span>{currentUser.email}</span>
                        <div className="px-4 mt-1">
                            <p>{currentUser.bio}</p>
                            <p>Téléphone: {currentUser.phone}</p>
                        </div>
                        <div className="buttons">
                            <button className="btn btn-outline-primary px-4" onClick={(e) => { handleClickOpen() }} >Modifier mon profil</button>
                        </div>
                    </div>

                    <div hidden={hideApplications} >

                        <ApplicationsJobseeker />

                    </div>

                    <div hidden={hideMessage}>
                        <MessagesJobseeker />
                    </div>




                </div>

                <Dialog open={open}>
                    <DialogTitle> Modifier votre profil</DialogTitle>
                    <DialogContent>
                        <EditProfile currentUser={currentUser} handleClose={handleClose} setCurrentUser={setCurrentUser} getCurrentUser={getCurrentUser} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => handleClose()}>Annuler</Button>
                    </DialogActions>
                </Dialog>

            </div>

        </>

    )
}

export default JobseekerProfile;
