import axios from 'axios'
import React, { useState } from 'react'

function AddProject() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message,setMessage] = useState('')
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [type, setType] = useState('Application web')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await axios.post('http://localhost:5000/api/project',{
            type: type,
            description: description,
            name: name
        },{
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setDescription('')
            setName('')
            setType('Application web')
            setSuccess(true)
            setError(false)

        })
        .catch((err)=>{
            setMessage(err.response.data)
            setError(true)
            setSuccess(false)
        })
    }

  return (
    <div className='projets pt-5'>
        <h4 className='fw-bold'>Ajouter un projet</h4>
        <form className='bg-white p-5 rounded shadow' onSubmit={handleSubmit}>

        {
            (success)?
            <div class="alert alert-success mb-4" role="alert">
                <span className='fw-bold'>Succes !</span> Projet ajouté avec succès
            </div>
            :null
        }

        {
            (error)?
            <div class="alert alert-danger mb-4" role="alert">
                <span className='fw-bold'>Oups !</span> {message}
            </div>
            :null
        }

            <div class="row mb-4">
                <div class="col">
                    <label for="" class="form-label">Titre du projet</label>
                    <input type="text" class="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div class="col">
                    <label for="" class="form-label">Type du projet</label>
                    <select class="form-select" aria-label="Default select example" value={type} onChange={(e)=>setType(e.target.value)}>
                        <option selected value="Application web">Application web</option>
                        <option value="Application mobile">Application mobile</option>
                        <option value="Design Making">Design Making</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
            </div>
            <div class="mb-4">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
            </div>
            <button type='submit' className='btn btn-primary'>Ajouter</button>
        </form>
    </div>
  )
}

export default AddProject