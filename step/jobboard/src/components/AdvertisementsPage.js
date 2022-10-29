import React, { useState, useEffect, useLayoutEffect } from 'react';
import './advertisement.css';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Apply from './Apply';
import AuthUser from './AuthUser';
import { useNavigate } from 'react-router-dom';



const apiURL = 'http://localhost:8000/api'

function Advertisements() {

  const navigate=useNavigate()
  const [jobs, setJobs] = useState([])
  const [open, setOpen] = useState(false)
  const [ad, setAd] = useState({})
  const { user, isAdmin, isRecruiter, http, setToken} = AuthUser();
  //const [disabled, setDisable]=useState(false)

  const refreshPage = () => {
    window.location.reload();
  }

  const hideApplyBtn = isAdmin() || isRecruiter()

  const handleClickOpen = (ad) => {
    setOpen(true)
    setAd(ad)
  }

  const handleClose = () => {

    setOpen(false)

  }


  const getAdvertisements = async () => {
    await axios.get(apiURL + `/advertisements/`)
      .then(res => {
        const jobs = res.data;
        setJobs(jobs)
      })
  }

  useEffect(() => {
    getAdvertisements();
  }, [])


  const learnMore = (id) => {
    let div = document.getElementsByClassName('more')[id]
    let btn = document.getElementsByClassName('btn learn')[id]

    if (div.hidden) {

      div.hidden = false
      btn.innerHTML = 'Voir moins'

    }
    else {

      div.hidden = true
      btn.innerHTML = "Voir plus"
    }

  }

  return (
    <div>
      <div className='advertisements'>
        <form className="d-flex search-bar" role="search">
          <div>
            <div className="input-group mb-3">
              <label className="input-group-text" >Quoi ?</label>
              <input className="form-control form-control-lg" type="search" placeholder="Métiers,mots-clés ou entreprise" aria-label="Search"></input>
            </div>
            <div className="input-group mb-3">
              <label className="input-group-text" >Où ?</label>
              <input className="form-control form-control-lg" type="search" placeholder="Ville ou code postal" aria-label="Search"></input>
            </div>
          </div>
          <button className="btn search mb-3" type="submit" >Rechercher</button>
        </form>
        <h1> Offres d'emploi disponibles</h1>

        {jobs.map((ad => {
          return <div className="card" key={ad.advertisement_id} >
            <div className="card-body">

              <div className='advertisement'>
                <div className='flex-container'>
                  <img src={`http://localhost:8000/storage/images/companiesLogo/${ad.logo}`} className="company_logo" alt='logo'></img>
                  <h1> {ad.title}</h1>
                </div>
                <h4> DESCRIPTION DU POSTE</h4>
                <p> {ad.description}</p>
              </div>
              <div className='more' key={ad.id} hidden >
                <h4> Type de contrat</h4>
                <p> {ad.contract}</p>
                <h4>Lieu du poste</h4>
                <p>({ad.postcode}) {ad.city}</p>
                <h4> Salaire</h4>
                <p>{ad.salary}€</p>
                <h4> Nombre de postes à pourvoir</h4>
                <p> {ad.places} </p>
              </div>
              <button type="button" className="btn learn" onClick={(e) => { learnMore(jobs.indexOf(ad)) }}>Voir plus</button>
              <button type="button" className="btn learn1" onClick={(e) => handleClickOpen(ad)} hidden={hideApplyBtn} >Postuler</button>
            </div>
          </div>
        }
        )
        )}
        <Dialog open={open}>
          <DialogTitle>Postuler à cette offre: {ad.title} </DialogTitle>

          <DialogContent>
            <Apply closeDialog={handleClose} btn={document.getElementById('btn-apply')} user={user} subject={ad.title} advertisement={ad} http={http} refresh={refreshPage} setToken={setToken} navigate={navigate}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => handleClose()}>Annuler</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )



}

export default Advertisements

