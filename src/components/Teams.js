import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import AddTeam from './AddTeam'
import TeamContext from '../contexts/TeamContext'

function Teams() {
    const {setTitle} = useContext(UserContext)
    const [current, setCurrent] = useState('details')
    const {setTeam, team, teams, setTeams} = useContext(TeamContext)
    const apiUrl = process.env.REACT_APP_API_URL


    useEffect(()=>{
        setTitle('Mon équipe')
    },[setTitle, setTeam])

    const handleNav = (e)=>{
        const boutons = document.querySelectorAll('.team-nav button')
        boutons.forEach(bouton => {
            bouton.classList.remove('team-active')
        });
        e.target.classList.add('team-active')
        document.querySelector('.team-body').classList.add('dispa')
        setTimeout(() => {
            setCurrent(e.target.id)
            document.querySelector('.team-body').classList.remove('dispa')
        }, 200);
    }

  return (
    <div className='pt-5'>
        {
            (!team?._id)?
            <div className='bg-white p-4 rounded shadow'>
                <p className='text-muted text-center fs-5'>Vous n'avez pas encore d'équipe.</p>
                <p className='text-center'><button className='btn btn-sm btn-outline-secondary' data-bs-toggle="modal" data-bs-target="#addTeam">Créez votre équipe</button></p>
                <hr></hr>
                <p className='text-muted text-center'>Les équipes dont vous faites partis sans en être admin s'afficheront dans la barre de navigation sous le lien teams après que vous ayez accepté de rejoindre ces équipes.</p>
                <AddTeam/>
            </div>
            :
            <div>
                <div className='p-4 rounded shadow team-banner d-flex align-items-end position-relative mb-2'>
                    <div className='team-overlay'></div>
                    <div className='d-flex gap-3 align-items-center z-1'>
                        <img src={apiUrl+'/'+team?.profilePic} alt='' className='rounded team-pic'></img>
                        <div className='text-white '>
                            <p className='text-white m-0'>EQUIPE</p>
                            <p className='text-white m-0 fs-5' style={{fontWeight: 'bold'}}>{team?.name.toUpperCase()}</p>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <div className='team-nav d-flex gap-3 mb-2' style={{width: 'min-content'}}>
                        <button type='button' className='rounded px-3 py-2 team-active' onClick={handleNav} id='details'><i class="bi bi-clipboard-data-fill"></i>Details</button>
                        <button className='rounded px-3 py-2' onClick={handleNav} id='projets'><i className="bi bi-calendar2-range-fill"></i>Projets</button>
                        <button className='rounded px-3 py-2' onClick={handleNav} id='membres'><i class="bi bi-person-lines-fill"></i>Membres</button>
                    </div>
                    <div className='team-body'>
                    {
                        (current === 'details')?
                        <div className='bg-white rounded p-3 shadow rounded'>
                            aaa
                        </div>
                        :null
                    }

                    {
                        (current === 'projets')?
                        <div className='bg-white rounded p-3 shadow rounded'>
                            bbb
                        </div>
                        :null
                    }

                    {
                        (current === 'membres')?
                        <div className='bg-white rounded p-3 shadow rounded'>
                            ccc
                        </div>
                        :null
                    }
                    </div> 
                </div>
            </div>
        }
        
    </div>
  )
}

export default Teams