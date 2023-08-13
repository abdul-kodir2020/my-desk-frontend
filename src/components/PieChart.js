import React, { useContext, useEffect, useState } from 'react'
import {Pie} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';
// eslint-disable-next-line
import {Chart, plugins} from 'chart.js/auto'
import ProjectsContext from '../contexts/ProjectsContext';

function PieChart() {
    const {projects} = useContext(ProjectsContext)
    const [projectsOver, setProjectsOver] = useState(0)

    useEffect(()=>{
        setProjectsOver(0)
        projects?.forEach(project => {
          if(project.over) setProjectsOver(projectsOver=>projectsOver + 1)
        });
    
      },[projects])

      const data = {
        datasets: [{
          label: '',
          data: [((projects.length)?(projectsOver / projects?.length) * 100 : 0),((projects.length)?(100 - (projectsOver / projects?.length) * 100) : 100)],
          backgroundColor: [
            '#986bff',
            'rgb(223, 223, 223)',
          ],
        
          borderWidth: 0,
          cutout: '70%',
          hoverOffset: 4
        }]
      }

      const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginOptions){
          const {ctx, data} = chart;

          ctx.save();
          ctx.font = 'bolder 19px sans-serif';
          ctx.fillStyle = '#986bff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(data.datasets[0].data[0].toFixed(0) + '%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
        }
      }
  return (
    <Doughnut 
        data={data}
        plugins={[textCenter]}
    />
  )
}

export default PieChart