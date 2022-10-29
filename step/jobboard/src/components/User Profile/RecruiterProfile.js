
import React, { useState, useEffect } from "react";
import "./admin.css";
import AuthUser from "../../components/AuthUser";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import PostRecruiter from "../Recruiters/PostRecruiters";
import EditRecruiter from "./editRecruiter";
import MessagesRecruiter from "../Recruiters/MessageRecruiter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPager, faUser } from '@fortawesome/free-solid-svg-icons'

function RecruiterProfile() {

    const { user, http } = AuthUser();
    const [open, setOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [hidePosts, setHidePost] = useState(true)
    const [hideMessage, setHideMessage] = useState(true)
    const [hideProfile, setHideProfile] = useState(false)



    const getCurrentUser = async () => {
        await http.get('/auth/recruiters/' + user.id)
            .then(res => {
                const currentUser = res.data;
                console.log(currentUser.person_id)
                setCurrentUser(currentUser)
            })
    }

    useEffect(() => {
        getCurrentUser();
    }, [])


    const hideProfil = () => {
        setHideProfile(false)
        setHidePost(true)
        setHideMessage(true)
    }


    const hideCompany = () => {
        setHideProfile(true)
        setHidePost(true)
        setHideMessage(true)
    }

    const hideUser = () => {
        setHideProfile(true)
        setHidePost(true)
        setHideMessage(true)

    }

    const hidePost = () => {
        setHideProfile(true)
        setHidePost(false)
        setHideMessage(true)
    }

    const hideMsg = () => {
        setHideProfile(true)
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
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="profile-content" id="content">
                    <div className="text-center mt-3" hidden={hideProfile}>
                        <span className="bg-secondary p-1 px-4 rounded text-white">RECRUTEUR</span>
                        <h5 className="mt-2 mb-0"> {currentUser.firstName} {currentUser.lastName} </h5>
                        <span>{currentUser.email}</span>
                        <div className="px-4 mt-1">
                        </div>
                        <div className="buttons">
                            <button className="btn btn-outline-primary px-4" onClick={(e) => { handleClickOpen() }} >Modifier mon profil</button>
                        </div>
                    </div>


                    <div id='posts' hidden={hidePosts}>

                        <div className="title-section"><h3> Offres d'emplois publiées</h3></div>
                        <PostRecruiter />
                    </div>


                    <div id='messages' hidden={hideMessage}>
                        <div className="title-section"><h3> Boîte de réception</h3></div>
                        <MessagesRecruiter />
                    </div>




                </div>

                <Dialog open={open}>
                    <DialogTitle> Modifier votre profil</DialogTitle>
                    <DialogContent>
                        <EditRecruiter currentUser={currentUser} handleClose={handleClose} setCurrentUser={setCurrentUser} getCurrentUser={getCurrentUser} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => handleClose()}>Annuler</Button>
                    </DialogActions>
                </Dialog>

            </div>

        </>
    )
}

export default RecruiterProfile;