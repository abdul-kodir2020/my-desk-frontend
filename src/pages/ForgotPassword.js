import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate = useNavigate()
    const [showSpinner, setShowSpinner] = useState(false)
    const [showDiv, setShowDiv] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setShowSpinner(true)
        
        await axios.post('http://localhost:5000/api/user/password-forgot',{
            email: email,
            code: code,
            password: password,
            passwordRepeat: repeatPassword,
          
        }).then(response=>{
            setMessage(response.data.message)
            console.log(response)
            document.querySelector('.email').disabled = true
            setShowSpinner(false)
            setShowDiv(true)
            if (response.data.message === "Mot de passe modifié") {
                navigate('/login')
            }
            
            

        }).catch(err=>{
            console.log(err)
            setShowSpinner(false)
            setMessage(err.response.data.message)
        })
    }

  return (
    <div className='login'>
        <div className='login-image shadow'>
        <h1 className='logo m-3'>DESK<span className='text-danger'>.</span></h1>

        </div>
        <div className='login-section'>
            <div className='inlogin'>
                <form className='p-4' onSubmit={(e)=>handleSubmit(e)}>
                    <h2 className='text-center mb-5'>Mot de passe Oublié</h2>
                    {
                        (message)?
                        <div class="alert alert-danger" role="alert">
                            {message}
                        </div>
                        :null
                    }
                    
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email</label>
                        <input type="email" class="form-control email" id="exampleFormControlInput1" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>

                    {
                        (showDiv)?
                        <div>
                            <div class="mb-3 col-6">
                                <label for="code" class="form-label">Entrez le code</label>
                                <input type="text" class="form-control" id="code" name='code' value={code} onChange={(e)=>setCode(e.target.value)} />
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-6'>
                                    <label for="inputPassword5" class="form-label">Nouveau mot de passe</label>
                                    <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                                </div>
                                <div className='mb-3 col-6'>
                                    <label for="inputPassword5" class="form-label">Repetez le mot de passe</label>
                                    <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                        :null
                    }
                    
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
                        <button class="btn btn-dark" type="submit">Envoyer</button>
                    </div>
                    <div className='mb-3 mt-3'>
                        <p className='text-end'><Link className='text-danger' to={'/login'}>Connectez-vous.</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword