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
const LOCAL_STORAGE_KEY_PROJECTS = 'todoApp.projects'
const LOCAL_STORAGE_KEY_EDITEDTASK = 'todoApp.editedtask'
const LOCAL_STORAGE_KEY_PROJECTNAME = 'todoApp.projectname'
const LOCAL_STORAGE_KEY_FROMPAGE = 'todoApp.frompage'


function App() {

  /* ----- States & Refs ----- */
  // Todo List, Array of Tasks
  const [todoList, setTodoList] = useState([]) // array of objects
  // Array of Project Names
  const [projects, setProjects] = useState([]) // array of strings (project name)
  // The About to be Edited Task
  const [editedTask, seteditedTask] = useState({}) // object
  // The Project to be Shown in the Project Page
  const [projectName, setProjectName] = useState('') // string
  // From Which Page that Calls the Edit Page
  const [fromPage, setFromPage] = useState() // string
  

  
  /* ----- useEffect to Load Golbal State from Local Storage ----- */
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
    const storedEditedTask = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EDITEDTASK))
    if(storedEditedTask) {
      seteditedTask((prevItem) => {return {...prevItem, ...storedEditedTask}})
    }
    // Project Name
    const storedProjectName = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTNAME)
    if(storedProjectName) {
      setProjectName((prevItem) => {return prevItem + storedProjectName})
    }
  }, [])

  /* ----- useEffect to Save Golbal State from Local Storage ----- */
  // Todo List
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOLIST, JSON.stringify(todoList))
  }, [todoList])
  // Projects
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects)) 
  }, [projects])
  // Edited Task
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_EDITEDTASK, JSON.stringify(editedTask))
  }, [editedTask])
   // Project Name
   useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTNAME, projectName)
  }, [projectName])
  


  /* ----- Functions ----- */
  // Determine the page to show on the Main Area
  function determineMainAreaPage() {
    let component
    switch (window.location.pathname) {
      case '/':
        component = <Inbox className='app-main-area' 
                    todoList={todoList} setTodoList={setTodoList}
                    projectList={projects} setProjectList={setProjects}
                    editedTask={editedTask} seteditedTask={seteditedTask}
                    fromPage={fromPage} setFromPage={setFromPage}
                    />
        break;
      case '/Today':
        component = <TodayArea className='app-main-area' 
                    todoList={todoList} setTodoList={setTodoList}
                    />
        break;
      case '/Project':
        component = <ProjectArea className='app-main-area' 
                    todoList={todoList} setTodoList={setTodoList}
                    projectList={projects} setProjectList={setProjects}
                    editedTask={editedTask} seteditedTask={seteditedTask}
                    projectName={projectName} setProjectName={setProjectName}
                    fromPage={fromPage} setFromPage={setFromPage}
                    />
        break;
      case '/NewTask':
        component = <NewTask className='app-main-area' 
                    todoList={todoList} setTodoList={setTodoList}
                    projectList={projects} setProjectList={setProjects}
                    />
        break;
      case '/Edit':
        component = <Edit className='app-main-area' 
                    todoList={todoList} setTodoList={setTodoList}
                    projectList={projects} setProjectList={setProjects}
                    editedTask={editedTask} seteditedTask={seteditedTask}
                    fromPage={fromPage} setFromPage={setFromPage}
                    />
        break;
      default:
        break;
    }
    return component
  }



  /* ----- Debug ----- */
  //todoList.map(element => console.log(element.name))
  //console.log(projects)
  //console.log(editedTask)



  /* ----- Return Content ----- */
  return (
    <div className="app-container">
      <LeftBarArea className='app-left-bar' 
        projectList={projects} setProjectList={setProjects}
        projectName={projectName} setProjectName={setProjectName}/>
      {determineMainAreaPage()}
    </div>
  )
}

export default App;
