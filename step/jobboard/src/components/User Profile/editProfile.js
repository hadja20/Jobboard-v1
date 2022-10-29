
import React, { useState } from "react";
import AuthUser from "../../components/AuthUser";
import "./userProfile.css";
import Swal from 'sweetalert2';

function EditProfile(props) {
   

    const { user, http } = AuthUser()
    const [firstName, setFirstName] = useState(props.currentUser.firstName)
    const [lastName, setLastName] = useState(props.currentUser.lastName)
    const [email, setEmail] = useState(props.currentUser.email)
    const [phone, setPhone] = useState(props.currentUser.phone)
    const [bio, setBio] = useState(props.currentUser.bio)
    const [cv,] = useState(props.currentUser.cv)
    const [cover_letter,] = useState(props.currentUser.cover_letter)

 

    



    const editProfile = async () => {

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("bio", bio);
        formData.append("cv", cv);
        formData.append("cover_letter", cover_letter);

       
        await http.post('/auth/jobseekers/' + user.id,
            formData
        ).then(response => {
            Swal.fire({
                icon: "success",
                text: "Votre profil à bien été mis à jour",
                confirmButtonColor: "#2c74d3"
            })
            props.setCurrentUser(response.data.user)
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
        props.getCurrentUser()

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

                <div className="mb-4">
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="numéro de téléphone" onChange={(e) => setPhone(e.target.value)} value={phone} name="phone"></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="bio" className="form-label">Bio (Optionnel) </label>
                    <p className="bio"> Décrivez-vous en quelques mots.</p>
                    <textarea className="form-control" aria-label="message" name="bio" id="bio" onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
                </div>
               
                <div>
                    <button className="btn btn-primary" type="button" onClick={(e) => { editProfile() }}>Modifier profil</button>
                </div>
            </form>

        </>
    )
}

export default EditProfile;
