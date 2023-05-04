
import React from 'react'
import './TaskShowComp.css'
import { useState } from 'react'
// Font Awesome 5 Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'



export default function TaskShowComp({elementProps, editedTask, seteditedTask, todoList, setTodoList}) {


  const [collaps, setCollaps] = useState('true')

  /* ----- Local Functions ----- */
  // Function that handles when user clicks EDIT
  function handleEditClicked(e) {
    seteditedTask({...elementProps})
    window.location.hash = '#/Edit'
  }
  // Function that handles when user clicks COMPLETE
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
  // Function that handles when user clicks REMOVE
  function handleRemoveClicked(e) {
    if(window.confirm("Are you sure you want to DELETE the task? \n This action CANNOT BE REDONE.")) {
      const afterRemovalTodoList = todoList.filter((element) => {return element.id !== elementProps.id})
      setTodoList([...afterRemovalTodoList])
    }
    else {
      return
    }
  }
  // Function Wrapping the Task Name text
  function wrapTaskName(name) {
    if(collaps === 'true' && name.length >= 22) {
      return name.substring(0, 16) + ' ... '
    }
    return name
  }
  // Function that handles the expandation of the task showing container
  function handleExpand(e) {
    const accordion = document.getElementById(elementProps.id)
    accordion.classList.toggle('task-show-comp-container-expand-active')
    setCollaps(prev => {return prev === 'false'? 'true': 'false'})
  }



  /* ----- Return Area ----- */
  return (
    // Clickable container to set expand flag.
    <div id={elementProps.id}
         className={elementProps.completed? 'task-show-comp-container-complete': 'task-show-comp-container-incomplete'}
         onClick={handleExpand}>
        <div className='task-show-comp-left-container'>
          <div className='task-show-comp-left-top-container'>
            <i className={'task-show-comp-left-top-button-complete fa-circle-check ' + (elementProps.completed? 'fa-solid': 'fa-regular')} onClick={handleCompleteClicked}></i>
            {collaps && <div className={'task-show-comp-task-name ' + (elementProps.completed? 'complete-name': '')}>{collaps === 'true'? wrapTaskName(elementProps.name): elementProps.name}</div>}
          </div>
          <div className='task-show-comp-task-description'>{elementProps.description}</div>
        </div>
        <div className='task-show-comp-middle-container'>
          <div className='task-show-comp-task-duedate-wrapper'>
            <i className='fa-solid fa-calendar'></i>
            <div className='task-show-comp-task-duedate'>{elementProps.duedate}</div>
          </div>
          <div className='task-show-comp-task-priority-wrapper'>
            <i className='fa-solid fa-fire'></i>
            <div className='task-show-comp-task-priority'>{elementProps.priority}</div>
          </div>
          <div className='task-show-comp-task-project-wrapper'>
            <i className='fa-solid fa-suitcase'></i>
            <div className='task-show-comp-task-project'>{elementProps.project}</div>
          </div>
        </div>
        <div className='task-show-comp-right-container'>
          <i className='task-show-comp-right-button-edit fa-solid fa-pencil' onClick={handleEditClicked}></i>
          <i className='task-show-comp-right-button-remove fa-solid fa-trash-can' onClick={handleRemoveClicked}></i>
        </div>
        
        
        
        
        
    </div>
  )
}
