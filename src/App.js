// components
import LeftBarArea from './components/LeftBarArea';
// pages
import Inbox from './pages/Inbox';
import TodayArea from './pages/TodayArea';
import ProjectArea from './pages/ProjectArea';
import NewTask from './pages/NewTask';
import Edit from './pages/Edit';
// imports
import './App.css';
import {useRef, useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'


// Global variables
const LOCAL_STORAGE_KEY_TODOLIST = 'todoApp.todo'
const LOCAL_STORAGE_KEY_EDITEDTASK = 'todoApp.editedtask'
const LOCAL_STORAGE_KEY_PROJECTS = 'todoApp.projects'


function App() {

  // States & Refs
  const [todoList, setTodoList] = useState([]) 
  // array of objects (todo task object)
  const [projects, setProjects] = useState([]) // array of strings (project name)
  // the id of the task to be edited
  const [editedTask, seteditedTask] = useState({})
  

  
  // useEffect to load todo list from local storage
  useEffect(() => {
    // Todo List
    const storedTodoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOLIST))
    if(storedTodoList) {
      setTodoList((prevlist) => [...prevlist, ...storedTodoList])
    }
    // Projects
    const storedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS))
    if(storedProjects) {
      setProjects((prevlist) => {return [...prevlist, ...storedProjects]})
    }
    // Edited Task
    const storededitedTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EDITEDTASK))
    if(storededitedTask) {
      seteditedTask((prevItem) => {return {...prevItem, ...storededitedTask}})
    }
  }, [])

  // useEffect to save todo list to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOLIST, JSON.stringify(todoList))
  }, [todoList])
  // useEffect to save projects to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects)) 
  }, [projects])
  // useEffect to save edited task to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_EDITEDTASK, JSON.stringify(editedTask))
  }, [editedTask])
  


  /* Functions */
  // Determine the page to show on the Main Area
  function determineMainAreaPage() {
    let component
    switch (window.location.pathname) {
      case '/':
        component = <Inbox className='main-area-container' 
                    todoList={todoList} setTodoList={setTodoList}
                    projectList={projects} setProjectList={setProjects}
                    editedTask={editedTask} seteditedTask={seteditedTask}
                    />
        break;
      case '/Today':
        component = <TodayArea className='main-area-container' />
        break;
      case '/Project':
        component = <ProjectArea className='main-area-container' />
        break;
      case '/NewTask':
        component = <NewTask className='main-area-container' 
                    todoList={todoList} setTodoList={setTodoList}
                    projectList={projects} setProjectList={setProjects}
                    />
        break;
      case '/Edit':
        component = <Edit className='main-area-container' 
                    todoList={todoList} setTodoList={setTodoList}
                    projectList={projects} setProjectList={setProjects}
                    editedTask={editedTask} seteditedTask={seteditedTask}
                    LOCAL_STORAGE_KEY_TODOLIST={LOCAL_STORAGE_KEY_TODOLIST}
                    LOCAL_STORAGE_KEY_PROJECTS={LOCAL_STORAGE_KEY_PROJECTS}
                    LOCAL_STORAGE_KEY_editedTask={LOCAL_STORAGE_KEY_EDITEDTASK}
                    />
        break;
      default:
        break;
    }
    return component
  }



  // Debug
  //todoList.map(element => console.log(element.name))
  //console.log(projects)
  //console.log(editedTask)




  /* Return Content */
  return (
    <div className="container">
      <LeftBarArea className='left-bar-container'/>
      {determineMainAreaPage()}
    </div>
  )
}

export default App;
