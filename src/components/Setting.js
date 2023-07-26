import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import UpdatePic from './UpdatePic'

function Setting() {
    const [showSpinner, setShowSpinner] = useState(false)
    const [showSpinnerPassword, setShowSpinnerPassword] = useState(false)
    const {user,setUser,setTitle, showToast} = useContext(UserContext)
    // const [message, setMessage] = useState('')
    
    const [name, setName] = useState('')
    const [adress, setAdress] = useState('')
    const [about, setAbout] = useState('')
    const [site, setSite] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const apiUrl = process.env.REACT_APP_API_URL

  useEffect(()=>{
    setTitle('Préférences')
    setName(user.name)
    setEmail(user.email)
    setAbout(user.about)
    setAdress(user.adress)
    setSite(user.website)
    setRole(user.role)
  },[user,setTitle])

  


  const handleSubmit = async(e)=>{
    e.preventDefault()
    setShowSpinner(true)

    await axios.post(apiUrl+'/api/user/',{
      name: name,
      email: email,
      about: about,
      adress: adress,
      website: site,
      role: role
    },{
      headers:{
        token: localStorage.token
      }
    })
    .then((response)=>{
      setUser(response.data.user)
      showToast("Données modifiées")
      setShowSpinner(false)
    })
    .catch((err)=>{
      setShowSpinner(false)
      console.log(err)
    })
  }

  const handleSubmitPassword = async(e)=>{
    e.preventDefault()
    setShowSpinnerPassword(true)

    await axios.post(apiUrl+'/api/user/',{
      oldPassword: oldPassword,
      password:password,
      passwordRepeat: repeatPassword
    },{
      headers:{
        token: localStorage.token
      }
    })
    .then((response)=>{
      setUser(response.data.user)
      showToast("Mot de passe modifiée")
      setShowSpinnerPassword(false)
      setOldPassword('')
      setPassword('')
      setRepeatPassword('')
    })
    .catch((err)=>{
      setShowSpinnerPassword(false)
      setOldPassword('')
      setPassword('')
      setRepeatPassword('')
      showToast(err.response.data)
    })
  }


  return (
    <div className='pt-5 mb-5'>
        <div className='bg-white p-4 rounded shadow border '>
            
            <div className='d-flex justify-content-between align-items-center flex-wrap gap-3'>
                <div className='d-flex gap-2 align-items-center'>
                  <div className='position-relative'>
                    <img className='pic-preference' alt='' src={(user.profilePic)?apiUrl+'/'+user?.profilePic:'https://img.freepik.com/photos-gratuite/rendu-3d-avatar-appel-zoom_23-2149556777.jpg?w=1060&t=st=1689109607~exp=1689110207~hmac=3f3eb5b6d171209bdbb0dc2301941f3bc28a6658660e9e459b465bf1edad1ae0'}></img>
                      <button className='overlay d-flex justify-content-center align-items-center' data-bs-toggle="modal" data-bs-target="#updatePic">
                      <i className="bi bi-pencil" style={{color: 'white'}}></i>
                    </button>
                  </div>
                    
                  <div>
                      <h6 className='fw-bold m-0'>Photo de profil</h6>
                      <p className='text-muted m-0' style={{fontSize: '13px'}}>Taille idéale : 400px x 400px</p>
                  </div>
                </div>
                <button type="button" className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#updatePic">Changer la photo</button>
            </div>
            <hr></hr>
            <h6 className='fw-bold'>Mes données personnelles</h6>
            <form className='py-4' onSubmit={(e)=>handleSubmit(e)}>
                <div className='row'>
                  <div className="mb-3 col-12 col-md-6 col-lg-6">
                      <label htmlFor="name" className="form-label">Nom complet*</label>
                      <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                  </div>
                  <div className="mb-3 col-12 col-md-6 col-lg-6">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
                      <input type="email" className="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>setEmail(e.target.value)} disabled required/>
                  </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Biographie*</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={about} onChange={(e)=>setAbout(e.target.value)} required></textarea>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="adress" className="form-label">Adresse*</label>
                    <input type="text" className="form-control" id="adress" name='adress' value={adress} onChange={(e)=>setAdress(e.target.value)} required/>
                </div>
                <div className='row'>
                    <div className="mb-3 col-12 col-lg-6 col-md-6">
                        <label htmlFor="site" className="form-label">Site web*</label>
                        <input type="text" className="form-control" id="site" name='site' value={site} onChange={(e)=>setSite(e.target.value)} required/>
                    </div>
                    
                    <div className="mb-3 col-12 col-lg-6 col-md-6">
                        <label htmlFor="role" className="form-label">Role*</label>
                        <input type="text" className="form-control" id="role" name='role' value={role} onChange={(e)=>setRole(e.target.value)} required/>
                    </div>
                </div>
                
                
                
                <div className="col-12 d-flex align-items-center gap-2">
                    <button className="btn btn-primary btn-sm" type="submit">Valider</button>
                    {
                  (showSpinner)?
                  <div className=''>
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
                  :null
                }
                </div>
                
                
            </form>
              
            <hr></hr>

            <h6 className='fw-bold mb-4'>Modifier mon mot de passe</h6>
            <form onSubmit={handleSubmitPassword}>
                <div className='mb-3 col-12'>
                    <label htmlFor="inputPassword5" className="form-label">Ancien mot de passe*</label>
                    <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} required/>
                </div>
                <div className='row'>
                    <div className='mb-3 col-12 col-md-6 col-lg-6'>
                        <label htmlFor="inputPassword5" className="form-label">Nouveau mot de passe*</label>
                        <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <div className='mb-3 col-12 col-md-6 col-lg-6'>
                        <label htmlFor="inputPassword5" className="form-label">Repetez le nouveau mot de passe*</label>
                        <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} required/>
                    </div>
                </div>

                <div className="col-12 d-flex align-items-center gap-2">
                    <button className="btn btn-primary btn-sm" type="submit">Valider</button>
                    {
                  (showSpinnerPassword)?
                  <div className=''>
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
                  :null
                }
                </div>
            </form>
        </div>
        <UpdatePic/>
    </div>
  )
}

export default Setting