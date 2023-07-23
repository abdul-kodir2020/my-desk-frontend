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


  return (
    <nav className='border py-3'>
        <div className='d-flex justify-content-between px-4'>
          <h1 className='logo text-center border-0 p-0'>Desk<span className='text-primary'>.</span></h1>
          <button className='button-menu d-none' onClick={handleClick}><i class="bi bi-x-lg"></i></button>
        </div>
        <hr className='mx-4' style={{marginTop: "5px"}}></hr>
        <ul className='list-menu'>
          <li className={(currentRoute === '/dashboard')?"px-4 active":"px-4"}><Link to={'/dashboard'} onClick={handleClickLink}><i class="bi bi-columns-gap"></i>Tableau de bord <span class="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className={(currentRoute === '/dashboard/projets')?"px-4 active":"px-4"}><Link to={'/dashboard/projets'} onClick={handleClickLink}><i class="bi bi-calendar2-range"></i>Projets<span class="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className={(currentRoute === '/dashboard/profile')?"px-4 active":"px-4"}><Link to={'/dashboard/profile'} onClick={handleClickLink}><i class="bi bi-person"></i>Mon profil<span class="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className='list-item px-4'><Link><i class="bi bi-gear"></i>Préférences<span class="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className='list-item text-danger px-4'><Link className='fw-bold' onClick={(e)=>logout(e)}><i class="bi bi-box-arrow-left text-primary"></i>Déconnexion</Link></li>
          {/* <li className='list-item'><Link to={'/dashboard/taches'}><i class="bi bi-list-task"></i>  Tâches</Link></li> */}
        </ul>
       
        {/* <div className='d-flex justify-content-center' style={{marginTop: '100px'}}>
          <a type="button" class="btn btn-outline-primary">Voir mon portfolio</a>
        </div> */}
    </nav>
  )
}

export default NavBar