import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import image1 from '../images/web.jpeg'
import image2 from '../images/mobile.jpg'
import image3 from '../images/design.jpg'
import image4 from '../images/autre.jpg'

function ProjectCard(props) {
  const {user} = useContext(UserContext)


    const [percent, setPercent] = useState(0)
    const apiUrl = process.env.REACT_APP_API_URL
    

    useEffect(()=>{
        const getTasks = async()=>{
            await axios.get(apiUrl+'/api/task/all/'+props.projet?._id, {
                headers: {
                    token: localStorage.token
                }
            }).then((response)=>{
                let count = 0
                response.data.tasks.forEach(task => {
                    if (task.over === true) {
                        count++
                    }
                });
                let perc = (count / response.data.tasks.length) * 100
                setPercent(perc)
            }).catch((err)=>{
                console.log(err)
            })
        }

        getTasks()
    },[apiUrl,props.projet?._id])

    
  return (
    // <Link to={'/dashboard/projets/'+props.projet?._id} className='card-link mt-4 ' key={props.projet?.name}>
    //     <div className='card-project bg-white p-4 shadow rounded'>
    //         <div className='d-flex justify-content-between mb-4'>
    //             {
    //                 (props.projet?.type === "application web")?
    //                 <i className="bi bi-code icon-dev rounded"></i>
    //                 :null
    //             }

    //             {
    //                 (props.projet?.type === "application mobile")?
    //                 <i className="bi bi-phone icon-mobile rounded"></i>
    //                 :null
    //             }

    //             {
    //                 (props.projet?.type === "design making")?
    //                 <i className="bi bi-vector-pen icon-design rounded"></i>
    //                 :null
    //             }

    //             {
    //                 (props.projet?.type === "autre")?
    //                 <i className="bi bi-bezier2 icon-other rounded"></i>
    //                 :null
    //             }
                
    //             <div className="dropdown">
    //                 <button className="dots" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    //                     <i className="bi bi-three-dots"></i>
    //                 </button>
    //                 <ul className="dropdown-menu">
    //                     <li><button className="dropdown-item text-danger" name={props.projet?._id} onClick={handleClick}>Supprimer</button></li>
    //                     <li><button className="dropdown-item">Voir les détails</button></li>
    //                 </ul>
    //             </div>
    //         </div>
    //         <h6 className='fw-bold mb-3'>{props.projet?.type}</h6>
    //         <p className='text-muted text-wrap mb-3 text-desc'>{props.projet?.description}</p>
    //         <hr></hr>
    //         <h6 className='fw-bold' style={{fontSize: '15px'}}>Tâches</h6>
    //         <p className='text-muted' style={{fontSize: '15px'}}>{over} sur {tasks.length} terminés</p>
    //         <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
    //             <div className="progress-bar" style={{width: `${percent}%`}}></div>
    //         </div>
    //     </div>
    // </Link>
    <Link to={'/dashboard/projets/'+props.projet?._id} className='card-link mt-4 ' key={props.projet?.name}>
        <div className='card-project bg-white p-2 shadow rounded'>
            {
                (props.projet?.type === "application web")?
                <img className='card-img rounded mb-4' alt='image1' src={image1}></img>
                :null
            }

            {
                (props.projet?.type === "application mobile")?
                <img className='card-img rounded mb-4' alt='image2' src={image2}></img>
                :null
            }

            {
                (props.projet?.type === "design making")?
                <img className='card-img rounded mb-4' alt='image3' src={image3}></img>
                :null
            }

            {
                (props.projet?.type === "autre")?
                <img className='card-img rounded mb-4' alt='image4' src={image4}></img>
                :null
            }
            
            <div className='p-2'>

                {
                    (props.projet?.type === "application web")?
                    <p className='fw-bold type-text-web' style={{marginBottom: '-3px', fontSize: '15px'}}>{props.projet?.type}</p>
                    :null
                }

                {
                    (props.projet?.type === "application mobile")?
                    <p className='fw-bold type-text-mobile' style={{marginBottom: '-3px', fontSize: '15px'}}>{props.projet?.type}</p>
                    :null
                }

                {
                    (props.projet?.type === "design making")?
                    <p className='fw-bold type-text-design' style={{marginBottom: '-3px', fontSize: '15px'}}>{props.projet?.type}</p>
                    :null
                }

                {
                    (props.projet?.type === "autre")?
                    <p className='fw-bold type-text-autre' style={{marginBottom: '-3px', fontSize: '15px'}}>{props.projet?.type}</p>
                    :null
                }
                <h5 className='fw-bold mb-3'>{props.projet?.name}</h5>
                
                <div className="progress position-relative" >
                    <div className="progress-bar bg-dark" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}></div>
                    <span className='caption-progress'>{(percent)?`${percent.toFixed(0)}%`:'0%'}</span>
                </div>
                <hr></hr>
                <div className='d-flex justify-content-between'>
                    <img className='card-pic' alt='' src={(user.profilePic)?apiUrl+'/'+user?.profilePic:'https://img.freepik.com/photos-gratuite/rendu-3d-avatar-appel-zoom_23-2149556777.jpg?w=1060&t=st=1689109607~exp=1689110207~hmac=3f3eb5b6d171209bdbb0dc2301941f3bc28a6658660e9e459b465bf1edad1ae0'}></img>
                    <button className='btn btn-outline-light btn-sm '>Voir le projet</button>
                </div>
            </div>
        </div>
    </Link>
    
  )
}

export default ProjectCard