import React, { useContext, useEffect, useState } from 'react'
import TeamContext from '../contexts/TeamContext'
import axios from 'axios'
import UserContext from '../contexts/UserContext'

function TeamContextProvider({children}) {
    const [team, setTeam] = useState({})
    const [teams, setTeams] = useState([])
    const {user} = useContext(UserContext)
    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(()=>{
        const getTeams = async()=>{
            await axios.get(apiUrl+'/api/team',{
                headers:{
                    token: localStorage.token
                }
            })
            .then((response)=>{
               
                const filter = (response.data.teams.filter((team)=>team.adminId_id === user._id))[0]
                setTeam(filter)
                console.log(filter);
                setTeams(response.data.teams)
            })
        }
        getTeams()
    },[setTeams, setTeam, apiUrl])


  return (
    <TeamContext.Provider value={{setTeams, teams, team, setTeam}}>
        {children}
    </TeamContext.Provider>
  )
}

export default TeamContextProvider