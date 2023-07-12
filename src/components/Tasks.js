import React from 'react'
import { Link } from 'react-router-dom'

function Tasks() {
  return (
    <div className='taches pt-5'>
         <div className='d-flex justify-content-between align-items-center'>
            <div>
                <h4 className='fw-bold'>Tâches</h4>
                <p>Les étapes de vos projets.</p>
            </div>
            <Link to={'/Dashboard/projets/ajouter'} type="button" class="btn btn-outline-primary" style={{height: 'min-content'}}>Ajouter une tâche</Link>
        </div>
    </div>
  )
}

export default Tasks