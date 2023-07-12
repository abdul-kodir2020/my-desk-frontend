import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [showSpinner, setShowSpinner] = useState(false)

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setShowSpinner(true)


        await axios.post('http://localhost:5000/api/user/login',{
            email: email,
            password: password
        }).then(response=>{
            console.log(response)
            localStorage.setItem('token',response.data.token)
            navigate("/dashboard")
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
                    <h2 className='text-center mb-5'>Connexion</h2>
                    {
                        (message)?
                        <div class="alert alert-danger" role="alert">
                            {message}
                        </div>
                        :null
                    }
                    
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className=''>
                        <label for="inputPassword5" class="form-label">Mot de passe</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <div className='mb-3'>
                        <p className='text-center'><Link className='text-dark' to={'/forgot-password'}>Mot de passe oublié ?</Link></p>
                    </div>
                    <div className='mb-3 mt-3'>
                        <p className='text-center'>Vous n'avez pas de compte ? <Link className='text-danger' to={'/register'}>Inscrivez-vous.</Link></p>
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
                        <button class="btn btn-dark" type="submit">Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login