import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const [showSpinner, setShowSpinner] = useState(false)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [adress, setAdress] = useState('')
    const [about, setAbout] = useState('')
    const [site, setSite] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL

    const handleChange = (e)=>{
        e.preventDefault()
        setImage(e.target.files[0])
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setShowSpinner(true)
        
        await axios.post(apiUrl+'/api/user/register',{
            name: name,
            email: email,
            password: password,
            passwordRepeat: repeatPassword,
            about: about,
            adress: adress,
            website: site,
            role: role,
            image: image
        },{
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(response=>{
            console.log(response)
            navigate("/login")
        }).catch(err=>{
            console.log(err)
            setShowSpinner(false)
            setMessage(err.response.data)
        })
    }

    useEffect(()=>{
        if(localStorage.token) navigate('/dashboard')
    })
  return (
    <div className='login'>
        <div className='login-image shadow'>
            <h1 className='logo m-3'>DESK<span className='text-danger'>.</span></h1>
        </div>
        <div className='login-section'>
            <div className='inlogin'>
                <form className='p-4' onSubmit={(e)=>handleSubmit(e)}>
                    <h2 className='text-center mb-5'>Créer un compte</h2>
                    {
                        (message)?
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        :null
                    }
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom complet*</label>
                        <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className='row'>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Mot de passe*</label>
                            <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div className='mb-3 col-12 col-md-6 col-lg-6'>
                            <label htmlFor="inputPassword5" className="form-label">Repetez le mot de passe*</label>
                            <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} required/>
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
                        <div className="mb-3 col-6">
                            <label htmlFor="site" className="form-label">Site web*</label>
                            <input type="text" className="form-control" id="site" name='site' value={site} onChange={(e)=>setSite(e.target.value)} required/>
                        </div>
                        
                        <div className="mb-3 col-6">
                            <label htmlFor="role" className="form-label">Role*</label>
                            <input type="text" className="form-control" id="role" name='role' value={role} onChange={(e)=>setRole(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFileDisabled" className="form-label">Photo de profil</label>
                        <input className="form-control" type="file" accept="image/*" onChange={handleChange} />
                    </div>
                    
                    <div className='mb-3 mt-3'>
                        <p className='text-center'>Déjà inscrit ? <Link className='text-danger' to={'/login'}>Connectez-vous.</Link></p>
                    </div>
                    {
                        (showSpinner)?
                        <div className='d-flex justify-content-center mb-3'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden text-center">Loading...</span>
                            </div>
                        </div>
                        :null
                    }
                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-dark" type="submit">S'inscrire</button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register