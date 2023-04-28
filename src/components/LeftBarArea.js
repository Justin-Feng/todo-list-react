import React from 'react'
import './LeftBarArea.css'



export default function LeftBarArea() {


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
        <div className='project'>
          <a href="/Project"><div>Project</div></a>
        </div>
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
