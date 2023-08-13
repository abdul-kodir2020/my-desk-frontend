import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname

  const logout = (e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    navigate("/login")
  }

  const handleClick = () =>{
    document.querySelector('nav').style.width = '0'
  }

  const handleClickLink = () =>{
    if (document.documentElement.clientWidth < 1200) {
      handleClick()
    }
  }

  const handleClickLinkDropdown = (e) =>{
    e.preventDefault()
    if (document.querySelector('.list-menu .dropdown ul').clientHeight === 0) {
      document.querySelector('.list-menu .dropdown ul').style.height = '53px'
      document.querySelector('.bip').classList.add('rotate')
    }else{
      document.querySelector('.list-menu .dropdown ul').style.height = '0'
      document.querySelector('.bip').classList.remove('rotate')

    }
    
  }


  return (
    <nav className='border py-3'>
        <div className='d-flex justify-content-between px-4'>
          <div className='d-flex align-items-center'>
          <img src='https://img.icons8.com/3d-fluency/36/chart.png' alt='' />
            <h1 className='logo text-center border-0 p-0 m-0'>Desk<span className='text-primary'></span></h1>
            

          </div>
          <button className='button-menu d-none' onClick={handleClick}><i className="bi bi-x-lg"></i></button>
        </div>
        <hr className='mx-4' style={{marginTop: "5px"}}></hr>
        <ul className='list-menu'>
          <li className={(currentRoute === '/dashboard')?"px-4 active":"px-4"}><Link to={'/dashboard'} onClick={handleClickLink}><i className="bi bi-columns-gap"></i>Tableau de bord </Link></li>
          <li className={(currentRoute === '/dashboard/projets')?"px-4 active":"px-4"}><Link to={'/dashboard/projets'} onClick={handleClickLink}><i className="bi bi-calendar2-range"></i>Projets</Link></li>
          <li className={(currentRoute === '/dashboard/profile')?"px-4 active":"px-4"}><Link to={'/dashboard/profile'} onClick={handleClickLink}><i className="bi bi-person"></i>Mon profil</Link></li>

          <li className={(currentRoute === '/dashboard/teams')?"px-4 active dropdown":"px-4 dropdown"}>
            <span><Link onClick={handleClickLinkDropdown}><i className="bi bi-people"></i>Teams<span className="bi bi-caret-down-fill ms-auto bip"></span></Link></span>
            <ul className='rounded close'>
              <li className={(currentRoute === '/dashboard/teams')?"active":""}><Link to={'/dashboard/teams'} onClick={handleClickLink}><i className="bi bi-people"></i>Ma Team</Link></li>
              {/* <li><Link to={'/dashboard/teams'} onClick={handleClickLink}><i className="bi bi-people"></i>Autre Team</Link></li> */}
            </ul>
          </li>

          <li className={(currentRoute === '/dashboard/setting')?"px-4 active":"px-4"}><Link to={'/dashboard/setting'} onClick={handleClickLink}><i className="bi bi-gear"></i>Préférences</Link></li>
          <li className='list-item text-danger px-4'><Link className='fw-bold text-danger' onClick={(e)=>logout(e)}><i className="bi bi-box-arrow-left text-danger"></i>Déconnexion</Link></li>
          {/* <li className='list-item'><Link to={'/dashboard/taches'}><i className="bi bi-list-task"></i>  Tâches</Link></li> */}
          {/* <span className="bi bi-caret-right-fill ms-auto"></span> */}
        </ul>
       
        {/* <div className='d-flex justify-content-center' style={{marginTop: '100px'}}>
          <a type="button" className="btn btn-outline-primary">Voir mon portfolio</a>
        </div> */}
    </nav>
  )
}

export default NavBar