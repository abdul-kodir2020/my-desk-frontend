import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Tasks from './Tasks'
import UserContext from '../contexts/UserContext'
import ProjectsContext from '../contexts/ProjectsContext'
import Files from './Files'
import AddFile from './AddFile'

function OneProject() {
    const location = useLocation()
    const projectId = location.pathname.split('/')[location.pathname.split('/').length - 1]
    const navigate = useNavigate()
    const [project, setProject] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const {setTitle,showToast} = useContext(UserContext)
    const {setProjects, projects} = useContext(ProjectsContext)
    const [files, setFiles] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(()=>{
        const getProject = async()=>{
            await axios.get(apiUrl+'/api/project/'+projectId,{
                headers:{
                    token: localStorage.token
                }
            })
            .then((response)=>{
                setProject(response.data.project)
                setName(response.data.project.name)
                setDescription(response.data.project.description)
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        getProject()
        setTitle('Mon projet')
    },[setProject,apiUrl,projectId,setTitle])

    const handleDelete = async(e)=>{
        e.preventDefault()

        await axios.delete(apiUrl+'/api/project/'+projectId,{
            headers: {
                token: localStorage.token
            }
        })
        .then((response)=>{
            
            const projectsNew = projects.filter((project)=>project._id !== projectId)
            setProjects(projectsNew)
            navigate('/dashboard/projets')
            showToast("Projet supprimé avec succès !")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handleCancel = ()=>{
        setEditMode(false);
        setDescription(project?.description)
        setName(project?.name)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        await axios.put(apiUrl+'/api/project/'+projectId,{
            name:name,
            type: project?.type,
            description: description
        },{
            headers: {
                token: localStorage.token
            }
        })
        .then((response)=>{
            setProject(response.data.updatedProject)
            setEditMode(false)
            showToast("Vos informations ont été mises à jour !")
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className='pt-5'>
        
        <form onSubmit={handleSubmit}>
        <div className='d-flex flex-wrap gap-3 mb-4'>
            
            <div className='bg-white rounded shadow p-4 info-project' >
                {
                    (project?.type === "application web")?
                    <i className="bi bi-code icon-dev rounded"></i>
                    :null
                }

                {
                    (project?.type === "application mobile")?
                    <i className="bi bi-phone icon-mobile rounded"></i>
                    :null
                }

                {
                    (project?.type === "design making")?
                    <i className="bi bi-vector-pen icon-design rounded"></i>
                    :null
                }

                {
                    (project?.type === "autre")?
                    <i className="bi bi-bezier2 icon-other rounded"></i>
                    :null
                }

                {
                    (editMode)?
                    <input className="form-control mt-4 fw-bold shadow " type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    :<h4 className='fw-bold m-0 mt-4'>{project?.name}</h4>

                }
                <h5 className='fw-bold text-primary mb-4'>{project?.type}</h5>
                {
                    project?.over?
                    <h6 className='text-success'>Projet terminé</h6>
                    :
                    <h6 className='text-warning'>Projet non terminé</h6>
                }

                

                {
                    (editMode)?
                    <textarea className="form-control bg-light fw-bold shadow" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                    :
                    <p className='text-muted p-3 bg-light rounded fw-bold shadow border'>{project?.description}</p>

                }
            </div>
            

            <div className='bg-white rounded shadow p-4 d-flex flex-column gap-2 container-button' style={{height: 'min-content'}}>
                {
                    (editMode)?
                    <>
                        <button type='submit' className='btn btn-outline-success'>Valider</button>
                        <button type='button' className='btn btn-outline-secondary' onClick={handleCancel}>Abandonner</button>
                    </>
                    :
                    <>
                        <button type='button' className='btn btn-outline-danger' onClick={handleDelete}>Supprimer</button>
                        <button type='button' className='btn btn-outline-warning' onClick={()=>setEditMode(true)}>Editer</button>
                    </>
                }
                
            </div>
            <div className='bg-white rounded shadow p-4 flex-fill' style={{height: 'min-content'}}>
                <h4 className='fw-bold mb-2'><i className="bi bi-folder"></i> Ressources</h4>
                {/* <p className='text-muted'>Aucun fichier ajouté</p> */}
                <Files files={files} setFiles={setFiles}/>
            </div>
        </div>
        </form>
        <AddFile setFiles={setFiles}/>
        <div className='bg-white rounded shadow p-4 mb-4'>
            <Tasks projectId={projectId} setProject={setProject}/>
        </div>

        
    </div>
  )
}

export default OneProject