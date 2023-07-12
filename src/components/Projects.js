import React from 'react'
import ProjectList from './ProjectList'

function Projects() {
  return (
    <div className='projets pt-5'>
        <div className='d-flex justify-content-between align-items-center'>
            <div>
                <h4 className='fw-bold'>Projets</h4>
                <p>Suivez tous vos projets de près.</p>
            </div>
            <button type="button" class="btn btn-outline-primary" style={{height: 'min-content'}}>Ajouter un projet</button>
        </div>
        <ProjectList/>
        
    </div>
  )
}

export default Projects