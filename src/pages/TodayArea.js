import React from 'react'
import './TodayArea.css'
import TaskShowComp from '../components/TaskShowComp'

export default function TodayArea(todayProps) {

  
  
  const now = new Date()
  let todayString
  if(now.getMonth()+1 < 10) {
    todayString = ('0' + now.toLocaleString() + '').substring(0, 10)
  } else {
    todayString = ('' + now.toLocaleString() + '').substring(0, 10)
  }
  const filteredList = todayProps.todoList.filter(element => element.duedate === todayString)
  


  return (
    <div className='today-container'>
      {/* Today Title */}
      <div className='today-title'>
        <div className='today-page-title'>Today</div>
        <div className='today-right-line'></div>
        <p>Sort by : </p>
        <select className='today-sort-selection'>
          <option>Priority</option>
          <option>Due Date</option>
        </select>
      </div>
      {/* Today Content */}
      <div className='today-content'>
        {/* Header & Control */}
        <div className='today-content-header'></div>
        {/* Tasks & Content */}
        <div className='today-task-wrapper'>
          {filteredList.map((element) => {
            return (<TaskShowComp 
                    key={element.id}
                    elementProps={element}
                    editedTask={todayProps.editedTask} 
                    seteditedTask={todayProps.seteditedTask}
                    todoList={todayProps.todoList}
                    setTodoList={todayProps.setTodoList}
                    />)
          })}
        </div>
      </div>
    </div>
  )
}
