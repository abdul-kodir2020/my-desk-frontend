import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function TopSection() {
  const {user, title} = useContext(UserContext)
  const apiUrl = process.env.REACT_APP_API_URL
  const handleClick = () =>{
    document.querySelector('nav').style.width = '300px'
  }
  

  return (
    <div className='top-section'>
      <div className='container d-flex justify-content-between align-items-center h-100'>
        <div className='d-flex align-items-center gap-2'>
          <button className='button-menu d-none' onClick={handleClick}><i class="bi bi-list"></i></button>
          <h5 className='m-0 fw-bold'>{title}</h5>
        </div>
        
        <Link to={'/dashboard/profile'} className='profil-link'>
          <div>
            <img className='pic' alt='' src={(user.profilePic)?apiUrl+'/'+user?.profilePic:'https://img.freepik.com/photos-gratuite/rendu-3d-avatar-appel-zoom_23-2149556777.jpg?w=1060&t=st=1689109607~exp=1689110207~hmac=3f3eb5b6d171209bdbb0dc2301941f3bc28a6658660e9e459b465bf1edad1ae0'}></img>
            <div className='flex-column justify-content-center gap-0 d-none d-lg-flex d-md-flex'>
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