import React, { useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import * as bootstrap from 'bootstrap';


function UserContextProvider({children}) {
    const [user, setUser] = useState({})
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(()=>{
        const getUser = async()=>{
            await axios.get(apiUrl+'/api/user/',{
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then((response)=>{setUser(response.data.user)})
            .catch((err)=>console.log(err))
        }
        getUser()
    },[apiUrl])

    const showToast = (message)=>{
        const toastLiveExample = document.getElementById('liveToast')

        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        setMessage(message)
        toastBootstrap.show()
    }

  return (
    <UserContext.Provider value={{user, setUser, title, setTitle, showToast, message}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider