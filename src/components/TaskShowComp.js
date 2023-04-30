
import React from 'react'
import './TaskShowComp.css'
import { useState } from 'react'



export default function TaskShowComp({elementProps, editedTask, seteditedTask, todoList, setTodoList}) {

  const [expand, setExpand] = useState(false)


  function handleEditClicked(e) {
    seteditedTask({...elementProps})
    window.location.pathname = '/Edit'
  }
  function handleCompleteClicked(e) {
    // The index of the task to be edited
    const targetIdx = todoList.findIndex((element) => {return element.id === elementProps.id})
    // The copy of the todo list
    const todoListCopy = [...todoList]
    todoListCopy[targetIdx].completed = !todoListCopy[targetIdx].completed
    setTodoList((prevList) => {
      return todoListCopy
  })
  }
  function handleRemoveClicked(e) {
    if(window.confirm("Are you sure you want to DELETE the task? \n This action CANNOT BE REDONE.")) {
      const afterRemovalTodoList = todoList.filter((element) => {return element.id !== elementProps.id})
      setTodoList([...afterRemovalTodoList])
    }
    else {
      return
    }
  }


  return (
    // Clickable container to set expand flag.
    <div className={elementProps.completed? 'task-show-comp-container-complete': 'task-show-comp-container-incomplete'}>
        <div className='task-detail-container'>
            {/* When simplified view */}
            <div className='expandable-wrapper'>
                {/* Constant first line*/}
                <div className='expandable-first-line'>
                    <p>Task Name: {elementProps.completed? elementProps.name + ' (completed) ': elementProps.name}</p>
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
            <button onClick={handleCompleteClicked}>Complete</button>
            <button onClick={handleRemoveClicked}>Remove</button>
        </div>
    </div>
  )
}
