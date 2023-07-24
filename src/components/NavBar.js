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
          <div className='d-flex align-items-center'>
            <h1 className='logo text-center border-0 p-0 m-0'>Desk<span className='text-primary'></span></h1>
            <img src='https://img.icons8.com/3d-fluency/42/chart.png' alt='' />

          </div>
          <button className='button-menu d-none' onClick={handleClick}><i className="bi bi-x-lg"></i></button>
        </div>
        <hr className='mx-4' style={{marginTop: "5px"}}></hr>
        <ul className='list-menu'>
          <li className={(currentRoute === '/dashboard')?"px-4 active":"px-4"}><Link to={'/dashboard'} onClick={handleClickLink}><i className="bi bi-columns-gap"></i>Tableau de bord <span className="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className={(currentRoute === '/dashboard/projets')?"px-4 active":"px-4"}><Link to={'/dashboard/projets'} onClick={handleClickLink}><i className="bi bi-calendar2-range"></i>Projets<span className="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className={(currentRoute === '/dashboard/profile')?"px-4 active":"px-4"}><Link to={'/dashboard/profile'} onClick={handleClickLink}><i className="bi bi-person"></i>Mon profil<span className="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className={(currentRoute === '/dashboard/setting')?"px-4 active":"px-4"}><Link to={'/dashboard/setting'} onClick={handleClickLink}><i className="bi bi-gear"></i>Préférences<span className="bi bi-caret-right-fill ms-auto"></span></Link></li>
          <li className='list-item text-danger px-4'><Link className='fw-bold' onClick={(e)=>logout(e)}><i className="bi bi-box-arrow-left text-primary"></i>Déconnexion</Link></li>
          {/* <li className='list-item'><Link to={'/dashboard/taches'}><i className="bi bi-list-task"></i>  Tâches</Link></li> */}
        </ul>
       
        {/* <div className='d-flex justify-content-center' style={{marginTop: '100px'}}>
          <a type="button" className="btn btn-outline-primary">Voir mon portfolio</a>
        </div> */}
    </nav>
  )
}

export default NavBar