
import React, { useState } from "react";
import AuthUser from "../AuthUser";
import "./userProfile.css";
import Swal from 'sweetalert2';


function EditAdmin(props) {




    const { user, http } = AuthUser()
    const [firstName, setFirstName] = useState(props.currentUser.firstName)
    const [lastName, setLastName] = useState(props.currentUser.lastName)
    const [email, setEmail] = useState(props.currentUser.email)



    const editProfile = async () => {

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);

        await http.put('/auth/admins/' + user.id,
            formData
        ).then(response => {
            Swal.fire({
                icon: "success",
                text: "Votre profil à bien été mis à jour",
                confirmButtonColor: "#2c74d3"
            })
            props.setCurrentUser(response.data.user)  
            props.getCurrentUser();          
            props.handleClose()
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request)

            } else if (error.message) {

                console.log(error.message)
            }
            props.handleClose()
        })

    }



    return (
        <>
            <form dialog="true">
                <div className="mb-4">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input type="text" className="form-control" placeholder="votre prénom" aria-label="First name" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} required></input>
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input type="text" className="form-control" placeholder="votre nom" aria-label="Last name" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} required></input>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="entrez votre email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                </div>
                <div>
                    <button className="btn btn-primary" type="button" onClick={(e) => { editProfile() }}>Modifier profil</button>
                </div>
            </form>

        </>
    )
}

export default EditAdmin;
