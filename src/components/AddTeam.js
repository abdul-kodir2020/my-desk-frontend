import React, { useContext, useState } from 'react'
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import TeamContext from '../contexts/TeamContext';

function AddTeam() {
    const [name, setName] = useState('')
    const [adress, setAdress] = useState('')
    const [website, setWebsite] = useState('')
    const [file, setFile] = useState(null)
    const apiUrl = process.env.REACT_APP_API_URL
    const {showToast} = useContext(UserContext)
    const {setTeam} = useContext(TeamContext)

    const handleChange = (e)=>{
        setFile(e.target.files[0])
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await axios.post(apiUrl+'/api/team',{
            name: name,
            adress: adress || null,
            website: website || null,
            image: file
        },{
            headers:{
                "Content-Type": "multipart/form-data",
                token: localStorage.token
            }
        })
        .then((response)=>{
            console.log(response);
            setTeam(response.data.teamCreated)
            setAdress('')
            setName('')
            setWebsite('')
            setFile(null)
            document.getElementById('dismissFileModal').click()
        })
        .catch((err)=>{
            console.log(err);
            showToast(err.response.data)
        })
    }
  return (
    <div className="modal fade" id="addTeam" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="mb-4">
                            <label className="form-label">Nom de l'équipe*</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Adresse ( organisation )</label>
                            <input type="text" className="form-control" value={adress} onChange={(e)=>setAdress(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Site web ( organisation )</label>
                            <input type="text" className="form-control" value={website} onChange={(e)=>setWebsite(e.target.value)}/>
                        </div>
                        <div>
                            <label className='form-label'>Photo de profil*</label>
                            <input className="form-control" id='inputFile' type="file" accept="image/*" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-outline-secondary btn-sm">Créer</button>
                        <button type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal" id='dismissFileModal'>Abandonner</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default AddTeam