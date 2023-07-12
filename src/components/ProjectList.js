import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ProjectList() {
    const [projects, setProjects] = useState([])

    useEffect(()=>{
        const getProjects = async()=>{
            await axios.get('http://localhost:5000/api/project', {
                headers:{
                    token: localStorage.token
                }
            })
            .then((response)=>{
                setProjects(response.data.projects)
                console.log('ff');
            })
            .catch((err)=>{
                console.log(err)
            })
        }

        getProjects()
    },[])

  return (
    <>
    <h5 className='mb-0 mt-3 fw-bold text-end'><span className='text-primary'>{projects?.length}</span> projets</h5>
    <div className=' mb-5 d-flex flex-wrap test'>
        
        {
            projects?.map(projet => (
                <ProjectCard projet={projet}  />
            ))
        }
        <Link className='card-link mt-4 ' to={'/Dashboard/projets/ajouter'}>
            <div className='card-project bg-white p-4 shadow rounded d-flex justify-content-center align-items-center' style={{minHeight: '330px'}}>
                <i class="bi bi-plus text-muted" style={{fontSize: '80px'}}></i>
            </div>
        </Link>
    </div>
    </>
  )
}

export default ProjectList