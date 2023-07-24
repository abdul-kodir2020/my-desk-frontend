import axios from 'axios'
import React, { useState } from 'react'

function AddTask(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [critical, setCritical] = useState(false)
    const [message, setMessage] = useState('')
    const apiUrl = process.env.REACT_APP_API_URL

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await axios.post(apiUrl+'/api/task',{
            name: name,
            description: description,
            critical: critical,
            projectId: props?.projectId
        },{
            headers:{
                token: localStorage.token
            }
        })
        .then(()=>{
            props.setTasksChecked([])
            setName('')
            setDescription('')
            setCritical(false)

            const dismiss = document.querySelector('#dismiss');
            dismiss.click ();
        
        })
        .catch((err)=>{
            console.log(err)
            setMessage(err.response.data)
        })
    }

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {
                            (message)?
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                            :null
                        }
                        <div className="mb-3">
                            <label className="form-label">Titre</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Description</label>
                            <textarea className="form-control" rows="3" value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={critical} onChange={()=>setCritical(!critical)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Tâche urgente
                            </label>
                        </div>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='dismiss'>Abandonner</button>
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddTask