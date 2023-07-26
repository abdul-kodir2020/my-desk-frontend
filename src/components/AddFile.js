import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function AddFile(props) {
    const location = useLocation()
    const projectId = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const [name, setName] = useState('')
    const [type, setType] = useState('image')
    const [file, setFile] = useState(null)
    const apiUrl = process.env.REACT_APP_API_URL
    const {showToast} = useContext(UserContext)


    const handleChange = (e)=>{
        setFile(e.target.files[0])
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await axios.post(apiUrl+'/api/file',{
            name: name,
            type: type,
            file: file,
            projectId: projectId
        },{
            headers:{
                "Content-Type": "multipart/form-data",
                token: localStorage.token
            }
        })
        .then((response)=>{
            console.log(response);
            setName('')
            setType('image')
            setFile(null)
            document.getElementById('inputFile').value = ''
            const dismiss = document.querySelector('#dismissFileModal');
            dismiss.click ();
            showToast('Fichier ajouté !')
            props.setFiles(previous => [...previous, response.data.fileSaved])
        })
        .catch((err)=>{
            // showToast(err.response.data)
            console.log(err);
        })
    }

  return (
    <div className="modal fade" id="modalAddFile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className="col-12 col-lg-6 mb-4">
                            <label htmlFor="" className="form-label">Type du fichier</label>
                            <select className="form-select" aria-label="Default select example" value={type} onChange={(e)=>{setType(e.target.value);document.getElementById('inputFile').value = ''}}>
                                <option value="image">Image</option>
                                <option value="pdf">Pdf</option>
                            </select>
                        </div>
                        <input className="form-control mt-4" id='inputFile' type="file" accept={(type === 'image') ? "image/*" : ".pdf"} onChange={handleChange} required />
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-outline-secondary btn-sm">Ajouter</button>
                        <button type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal" id='dismissFileModal'>Abandonner</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default AddFile