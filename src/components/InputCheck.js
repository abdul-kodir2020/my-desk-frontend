import React, { useState } from 'react'

function InputCheck(props) {
    const [checked, setChecked] = useState(false)
    

    const handleCheck = ()=>{
        if (!checked) {
            setChecked(true)
            const tab = [...props.tasksChecked, props.idTask]
            props.setTasksChecked(tab)
        } else {
            setChecked(false)
            const tab = props.tasksChecked.filter((task)=>task !== props.idTask)
            props.setTasksChecked(tab)
        }
    }

  return (
    <>
        <input className="form-check-input" type="checkbox" checked={checked} onChange={handleCheck}/>
    </>
  )
}

export default InputCheck