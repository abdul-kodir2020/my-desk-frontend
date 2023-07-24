import axios from 'axios'
import React, { useContext, useState } from 'react'
import ProjectsContext from '../contexts/ProjectsContext'

function AddProject() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [message,setMessage] = useState('')
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [type, setType] = useState('Application web')
    const {projects,setProjects} = useContext(ProjectsContext)
    const apiUrl = process.env.REACT_APP_API_URL

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await axios.post(apiUrl+'/api/project',{
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
            setProjects([response.data.projectCreated, ...projects])

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
            <div className="alert alert-success mb-4" role="alert">
                <span className='fw-bold'>Succes !</span> Projet ajouté avec succès
            </div>
            :null
        }

        {
            (error)?
            <div className="alert alert-danger mb-4" role="alert">
                <span className='fw-bold'>Oups !</span> {message}
            </div>
            :null
        }

            <div className="row ">
                <div className="col-12 col-lg-6 mb-4">
                    <label htmlFor="" className="form-label">Titre du projet</label>
                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="col-12 col-lg-6 mb-4">
                    <label htmlFor="" className="form-label">Type du projet</label>
                    <select className="form-select" aria-label="Default select example" value={type} onChange={(e)=>setType(e.target.value)}>
                        <option value="Application web">Application web</option>
                        <option value="Application mobile">Application mobile</option>
                        <option value="Design Making">Design Making</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
            </div>
            <button type='submit' className='btn btn-primary'>Ajouter</button>
        </form>
    </div>
  )
}

export default AddProject