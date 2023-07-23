import React, { useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'

function Profile() {
    const {user, setTitle} = useContext(UserContext)
    useEffect(()=>{
        setTitle('Mon profil')
    })

  return (
    <div className='profile pt-5'>
        <div className='info-section d-flex gap-4'>
            <div className='bg-light info-left p-4 rounded shadow'>
                <div className='d-flex justify-content-between align-items-center mb-4' >
                    <div className='d-flex gap-2' >
                        <img alt='' src={(user.profilePic)?'http://localhost:5000/'+user?.profilePic:'https://img.freepik.com/photos-gratuite/rendu-3d-avatar-appel-zoom_23-2149556777.jpg?w=1060&t=st=1689109607~exp=1689110207~hmac=3f3eb5b6d171209bdbb0dc2301941f3bc28a6658660e9e459b465bf1edad1ae0'}></img>
                        <div className='d-flex flex-column justify-content-center gap-0'>
                        <h6 className='p-0 m-0 name'>{user?.name?.split(' ')[0] + ' ' + user?.name?.split(' ')[1]}</h6>
                        <p className='m-0 desc'>{user?.role}</p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-primary" style={{height: 'min-content'}}>Editer</button>
                </div>
                <hr></hr>

                <h5 className='fw-bold'>A propos de moi</h5>
                <p>{user?.about}</p>
            </div>
            <div className='bg-light info-right p-4 rounded shadow mb-4'>
                <h5 className='fw-bold mb-4'>Autres Détails</h5>

                <h6 className='text-muted'>Nom complet</h6>
                <h6 className='fw-bold mb-4'><i class="bi bi-person-fill text-primary "></i> {user?.name}</h6>
                <hr/>

                <h6 className='text-muted'>Email</h6>
                <h6 className='fw-bold mb-4'><i class="bi bi-envelope-fill text-primary "></i> {user?.email}</h6>
                <hr/>

                <h6 className='text-muted'>Adresse</h6>
                <h6 className='fw-bold mb-4'><i class="bi bi-geo-alt-fill text-primary "></i> {user?.adress}</h6>
                <hr/>

                <h6 className='text-muted'>Website</h6>
                <h6 className='fw-bold mb-4'><i class="bi bi-browser-chrome text-primary "></i> {user?.website}</h6>
            </div>
        </div>
    </div>
  )
}

export default Profile