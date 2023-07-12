import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function TopSection() {
  const {user} = useContext(UserContext)

  return (
    <div className='top-section'>
      <div className='container d-flex justify-content-end align-items-center h-100'>
        <Link to={'/Dashboard/profile'} className='profil-link'>
          <div>
            <img className='pic' alt='' src={(user.profilePic)?'http://localhost:5000/'+user?.profilePic:'https://img.freepik.com/photos-gratuite/rendu-3d-avatar-appel-zoom_23-2149556777.jpg?w=1060&t=st=1689109607~exp=1689110207~hmac=3f3eb5b6d171209bdbb0dc2301941f3bc28a6658660e9e459b465bf1edad1ae0'}></img>
            <div className='d-flex flex-column justify-content-center gap-0'>
              <h6 className='p-0 m-0'>{user?.name?.split(' ')[0] + ' ' + user?.name?.split(' ')[1]}</h6>
              <p className='m-0'>Voir le profil</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default TopSection