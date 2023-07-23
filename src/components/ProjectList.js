import React, { useContext, useEffect } from 'react'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'
import ProjectsContext from '../contexts/ProjectsContext'

function ProjectList() {
    const {projects, setProjects} = useContext(ProjectsContext)

    useEffect(()=>{

    },[setProjects])

  return (
    <>
    <div className='p-3 bg-light border shadow rounded d-flex gap-3 align-items-center' style={{width: 'max-content'}}>
    <i class="bi bi-calendar2 icon-dev rounded"></i>
    <div>
        <h6 className='text-muted mb-0'>Projets totals</h6>
        <p className='m-0 fw-bold '>{((projects.length < 10)?'0':'') + projects.length}</p>
    </div>
    
    </div>
    <div className=' mb-5 d-flex flex-wrap test'>
        <Link className='card-link mt-4 ' to={'/Dashboard/projets/ajouter'}>
            <div className='card-project bg-white p-4 shadow rounded d-flex justify-content-center align-items-center' style={{minHeight: '330px'}}>
                <i class="bi bi-plus text-muted" style={{fontSize: '80px'}}></i>
            </div>
        </Link>
        
        {
            projects?.map(projet => (
                <ProjectCard projet={projet} setProjects={setProjects} />
            ))
        }
        
    </div>
    </>
  )
}

export default ProjectList