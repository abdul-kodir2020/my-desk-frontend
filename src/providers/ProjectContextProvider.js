import React, { useEffect, useState } from 'react'
import ProjectsContext from '../contexts/ProjectsContext'
import axios from 'axios'

function ProjectContextProvider({children}) {
    const [projects, setProjects] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(()=>{
      const getProjects = async()=>{
          await axios.get(apiUrl+'/api/project', {
              headers:{
                  token: localStorage.token
              }
          })
          .then((response)=>{
              setProjects(response.data.projects)
              console.log("eee")
          })
          .catch((err)=>{
              console.log(err)
          })
      }

      getProjects()
      
  },[setProjects])

  return (
    <ProjectsContext.Provider value={{projects, setProjects}}>
        {children}
    </ProjectsContext.Provider>
  )
}

export default ProjectContextProvider