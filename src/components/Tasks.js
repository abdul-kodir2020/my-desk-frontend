import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import InputCheck from './InputCheck'
import AddTask from './AddTask'
import ProjectsContext from '../contexts/ProjectsContext'


function Tasks(props) {
  const [current, setCurrent] = useState('all')
  const [tasks, setTasks] = useState([])
  const [allTasks, setallTasks] = useState([])
  const [criticalTasks, setcriticalTasks] = useState([])
  const [overTasks, setoverTasks] = useState([])
  const [tasksChecked, setTasksChecked] = useState([])
  const [percent, setPercent] = useState(0)
  const {setProjects} = useContext(ProjectsContext)
  const apiUrl = process.env.REACT_APP_API_URL



  useEffect(()=>{
    const getTasks = async()=>{
      await axios.get(apiUrl+'/api/task/all/'+props.projectId,{
        headers: {
            token: localStorage.token
        }
      })
      .then(response=>{
        setTasks(response.data.tasks)
        
        const all = []
        const criticals = []
        const over = []

        response.data.tasks.forEach(task => {
          if (!task.over) all.push(task)

          if (!task.over && task.critical) criticals.push(task)

          if (task.over) over.push(task)
        });

        setallTasks(all)
        setcriticalTasks(criticals)
        setoverTasks(over)

        let perc = (over.length / response.data.tasks.length) * 100
        setPercent(perc)

      })
      .catch(err=>{
        console.log(err);
      })

    }

    getTasks()

    if (tasksChecked.length === 0) {
      document.getElementById('buttonValider').disabled = true
      document.getElementById('buttonDelete').disabled = true
    } else {
      document.getElementById('buttonValider').disabled = false
      document.getElementById('buttonDelete').disabled = false
    }

  },[tasksChecked,apiUrl,props.projectId])

  const handleClick = (e)=>{
    const boutons = document.querySelectorAll('.task-component-nav li')
    boutons.forEach(bouton => {
      bouton.classList.remove('active-nav')
    });
    e.target.parentElement.classList.add('active-nav')
    setCurrent(e.target.id)
    setTasksChecked([])
  }

  const getProjects = async()=>{
      await axios.get(apiUrl+'/api/project', {
          headers:{
              token: localStorage.token
          }
      })
      .then((response)=>{
          setProjects(response.data.projects)
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  const checkTask = async(task)=>{
    await axios.put(apiUrl+'/api/task/'+task,{
      over: (current === 'over')?false:true
    },{
      headers:{
        token: localStorage.token
      }
    })
    .then((response)=>{
      setTasksChecked([])
      props.setProject(response.data.project)
      getProjects()

    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleSubmit = async(e)=>{
    tasksChecked.forEach(task => {
      checkTask(task)
    });
  }

  const deleteTask = async(task)=>{
    await axios.delete(apiUrl+'/api/task/'+task,{
      headers:{
        token: localStorage.token
      }
    })
    .then(()=>{
      setTasksChecked([])
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleDelete = async(e)=>{
    tasksChecked.forEach(task => {
      deleteTask(task)
    });
  }

  return (
    <div className='taches'>
        <h4 className='fw-bold'><i class="bi bi-card-checklist"></i> Tâches</h4>
        <p className='text-muted mb-0' style={{fontSize: '15px'}}>{overTasks.length} sur {tasks.length} terminés</p>
        <div className="progress mb-4" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar" style={{width: `${percent}%`}}></div>
        </div>
        <div className='d-flex gap-3 tasks'>
          <div className='rounded bg-light shadow border task-component' style={{height: 'min-content'}}>
            <div className='px-3 border-bottom'>
              <ul className='task-component-nav'>
                <li className='active-nav'><button type='button' className='text-muted' id='all' onClick={handleClick}>Tous ({allTasks.length})</button></li>
                <li><button type='button' className='text-muted' id='critical' onClick={handleClick}>Urgents ({criticalTasks.length})</button></li>
                <li><button type='button' className='text-muted' id='over' onClick={handleClick}>Terminés ({overTasks.length})</button></li>
              </ul>
            </div>
            {
              (current === 'all')?
              <div className='px-3 py-2'>
                {
                  (allTasks.length !== 0)?
                  allTasks.map((task)=>(
                    <div className='d-flex gap-2 mt-3'>
                      <InputCheck tasksChecked={tasksChecked} setTasksChecked={setTasksChecked} idTask={task._id}/>
                      <div className='d-flex w-100 justify-content-between align-items-center'>
                        <div>
                          <p className='m-0 fw-bold'>{task.name}</p>
                          <p className='m-0 text-muted' style={{fontSize: '14px'}}>{task.description}</p>
                        </div>
                        {
                          (task.critical)?
                          <span class="badge text-bg-danger">urgent</span>
                          :null
                        }
                        
                      </div>
                      
                    </div>
                  ))
                  :<h6 className='text-center text-muted'>Aucune tâche</h6>
                }
              </div>
              :null
            }

            {
              (current === 'critical')?
              <div className='px-3 py-2'>
                {
                  (criticalTasks.length !== 0)?
                  criticalTasks.map((task)=>(
                    <div className='d-flex gap-2 mt-3'>
                        <InputCheck tasksChecked={tasksChecked} setTasksChecked={setTasksChecked} idTask={task._id}/>
                      <div className='d-flex w-100 justify-content-between align-items-center'>
                        <div>
                          <p className='m-0 fw-bold'>{task.name}</p>
                          <p className='m-0 text-muted' style={{fontSize: '14px'}}>{task.description}</p>
                        </div>
                        {
                          (task.critical)?
                          <span class="badge text-bg-danger">urgent</span>
                          :null
                        }
                        
                      </div>
                    </div>
                  ))
                  :<h6 className='text-center text-muted'>Aucune tâche</h6>
                }
              </div>
              :null
            } 

            {
              (current === 'over')?
              <div className='px-3 py-2'>
                {
                  (overTasks.length !== 0)?
                  overTasks.map((task)=>(
                    <div className='d-flex gap-2 mt-3'>
                        <InputCheck tasksChecked={tasksChecked} setTasksChecked={setTasksChecked} idTask={task._id}/>
                      <div className='d-flex w-100 justify-content-between align-items-center'>
                        <div>
                          <p className='m-0 fw-bold'>{task.name}</p>
                          <p className='m-0 text-muted' style={{fontSize: '14px'}}>{task.description}</p>
                        </div>
                        {
                          (task.critical)?
                          <span class="badge text-bg-danger">urgent</span>
                          :null
                        }
                        
                      </div>
                    </div>
                  ))
                  :
                  <h6 className='text-center text-muted'>Aucune tâche</h6>
                }
              </div>
              :null
            } 
            
          </div>
          {/* les boutons */}
          <div className='task-buttons' style={{height: 'min-content'}}>
            <button type="button" class="btn btn-light border shadow w-100 text-start mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-plus-circle-dotted"></i> <span>Nouvelle tâche</span></button>
            <button type="button" class="btn btn-light border shadow w-100 text-start mb-2" id='buttonDelete' onClick={handleDelete}><i class="bi bi-trash"></i> <span>Supprimer</span></button>
            {
              (current !== 'over')?
              <button type="button" class="btn btn-light border shadow w-100 text-start mb-2" id='buttonValider' onClick={handleSubmit}><i class="bi bi-check-circle-fill"></i> <span>Marquer comme terminés</span></button>
              :
              <button type="button" class="btn btn-light border shadow w-100 text-start mb-2" id='buttonValider' onClick={handleSubmit}><i class="bi bi-check-circle-fill"></i> <span>Marquer comme non terminés</span></button>
            }
          </div>
        </div>
        <AddTask projectId={props?.projectId} setTasksChecked={setTasksChecked}/>
    </div>
  )
}

export default Tasks