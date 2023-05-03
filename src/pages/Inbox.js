import React from 'react'
import './Inbox.css'
import TaskShowComp from '../components/TaskShowComp'
import { useRef } from 'react'

export default function Inbox(inboxProps) {

  const sortSelectionRef = useRef();

  function handleSortSelectionChange(e) {
    if(sortSelectionRef.current.value === 'Priority') {
      // console.log(inboxProps.todoList[0].priority.split(' ')[1] > inboxProps.todoList[1].priority.split(' ')[1])
      const tempTodoCopy = [...inboxProps.todoList].sort((a, b) => a.priority.split(' ')[1] >= b.priority.split(' ')[1] ? 1 : -1)
      inboxProps.setTodoList(prev => tempTodoCopy)
    }
    else if(sortSelectionRef.current.value === 'Due Date') {
      const tempTodoCopy = [...inboxProps.todoList].sort((a, b) => parseInt(a.duedate.split('/')[0]) + parseInt(a.duedate.split('/')[1])*30 + parseInt(a.duedate.split('/')[2])*365 >= parseInt(b.duedate.split('/')[0]) + parseInt(b.duedate.split('/')[1])*30 + parseInt(b.duedate.split('/')[2])*365 ? 1 : -1)
      inboxProps.setTodoList(prev => tempTodoCopy)
    }
  }
  

  return (
    <div className='inbox-container'>
      {/* Inbox Title */}
      <div className='inbox-title'>
        <div className='inbox-page-title'>Inbox</div>
        <div className='inbox-right-line'></div>
        <p className='inbox-sort-prompt'>Sort by</p>
        <select className='inbox-sort-selection' ref={sortSelectionRef} onChange={handleSortSelectionChange} >
          <option disabled selected value>-- select --</option>
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
