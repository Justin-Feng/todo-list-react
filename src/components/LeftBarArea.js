
import React from 'react'
import './LeftBarArea.css'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'



export default function LeftBarArea(leftBarProps) {

  // For controlling expand of the project Buttons
  const [expandProjectList, setExpandProjectList] = useState(false)
  function handleExpandProjectList(e) {
    setExpandProjectList(prev => !prev)
  }

  // Handle redirection to the project page
  function handleProjectNameClicked(e) {
    // set the global state projectName
    leftBarProps.setProjectName(prev => e.target.innerText)
    // redirect the user to the project Page
    window.location.pathname = '/todo-list-react/Project'
  }



  return (
    /* Left Bar and the Buttons to switch pages */
    <div className='left-bar-container'>
      {/* General Buttons at the top */}
      <div className='left-bar-general-buttons'>
        <div className='left-bar-inbox'>
          <a href="/"><div>Inbox</div></a>
        </div>
        <div className='left-bar-today'>
          <a href="/Today"><div>Today</div></a>
        </div>
      </div>
      {/* Project Buttons */}
      <div className='left-bar-project-wrapper'>
        <div className='left-bar-project-title-wrapper' onClick={handleExpandProjectList}>
          <div className='left-bar-project-title-left-bar'>Project</div><div className='left-bar-project-title-sign'>{expandProjectList? '-': '+'}</div>
        </div>  
        {leftBarProps.projectList.map(element => (
              // TODO: onclick -> set a global state of project as the project got clicked, then change the window location to /Project
              <div key={uuidv4()} className={expandProjectList? 'left-bar-project-element-expand': 'left-bar-project-element'} onClick={handleProjectNameClicked}>{element}</div>
            ))
        }
        </div>
      {/* Add New Task Button at the bottom */}
      <div className='left-bar-new-task-wrapper'>
        <div className='left-bar-new-task'>
            <a href="/NewTask"><i className='fa-solid fa-list-check'></i><div>ADD NEW</div></a>
        </div>
      </div>
    </div>
  )
}
