
import React, { useState, useEffect } from "react";
import "./admin.css";
import AuthUser from "../../components/AuthUser";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import EditAdmin from "./editAdmin";
import AllUsers from "../Admins /AllUsers";
import AllCompanies from "../Admins /AllCompanies";
import AllPost from "../Admins /MyPosts";
import Messages from "../Admins /Messages";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faEnvelope, faUsers, faPager, faUser } from '@fortawesome/free-solid-svg-icons'

function AdminProfile() {

    const { user, http } = AuthUser();
    const [open, setOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const [companies, setCompanies] = useState([])

    const [hideCompanies, setHideCompanies] = useState(true)
    const [hideUsers, setHideUsers] = useState(true)
    const [hidePosts, setHidePost] = useState(true)
    const [hideMessage, setHideMessage] = useState(true)
    const [hideProfile, setHideProfile] = useState(false)



    const getCurrentUser = async () => {
        await http.get('/auth/admins/' + user.id)
            .then(res => {
                const currentUser = res.data;
                setCurrentUser(currentUser)
            })
    }

    useEffect(() => {
        getCurrentUser();
    }, [])


    const hideProfil = () => {
        setHideUsers(true)
        setHideProfile(false)
        setHidePost(true)
        setHideCompanies(true)
        setHideMessage(true)
    }


    const hideCompany = () => {
        setHideUsers(true)
        setHideProfile(true)
        setHideCompanies(false)
        setHidePost(true)
        setHideMessage(true)
    }

    const hideUser = () => {
        setHideUsers(false)
        setHideProfile(true)
        setHideCompanies(true)
        setHidePost(true)
        setHideMessage(true)

    }

    const hidePost = () => {
        setHideUsers(true)
        setHideProfile(true)
        setHideCompanies(true)
        setHidePost(false)
        setHideMessage(true)
    }

    const hideMsg = () => {
        setHideUsers(true)
        setHideProfile(true)
        setHideCompanies(true)
        setHidePost(true)
        setHideMessage(false)

    }
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
                                <a onClick={e => hideMsg()} className="nav_link"> <FontAwesomeIcon icon={faEnvelope} /><span className="nav_name">Boite de reception</span> </a>
                                <a onClick={e => hidePost()} className="nav_link" ><FontAwesomeIcon icon={faPager} /> <span className="nav_name">Mes posts</span> </a>
                                <a onClick={e => hideUser()} className="nav_link"> <FontAwesomeIcon icon={faUsers} /> <span className="nav_name">Utilisateurs</span> </a>
                                <a onClick={e => hideCompany()} className="nav_link"><FontAwesomeIcon icon={faBuilding} /> <span className="nav_name">Compagnies</span> </a>
                              </div>
                        </div>
                    </nav>
                </div>
                <div className="profile-content" id="content">
                    <div className="text-center mt-3" hidden={hideProfile}>
                        <span className="bg-secondary p-1 px-4 rounded text-white">ADMIN</span>
                        <h5 className="mt-2 mb-0"> {currentUser.firstName} {currentUser.lastName} </h5>
                        <span>{currentUser.email}</span>
                        <div className="px-4 mt-1">
                        </div>
                        <div className="buttons">
                            <button className="btn btn-outline-primary px-4" onClick={(e) => { handleClickOpen() }} >Modifier mon profil</button>
                        </div>
                    </div>
                    <div id='companies' hidden={hideCompanies}>
                        <div className="title-section"><h3> Les compagnies</h3></div>

                        <AllCompanies />
                    </div>
                    <div id='users' hidden={hideUsers}>

                        <div className="title-section"><h3> Les Utilisateurs</h3></div>

                        <AllUsers />
                    </div>

                    <div id='posts' hidden={hidePosts}>

                        <div className="title-section"><h3> Offres d'emplois publiées</h3></div>
                        <AllPost />
                    </div>


                    <div id='messages' hidden={hideMessage}>
                        <div className="title-section"><h3> Boîte de réception</h3></div>
                        <Messages />

                    </div>




                </div>

                <Dialog open={open}>
                    <DialogTitle> Modifier votre profil</DialogTitle>
                    <DialogContent>
                        <EditAdmin currentUser={currentUser} handleClose={handleClose} setCurrentUser={setCurrentUser} getCurrentUser={getCurrentUser} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => handleClose()}>Annuler</Button>
                    </DialogActions>
                </Dialog>

            </div>

        </>
    )
}

export default AdminProfile;