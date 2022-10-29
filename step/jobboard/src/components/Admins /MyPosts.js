import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import AddPost from "./AddPost";
import Swal from 'sweetalert2';
import AuthUser from "../AuthUser";
import { useRadioGroup } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash} from '@fortawesome/free-solid-svg-icons'
import EditPost from "./EditPost";


function AllPost() {



    const { token, http, user } = AuthUser();
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState([])
    const [p, setP] = useState({})


    const [openAdd, setOpenAdd] = useState(false)

    const getAllPosts = async () => {
       
        await http.get(`/auth/admins/advertisements/${user.person_id}`)
            .then(res => {
                const posts = res.data
                setPosts(posts)
            })

    }


    const handleClickOpen=(post)=>{
        setOpen(true)
        setP(post)

    }

    const openAddPost = () => {
        setOpenAdd(true)
    }

    const closeAddPost = () => {
        setOpenAdd(false)


    }

    useEffect(() => {
        getAllPosts();
    }, [])

    const handleClose = () => {
        setOpen(false)

    }

    const deletePost = async (post) => {
        const isConfirm = await Swal.fire({
            title: `Êtes-vous sûre de vouloir supprimer l'offre d"emploi ${post.title}?`,
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

        await http.delete('/auth/advertisements/' + post.id,).then(res => {
            Swal.fire({
                icon: "success",
                text: "L'offre d'emploi a bien été supprimée",
                confirmButtonColor: "#2c74d3"
            })
        }).catch(error => {
            Swal.fire({
                icon: "error",
                text: "Une erreur est survenue. Veuillez réessayez ultérieurement.",
                confirmButtonColor: "#2c74d3"
            })
        });

        getAllPosts()

    }
    return (
        <>

            <button className="btn btn-outline-primary px-4" onClick={e => { openAddPost() }}>Ajouter une offre d'emploi</button>

            {posts.map(post => {
                return <div className="myposts" key={post.id} >
                    <div className="card mb-3 posts">
                        <div className="card-body">

                            <h1> {post.title}</h1>

                            <h4> DESCRIPTION DU POSTE</h4>
                            <p> {post.description}</p>
                            <h4> Type de contrat</h4>
                            <p> {post.contract}</p>
                            <h4>Lieu du poste</h4>
                            <p>({post.postcode}) {post.city}</p>
                            <h4> Salaire</h4>
                            <p>{post.salary}€</p>
                            <h4> Nombre de postes à pourvoir</h4>
                            <p> {post.places} </p>

                            <button className="btn btn-primary posts" onClick={e => handleClickOpen(post)} ><FontAwesomeIcon icon={faEdit} /></button>
                            <button className="btn btn-primary posts" onClick={e => deletePost(post)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>

            })}

            <Dialog open={open}>
                <DialogTitle> Modifier l'offre d'emploi {p.title} </DialogTitle>
                <DialogContent>
                    <EditPost post={p}  getAllPosts={getAllPosts} close={handleClose}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleClose()}>Annuler</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd}>
                <DialogTitle>Ajouter une offre d'emploi</DialogTitle>
                <DialogContent>
                    <AddPost closeAddPost={closeAddPost} getAllPosts={getAllPosts} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => closeAddPost()}>Annuler</Button>
                </DialogActions>
            </Dialog>



        </>
    )
}

export default AllPost;