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

    const handleChange = (e)=>{
        e.preventDefault()
        setImage(e.target.files[0])
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setShowSpinner(true)
        
        await axios.post('http://localhost:5000/api/user/register',{
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
                        <div class="alert alert-danger" role="alert">
                            {message}
                        </div>
                        :null
                    }
                    <div class="mb-3">
                        <label for="name" class="form-label">Nom complet*</label>
                        <input type="text" class="form-control" id="name" name='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email*</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className='row'>
                        <div className='mb-3 col-6'>
                            <label for="inputPassword5" class="form-label">Mot de passe*</label>
                            <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div className='mb-3 col-6'>
                            <label for="inputPassword5" class="form-label">Repetez le mot de passe*</label>
                            <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} required/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Biographie*</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={about} onChange={(e)=>setAbout(e.target.value)} required></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="adress" class="form-label">Adresse*</label>
                        <input type="text" class="form-control" id="adress" name='adress' value={adress} onChange={(e)=>setAdress(e.target.value)} required/>
                    </div>
                    <div className='row'>
                        <div class="mb-3 col-6">
                            <label for="site" class="form-label">Site web*</label>
                            <input type="text" class="form-control" id="site" name='site' value={site} onChange={(e)=>setSite(e.target.value)} required/>
                        </div>
                        
                        <div class="mb-3 col-6">
                            <label for="role" class="form-label">Role*</label>
                            <input type="text" class="form-control" id="role" name='role' value={role} onChange={(e)=>setRole(e.target.value)} required/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="formFileDisabled" class="form-label">Photo de profil</label>
                        <input class="form-control" type="file" accept="image/*" onChange={handleChange} />
                    </div>
                    
                    <div className='mb-3 mt-3'>
                        <p className='text-center'>Déjà inscrit ? <Link className='text-danger' to={'/login'}>Connectez-vous.</Link></p>
                    </div>
                    {
                        (showSpinner)?
                        <div className='d-flex justify-content-center mb-3'>
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden text-center">Loading...</span>
                            </div>
                        </div>
                        :null
                    }
                    <div class="col-12 d-flex justify-content-center">
                        <button class="btn btn-dark" type="submit">S'inscrire</button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register