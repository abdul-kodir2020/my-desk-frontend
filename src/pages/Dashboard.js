import React from 'react'
import NavBar from '../components/NavBar'
import TopSection from '../components/TopSection'

function Dashboard({children}) {
  return (
    <div className='dashboard'>
        <NavBar/>
        <div className='section-right'>
            <TopSection/>
            <div className='container'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Dashboard