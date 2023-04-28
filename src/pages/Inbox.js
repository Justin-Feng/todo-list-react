import React from 'react'
import './Inbox.css'
import TaskShowComp from '../components/TaskShowComp'

export default function Inbox(inboxProps) {
  return (
    <div className='inbox-container'>
      {/* Inbox Title */}
      <div className='inbox-title'>
        <div className='inbox-page-title'>Inbox</div>
        <div className='inbox-right-line'></div>
        <p>Sort by : </p>
        <select className='inbox-sort-selection'>
          <option>Priority</option>
          <option>Due Date</option>
        </select>
      </div>
      {/* Inbox Content */}
      <div className='inbox-content'>
        {/* Header & Control */}
        <div className='inbox-content-header'></div>
        {/* Tasks & Content */}
        <div className='inbox-task-wrapper'>
          {inboxProps.todoList.map((element) => {
            return (<TaskShowComp 
                    key={element.id}
                    elementProps={element}
                    editedTask={inboxProps.editedTask} 
                    seteditedTask={inboxProps.seteditedTask}
                    todoList={inboxProps.todoList}
                    setTodoList={inboxProps.setTodoList}
                    />)
          })}
        </div>
      </div>
    </div>
  )
}
