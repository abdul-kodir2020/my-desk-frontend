import React, { useContext, useEffect, useState } from 'react'
import {Pie} from 'react-chartjs-2';
import {Chart as Chart} from 'chart.js/auto'
import ProjectsContext from '../contexts/ProjectsContext';

function PieChart(props) {
    const {projects} = useContext(ProjectsContext)
    const [projectsOver, setProjectsOver] = useState(0)

    useEffect(()=>{
        projects?.forEach(project => {
          if(project.over) setProjectsOver(projectsOver + 1)
        });
    
      },[projects])
  return (
    <Pie 
        data={{
    
              datasets: [{
                label: '',
                data: [(projectsOver / projects?.length) * 100, (100 - (projectsOver / projects?.length) * 100)],
                backgroundColor: [
                  'rgb(247, 208, 137)',
                  'rgb(223, 223, 223)',
                ],
                hoverOffset: 4
              }]
        }}
    />
  )
}

export default PieChart