
import React from 'react'
import './ProjectArea.css'
import TaskShowComp from '../components/TaskShowComp'

export default function ProjectArea(projectProps) {

  const filteredList = projectProps.todoList.filter(element => element.project === projectProps.projectName)

  function handleDeleteProject(e) {
    if(window.confirm("Are you sure you want to DELETE the project? \n All tasks associated with the project will be DELETED as well.")) {
      // Delete the Project Name in the Global Variable ProjectList
      projectProps.setProjectList(prev => prev.filter(element => element !== projectProps.projectName))
      // Delete the tasks associated with the project name in the Global Variable TodoList
      const afterRemovalTodoList = projectProps.todoList.filter((element) => {return element.project !== projectProps.projectName})
      projectProps.setTodoList([...afterRemovalTodoList])
      // Set the Global Variable Project Name as empty
      projectProps.setProjectName(prev => '')
      // Return the page to Index
      window.location.hash = '#/'
    }
    else {
      return
    }
  }

  return (
    <div className='project-container'>
      {/* Project Title */}
      <div className='project-title'>
        <div className='project-page-title'>Project</div>
        <div className='project-right-line'></div>
        <p className='project-show-name'>{projectProps.projectName}</p>
        <i className='project-delete-button fa-solid fa-delete-left' onClick={handleDeleteProject}> Delete Project</i>
      </div>
      {/* project Content */}
      <div className='project-content'>
        {/* Header & Control */}
        <div className='project-content-header'></div>
        {/* Tasks & Content */}
        <div className='project-task-wrapper'>
          {filteredList.map((element) => {
            return (<TaskShowComp 
                    key={element.id}
                    elementProps={element}
                    editedTask={projectProps.editedTask} 
                    seteditedTask={projectProps.seteditedTask}
                    todoList={projectProps.todoList}
                    setTodoList={projectProps.setTodoList}
                    />)
          })}
        </div>
      </div>
    </div>
  )
}
