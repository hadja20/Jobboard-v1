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
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import EditPost from "./EditPost";


function Messages() {



    const { token, http, user } = AuthUser();
    const [open, setOpen] = useState(false)
    const [mails, setMails] = useState([])
    const [p, setP] = useState({})


    const [openAdd, setOpenAdd] = useState(false)

    const getAllMails = async () => {
        await http.get(`/auth/admins/${7}/mails/`)
            .then(res => {
                const mails = res.data
                setMails(mails)
            })

    }

    useEffect(() => {
        getAllMails();
    }, [])



    return (
        <>
            <div className="list-group">
                {mails.map(mail => {
                    return     <a href="#" className="list-group-item list-group-item-action " aria-current="true" key={mail.mail_id}>
                        <div className="d-flex w-100 justify-content-between">
                            <p className="mb-1">from: {mail.from}</p>
                          
                        </div>
                        <p className="mb-1">to: {user.email}</p>
                        <small>{mail.body}</small>
                    </a>
                 


                 })}

            </div>

        </>
    )
}

export default Messages;