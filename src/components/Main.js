import React, { useContext, useEffect, useState } from 'react'
import ProjectsContext from '../contexts/ProjectsContext'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import PieChart from './PieChart'


function Main() {
  const {projects} = useContext(ProjectsContext)
  const [projectsThree, setProjectsThree] = useState([])
  const [projectsOver, setProjectsOver] = useState(0)

  const {setTitle} = useContext(UserContext)

  useEffect(()=>{
    setProjectsThree(projects.slice(0,3))
    setProjectsOver(0)
    projects?.forEach(project => {
      if(project.over) setProjectsOver(projectsOver=>projectsOver + 1)
    });

    setTitle('Tableau de bord')
    
  
     
  },[projects,setTitle])

  return (
    <div className='main pt-5'>

        <div className='d-flex dash-feature'>
          <div className='p-3 bg-white border shadow rounded d-flex gap-3 align-items-center '>
            <i className="bi bi-calendar2 icon-dev rounded"></i>
            <div>
              <h6 className='text-muted mb-0'>Projets totals</h6>
              <p className='m-0 fw-bold '>{((projects.length < 10)?'0':'') + projects.length}</p>
            </div>
            
          </div>

          <div className='p-3 bg-white border shadow rounded d-flex gap-3 align-items-center '>
            <i className="bi bi-calendar2-check icon-mobile rounded"></i>
            <div>
              <h6 className='text-muted mb-0'>Projets terminés</h6>
              <p className='m-0 fw-bold '>{((projectsOver < 10)?'0':'') + projectsOver}</p>
            </div>
            
          </div>

          <div className='p-3 bg-white border shadow rounded d-flex gap-3 align-items-center '>
            <i className="bi bi-folder-check icon-other rounded"></i>
            <div>
              <h6 className='text-muted mb-0'>Fichiers partagés</h6>
              <p className='m-0 fw-bold '>00</p>
            </div>
            
          </div>

          <div className='p-3 bg-white border shadow rounded d-flex gap-3 align-items-center '>
            <i className="bi bi-people-fill icon-design rounded"></i>
            <div>
              <h6 className='text-muted mb-0'>Ma team</h6>
              <p className='m-0 fw-bold '>Softartisan</p>
            </div>
            
          </div>
          
        </div>
        {/* deuxieme ligne */}
        <div className='d-flex mt-3 feature-2'>
          <div className='shadow rounded p-3 bg-white'>
            <h6 className='fw-bold mb-0 '>Chart</h6>
            <hr className='mt-2'></hr>
            <div className='d-flex justify-content-between align-items-center w-100 chart-container'>
              <div className='d-flex flex-column justify-content-between'>
                <div className='w-100 d-flex d-lg-block d-md-block justify-content-center gap-3 mb-5'>
                  <i className="bi bi-pie-chart-fill icon-mobile rounded py-2 d-none d-lg-inline d-md-inline"></i>
                  <h5 className='mt-3 fw-bold'>Projets terminés (%)</h5>
                </div>
                <div className='w-100 ms-auto d-flex d-lg-block d-md-block justify-content-around'>
                  <p className='m-0 text-muted d-flex align-items-center'><span className='rounded-circle d-block' style={{backgroundColor: '#986bff', width:'10px', height: '10px'}}></span>&nbsp;Terminés </p>
                </div>
              </div>
              <div style={{width: 180}}>
                <PieChart/>
              </div>
            </div>
          </div>
          <div className='shadow rounded bg-white p-3 feature-list mb-5 mb-lg-0 mb-md-0'>
            <div className='d-flex justify-content-between align-items-center w-100'>
            <h6 className='fw-bold mb-0'>Projets récents</h6>
            {
              
              (projectsThree.length)?
              <Link to={'/dashboard/projets'} className='text-warning fw-bold text-decoration-none'>Voir tous</Link>
              :null
            }
            </div>
            
            <hr className='mt-2'></hr>
            <div className="list-group w-100">
            {
              (projectsThree.length)?
              projectsThree.map((projet)=>(
                <Link to={'/dashboard/projets/'+projet?._id} className="list-group-item list-group-item-action d-flex align-items-center gap-2" key={projet.name}>
                  {
                    (projet?.type === "application web")?
                    <i className="bi bi-code icon-dev rounded"></i>
                    :null
                }

                {
                    (projet?.type === "application mobile")?
                    <i className="bi bi-phone icon-mobile rounded"></i>
                    :null
                }

                {
                    (projet?.type === "design making")?
                    <i className="bi bi-vector-pen icon-design rounded"></i>
                    :null
                }

                {
                    (projet?.type === "autre")?
                    <i className="bi bi-bezier2 icon-other rounded"></i>
                    :null
                }
                <div className='d-flex flex-column'>
                  <span className='fw-bold'>{projet.name}</span>
                  <span className='fw-bold text-muted' style={{fontSize: '13px', marginTop: '-4px'}}>{projet.type}</span>
                </div>
                

                <i className="bi bi-arrow-right-circle-fill ms-auto text-secondary"></i>
                </Link>
              ))
              :<p className='text-center fw-bold text-muted mb-0'>Aucun projet</p>
            }
            </div>
           
            
          </div>
        </div>
    </div>
  )
}

export default Main