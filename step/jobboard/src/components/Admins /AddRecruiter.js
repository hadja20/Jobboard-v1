
import React, { useState ,useEffect} from "react";
import AuthUser from "../AuthUser";
import axios from 'axios';
import Form from 'react-bootstrap/Form';


import Swal from 'sweetalert2';


function AddRecruiter(props) {

    const { token, http } = AuthUser()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [company_id, setCompanyId] = useState("")
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [companies, setCompanies] = useState([])

    const getAllCompanies = async () => {
        await http.get(`/companies/`)
            .then(res => {
                const companies = res.data                
                setCompanies(companies)
            })

    }


    useEffect(() => {
        getAllCompanies();
    }, [])


    const addAdmin = async () => {

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", password_confirmation);
        formData.append("company_id", company_id)

        const http = axios.create({
            baseURL: "http://localhost:8000/api",
            headers: {
                "Authorization": `Bearer ` + token
            },
        });

        await http.post(`/auth/register/recruiter`, formData).then(response => {
            Swal.fire({
                icon: "success",
                text: "Inscription Validée",
                confirmButtonColor: "#2c74d3"
            },)
            props.getAllRecruiters()

        })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    text: "Une erreur est survenue",
                    confirmButtonColor: "#2c74d3"
                })
            });


            props.closeAddRecruiter()
    }



    return (
        <>
            <Form>
                <div className="mb-4">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input type="text" className="form-control" placeholder="Le prénom" aria-label="First name" name="firstName" onChange={(e) => setFirstName(e.target.value)} required></input>
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input type="text" className="form-control" placeholder="Le nom" aria-label="Last name" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} required></input>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Entrez l'email" name="email" onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="password" placeholder="Le mot de passe" name="password" onChange={(e) => setPassword(e.target.value)} required></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="form-label">Confirmez le mot de passe</label>
                    <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="confirmation de votre mot de passe" required></input>
                </div>
                <select className="form-select" aria-label="Default select" name="contract" onChange={(e) => setCompanyId(e.target.value)} >
                    <option > Compagnie</option>
                    {companies.map(company => {
                        return  <option value={company.id} key={company.id}>{company.name}</option>
                    })}
                </select>


                <div>
                    <button className="btn btn-primary" type="button" onClick={e => addAdmin()} >Ajouter recruteur</button>
                </div>
            </Form>

        </>
    )
}

export default AddRecruiter;
