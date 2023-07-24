import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import axios from 'axios'

function UpdatePic() {
    const [imageReader, setImageReader] = useState(null)
    const [image, setImage] = useState(null)

    const {user,setUser, showToast} = useContext(UserContext)
    const apiUrl = process.env.REACT_APP_API_URL

    const clickFileInput = () =>{
        document.getElementById('file').click()
    }

    const handleChange = (e)=>{
        e.preventDefault()
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () =>{
                setImageReader(reader.result)
                setImage(e.target.files[0])
            }
            reader.readAsDataURL(file)
        }

    }

    const saveFile = async()=>{
        await axios.post(apiUrl+'/api/user/',{
            image: image
          },{
            headers:{
                "Content-Type": "multipart/form-data",
                token: localStorage.token
            }
          })
          .then((response)=>{
            setUser(response.data.user)
            document.getElementById("btn-close").click()
            document.getElementById('file').value = ''
            showToast('Photo de profil modifiée')
          })
          .catch((err)=>{
            console.log(err);
          })
    }

    useEffect(()=>{
        document.getElementById("updatePic").addEventListener("hidden.bs.modal", ()=> {
            setImageReader(null)
        });
    },[])
    
  return (
    <div className="modal fade" id="updatePic" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header border-0">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Photo de profil</h1>
                    <button type="button" id='btn-close' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex justify-content-center">
                    {
                        (!imageReader)?
                        <img className='pic-preference' alt='' style={{width: '300px', height:'300px'}} src={(user.profilePic)?apiUrl+'/'+user?.profilePic:'https://img.freepik.com/photos-gratuite/rendu-3d-avatar-appel-zoom_23-2149556777.jpg?w=1060&t=st=1689109607~exp=1689110207~hmac=3f3eb5b6d171209bdbb0dc2301941f3bc28a6658660e9e459b465bf1edad1ae0'}></img>
                        :
                        <img className='pic-preference' alt='' style={{width: '300px', height:'300px'}} src={imageReader}></img>
                    }
                    
                </div>
                <div className="px-2 py-3 border-top d-flex justify-content-between">
                    <div>
                        <button onClick={clickFileInput} className='btn btn-dark btn-sm'><i className="bi bi-pencil text-white"></i> Modifier photo de profil</button>
                        <input className="form-control d-none" id='file' type="file" accept="image/*" onChange={handleChange} />
                    </div>
                    {
                        (imageReader)?
                        <button className='btn btn-success btn-sm' onClick={saveFile}><i className="bi bi-save2-fill text-white" ></i> Enregistrer</button>
                        :''
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdatePic