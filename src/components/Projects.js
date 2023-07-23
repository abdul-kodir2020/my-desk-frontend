import React, { useContext, useEffect } from 'react'
import ProjectList from './ProjectList'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function Projects() {
  const {setTitle} = useContext(UserContext)

  useEffect(()=>{
    setTitle('Mes projets')
  })

  return (
    <div className='projets pt-5'>
        <ProjectList/>
    </div>
  )
}

export default Projects