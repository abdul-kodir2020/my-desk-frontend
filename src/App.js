import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = location.pathname

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
          <Dashboard>
            <Routes>
              <Route path='/Dashboard' Component={Main}></Route>
              <Route path='/Dashboard/projets' Component={Projects}></Route>
              <Route path='/Dashboard/profile' Component={Profile}></Route>
            </Routes>
          </Dashboard>
        </UserContextProvider>
        :null
      }
      
      
    </div>
  );
}

export default App;
