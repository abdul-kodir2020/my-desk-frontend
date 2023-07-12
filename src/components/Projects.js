import React from 'react'
import ProjectList from './ProjectList'
import { Link } from 'react-router-dom'

function Projects() {
  return (
    <div className='projets pt-5'>
        <div className='d-flex justify-content-between align-items-center'>
            <div>
                <h4 className='fw-bold'>Projets</h4>
                <p>Suivez tous vos projets de près.</p>
            </div>
            
        </div>
        <ProjectList/>
    </div>
  )
}

export default Projects