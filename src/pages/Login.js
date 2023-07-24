import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [showSpinner, setShowSpinner] = useState(false)

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setShowSpinner(true)


        await axios.post(apiUrl+'/api/user/login',{
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
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        :null
                    }
                    
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className=''>
                        <label htmlFor="inputPassword5" className="form-label">Mot de passe</label>
                        <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
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
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden text-center">Loading...</span>
                            </div>
                        </div>
                        :null
                    }
                    <div className="col-12 d-flex justify-content-center">
                        <button className="btn btn-dark" type="submit">Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login