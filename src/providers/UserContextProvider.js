import React, { useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import axios from 'axios'

function UserContextProvider({children}) {
    const [user, setUser] = useState({})

    useEffect(()=>{
        const getUser = async()=>{
            await axios.post('http://localhost:5000/api/user/',{},{
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then((response)=>{setUser(response.data.user); console.log(response.data.user)})
            .catch((err)=>console.log(err))
        }
        getUser()
    },[])

  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider