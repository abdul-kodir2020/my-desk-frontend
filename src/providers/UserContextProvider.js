import React, { useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import axios from 'axios'


function UserContextProvider({children}) {
    const [user, setUser] = useState({})
    const [title, setTitle] = useState('')
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
        console.log(apiUrl)
    },[])

  return (
    <UserContext.Provider value={{user, setUser, title, setTitle}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider