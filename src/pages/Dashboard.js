import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import TopSection from '../components/TopSection'
import UserContext from '../contexts/UserContext'

function Dashboard({children}) {
  const {message} = useContext(UserContext)

  return (
    <div className='dashboard'>
        <NavBar/>
        <div className='section-right'>
            <TopSection />
            <div className='container'>
              <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                  <div className="toast-header">
                    <strong className="me-auto">Message</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
                  <div className="toast-body text-white">
                    {message}
                  </div>
                </div>
              </div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Dashboard