
import React from 'react'
import './TaskShowComp.css'
import { useState } from 'react'



export default function TaskShowComp({elementProps, editedTask, seteditedTask, todoList, setTodoList}) {

  const [expand, setExpand] = useState(false)
  function handleEditClicked(e) {
    seteditedTask({...elementProps})
    window.location.pathname = '/Edit'
  }
  function handleRemoveClicked(e) {
    const afterRemovalTodoList = todoList.filter((element) => {return element.id !== elementProps.id})
    setTodoList([...afterRemovalTodoList])
  }

  return (
    // Clickable container to set expand flag.
    <div className='task-show-comp-container'>
        <div className='task-detail-container'>
            {/* When simplified view */}
            <div className='expandable-wrapper'>
                {/* Constant first line*/}
                <div className='expandable-first-line'>
                    <p>Task Name: {elementProps.name}</p>
                    <p>Priority: {elementProps.priority}</p>
                    <p>Deu Date: {elementProps.duedate}</p>
                </div>
                {/* Adjustment for description upon expand */}
                <div className='expandable-second-line'>
                    <p>Description: {elementProps.description}</p>
                    <p>Project Name: {elementProps.project}</p>
                </div>
            </div>
            {/* When full view */}
            <div className='collapsable-wrapper'>
                <div className='collapsable-description-full'>
                </div>
            </div>
        </div>
        <div className='task-adjustment-buttons'>
            <button onClick={handleEditClicked}>Edit</button>
            <button>Complete</button>
            <button onClick={handleRemoveClicked}>Remove</button>
        </div>
    </div>
  )
}
