import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()

  const logout = (e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <nav className='border p-4'>
        <div className='d-flex justify-content-between '>
          <h1 className='logo text-center border-0 p-0'>Desk<span className='text-primary'>.</span></h1>
          <button className='button-menu'><i class="bi bi-list"></i></button>
        </div>
        <hr className='' style={{marginTop: "5px"}}></hr>
        <br></br>
        <ul className='list-menu'>
          <li className='list-item'><Link to={'/dashboard'}><i class="bi bi-house"></i>  Tableau de bord</Link></li>
          <li className='list-item'><Link to={'/dashboard/projets'}><i class="bi bi-diagram-2"></i>  Projets</Link></li>
          <li className='list-item'><Link><i class="bi bi-list-task"></i>  Tâches</Link></li>
        </ul>
        <br></br>
        <hr></hr>
        <br></br>
        <ul className='list-menu'>
          <li className='list-item'><Link><i class="bi bi-gear"></i>  Préférences</Link></li>
          <li className='list-item text-danger'><Link className='fw-bold' onClick={(e)=>logout(e)}><i class="bi bi-box-arrow-left text-primary"></i>  Déconnexion</Link></li>
        </ul>
        <div className='d-flex justify-content-center' style={{marginTop: '100px'}}>
          <a type="button" class="btn btn-outline-primary">Voir mon portfolio</a>
        </div>
        
    </nav>
  )
}

export default NavBar