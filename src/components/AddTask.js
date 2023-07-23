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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <form onSubmit={handleSubmit}>
                    <div class="modal-body">
                        {
                            (message)?
                            <div class="alert alert-danger" role="alert">
                                {message}
                            </div>
                            :null
                        }
                        <div class="mb-3">
                            <label class="form-label">Titre</label>
                            <input type="text" class="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div class="mb-3">
                            <label  class="form-label">Description</label>
                            <textarea class="form-control" rows="3" value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="flexCheckDefault" checked={critical} onChange={()=>setCritical(!critical)}/>
                            <label class="form-check-label" for="flexCheckDefault">
                                Tâche urgente
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='dismiss'>Abandonner</button>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddTask