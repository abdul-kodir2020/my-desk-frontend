import { Navigate, Route, Routes, redirect, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import ForgotPassword from './pages/ForgotPassword';
import Main from './components/Main';
import Projects from './components/Projects';
import UserContextProvider from './providers/UserContextProvider';
import Profile from './components/Profile';
import AddProject from './components/AddProject';
import Tasks from './components/Tasks';
import OneProject from './components/OneProject';
import ProjectContextProvider from './providers/ProjectContextProvider';

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname
  const [title, setTitle] = useState('')

  useEffect(()=>{
    if(!localStorage.getItem('token') && currentRoute !== '/register' && currentRoute !== '/forgot-password') navigate('/login')
  },[])
  return (
    <div className="App">
      <Routes>

        <Route path='/login' Component={Login}></Route>
        <Route path='/forgot-password' Component={ForgotPassword}></Route>
        <Route path='/register' Component={Register}></Route>
      </Routes>


      {/* Dashboard route */}
      
      {
        (currentRoute !== '/login' && currentRoute !== '/register' && currentRoute !== '/forgot-password')?
        <UserContextProvider>
          <ProjectContextProvider>
          <Dashboard>
            <Routes>
              <Route path='/' element={<Navigate to= '/dashboard'/>}></Route>
              <Route path='/dashboard' element={<Main/>}></Route>
              <Route path='/dashboard/projets' Component={Projects}></Route>
              <Route path='/dashboard/projets/:id' Component={OneProject}></Route>
              <Route path='/dashboard/projets/ajouter' Component={AddProject}></Route>
              <Route path='/dashboard/profile' Component={Profile}></Route>
            </Routes>
          </Dashboard>
          </ProjectContextProvider>
        </UserContextProvider>
        :null
      }
      
      
    </div>
  );
}

export default App;
