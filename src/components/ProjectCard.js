import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProjectCard(props) {
    const [tasks, setTasks] = useState([])
    const [over, setOver] = useState(0)
    const [percent, setPercent] = useState(0)
    const apiUrl = process.env.REACT_APP_API_URL
    

    useEffect(()=>{
        const getTasks = async()=>{
            await axios.get(apiUrl+'/api/task/all/'+props.projet?._id, {
                headers: {
                    token: localStorage.token
                }
            }).then((response)=>{
                setTasks(response.data.tasks)
                let count = 0
                response.data.tasks.forEach(task => {
                    if (task.over === true) {
                        count++
                    }
                });
                setOver(count)
                let perc = (count / response.data.tasks.length) * 100
                setPercent(perc)
            }).catch((err)=>{
                console.log(err)
            })
        }

        getTasks()
    },[apiUrl,props.projet?._id])

    const handleClick = async(e)=>{
        e.preventDefault()

        await axios.delete(apiUrl+'/api/project/'+e.target.name,{
            headers: {
                token: localStorage.token
            }
        })
        .then((response)=>{
            props.setProjects(response.data.projects)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <Link to={'/dashboard/projets/'+props.projet?._id} className='card-link mt-4 ' key={props.projet?.name}>
        <div className='card-project bg-white p-4 shadow rounded'>
            <div className='d-flex justify-content-between mb-4'>
                {
                    (props.projet?.type === "application web")?
                    <i className="bi bi-code icon-dev rounded"></i>
                    :null
                }

                {
                    (props.projet?.type === "application mobile")?
                    <i className="bi bi-phone icon-mobile rounded"></i>
                    :null
                }

                {
                    (props.projet?.type === "design making")?
                    <i className="bi bi-vector-pen icon-design rounded"></i>
                    :null
                }

                {
                    (props.projet?.type === "autre")?
                    <i className="bi bi-bezier2 icon-other rounded"></i>
                    :null
                }
                
                <div className="dropdown">
                    <button className="dots" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-three-dots"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item text-danger" name={props.projet?._id} onClick={handleClick}>Supprimer</button></li>
                        <li><button className="dropdown-item">Voir les détails</button></li>
                    </ul>
                </div>
            </div>
            <h6 className='fw-bold mb-3'>{props.projet?.type}</h6>
            <p className='text-muted text-wrap mb-3 text-desc'>{props.projet?.description}</p>
            <hr></hr>
            <h6 className='fw-bold' style={{fontSize: '15px'}}>Tâches</h6>
            <p className='text-muted' style={{fontSize: '15px'}}>{over} sur {tasks.length} terminés</p>
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{width: `${percent}%`}}></div>
            </div>
        </div>
    </Link>
    
  )
}

export default ProjectCard