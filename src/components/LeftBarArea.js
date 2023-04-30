import React from 'react'
import './LeftBarArea.css'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'



export default function LeftBarArea(leftBarProps) {

  const [expandProjectList, setExpandProjectList] = useState(false)
  function handleExpandProjectList(e) {
    setExpandProjectList(prev => !prev)
  }


  function handleProjectNameClicked(e) {
    // set the global state projectName
    // console.log(e.target.innerText)
    leftBarProps.setProjectName(prev => e.target.innerText)
    console.log()
    // redirect the user to the project Page
    window.location.pathname = '/Project'
  }


  return (
    /* Left Bar and the Buttons to switch pages */
    <div className='left-bar-container'>
      {/* General Buttons at the top */}
      <div className='general-pages'>
        <div className='inbox'>
          <a href="/"><div>Inbox</div></a>
        </div>
        <div className='today'>
          <a href="/Today"><div>Today</div></a>
        </div>
      </div>
      {/* Project Buttons */}
      <div className='project-wrapper'>
        <div className='project-title-wrapper' onClick={handleExpandProjectList}>
          <div className='project-title-left-bar'>Project</div><div className='project-title-sign'>{expandProjectList? '-': '+'}</div>
        </div>  
        {leftBarProps.projectList.map(element => (
              // TODO: onclick -> set a global state of project as the project got clicked, then change the window location to /Project
              <div key={uuidv4()} className={expandProjectList? 'project-element-expand': 'project-element'} onClick={handleProjectNameClicked}>{element}</div>
            ))
        }
        </div>
      {/* Add New Task Button at the bottom */}
      <div className='new-task-page'>
        <div className='new-task'>
            <a href="/NewTask"><div>New Task</div></a>
        </div>
      </div>
    </div>
  )
}
