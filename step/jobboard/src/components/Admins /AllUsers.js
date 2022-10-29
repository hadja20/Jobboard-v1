
import React, { useState, useEffect } from "react";

import AuthUser from "../AuthUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import AllRecruiters from "./AllRecruiters";
import AllAdmins from "./AllAdmins";
import AllJobseekers from "./AllJobseekers";
function AllUsers() {

    const { http } = AuthUser();
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([])



    const role = (name) => {
        if (name === "jobseeker") {
            return "recherche emploi"
        } else if (name === "admin") {
            return "admin";
        } else {
            return "recruteur";
        }
    }

    const getAllUsers = async () => {
        await http.get(`auth/people/`)
            .then(res => {
                const users = res.data
                setUsers(users)
            })
    }

    useEffect(() => {
        getAllUsers();
    }, [])


    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)

    }
    return (
        <>
            <div className="table">
                <table className=" table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return <tr key={user.person_id}>
                                <th scope="row">{user.person_id}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td> {role(user.name)}</td>
                                <td> <button className="btn edit-user"  ><FontAwesomeIcon icon={faEdit} /></button>
                                    <button className="btn delete-user"><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>

                <AllRecruiters />
                <AllAdmins />
                <AllJobseekers />
            </div>
        </>
    )
}

export default AllUsers;