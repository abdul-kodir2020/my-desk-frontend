import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import ForgotPassword from './pages/ForgotPassword';
import Main from './components/Main';
import Projects from './components/Projects';
import UserContextProvider from './providers/UserContextProvider';
import Profile from './components/Profile';
import AddProject from './components/AddProject';
import OneProject from './components/OneProject';
import ProjectContextProvider from './providers/ProjectContextProvider';
import Setting from './components/Setting';
import Teams from './components/Teams';

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname

  useEffect(()=>{
    if(!localStorage.getItem('token') && currentRoute !== '/register' && currentRoute !== '/forgot-password') navigate('/login')
  },[currentRoute,navigate])
  return (
    <div className="App">
      
      


      
      {
        (currentRoute === '/login' && currentRoute === '/register' && currentRoute === '/forgot-password')?
        <Routes>
          <Route path='/login' Component={Login}></Route>
          <Route path='/forgot-password' Component={ForgotPassword}></Route>
          <Route path='/register' Component={Register}></Route>
        </Routes>
        :
        <UserContextProvider>
          <ProjectContextProvider>
            <Dashboard>
              <Routes>
                <Route path='/' element={<Navigate to= '/dashboard'/>}></Route>
                <Route path='/dashboard' Component={Main}></Route>
                <Route path='/dashboard/projets' Component={Projects}></Route>
                <Route path='/dashboard/projets/:id' Component={OneProject}></Route>
                <Route path='/dashboard/projets/ajouter' Component={AddProject}></Route>
                <Route path='/dashboard/profile' Component={Profile}></Route>
                <Route path='/dashboard/teams' Component={Teams}></Route>
                <Route path='/dashboard/setting' Component={Setting}></Route>
              </Routes>
            </Dashboard>
          </ProjectContextProvider>
        </UserContextProvider>
      }
      
      
    </div>
  );
}

export default App;
