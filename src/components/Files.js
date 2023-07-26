import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function Files(props) {
    const apiUrl = process.env.REACT_APP_API_URL
    const {showToast} = useContext(UserContext)
    const location = useLocation()
    const projectId = location.pathname.split('/')[location.pathname.split('/').length - 1]

    useEffect(()=>{
        const getFiles = async()=>{
            axios.get(apiUrl+'/api/file/'+projectId,{
                headers:{
                    token: localStorage.token
                }
            })
            .then((response)=>{
                props.setFiles(response.data.files)
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        getFiles()
    },[props.setFiles,apiUrl,projectId,props])

    const deleteFile = async(e)=>{
        await axios.delete(apiUrl+'/api/file/'+e.target.name,{
            headers: {
                token: localStorage.token
            }
        })
        .then((response)=>{
            console.log(response)
            let newFiles = props.files.filter((file)=>file._id !== e.target.name)
            props.setFiles(newFiles)
            showToast('Fichier Supprimé !')
        })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
      <div>
          <button type='button' className='btn btn-light border-dark shadow w-100 position-relative' data-bs-toggle="modal" data-bs-target="#modalAddFile">
              <i className="bi bi-plus-circle-dotted"> </i> Ajouter un fichier
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {props.files?.length}
              </span>
          </button>

          <div>
              {
                (props.files.length)?
                <ul class="list-group list-files mt-4">
                  {
                      props.files?.map((file) => (
                          <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center ">
                              <div>
                                  <p className='m-0 text-wrap text-break'><a href={apiUrl + '/' + file.path} target='_blank' rel="noreferrer" className='text-dark text-decoration-none'>{file.name}</a></p>
                                  <span class="badge text-bg-dark" style={{ fontSize: '12px' }}>{(file.type === 'pdf') ? <i class="bi bi-file-earmark-pdf text-white"></i> : <i class="bi bi-image-fill text-white"></i>} {file.type}</span>
                              </div>
                              <button className='btn m-1 p-0' type='button' name={file._id} onClick={deleteFile}><i className="bi bi-trash text-danger pe-none"></i></button>
                          </li>
                      ))
                  }
              </ul>
              :<h6 className='text-muted text-center mt-4'>Aucun fichier</h6>
              }
          </div>
      </div>
  )
}

export default Files