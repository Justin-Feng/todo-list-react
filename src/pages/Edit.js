
import './Edit.css'
// Libraries
import React from 'react'
import {useRef, useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



// Selection of project part global functions
function createOption(label) {
    return {
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    }
}
function projectListToOptions(projectList) {
    const working = [...projectList]
    return working.map(e => createOption(e))
}



export default function Edit(editProps) {
  
  /* Variables */ 
  // The index of the task to be edited
  const targetIdx = editProps.todoList.findIndex((element) => {return element.id === editProps.editedTask.id})
  // The copy of the todo list
  const todoListCopy = [...editProps.todoList]
  // The copy of the project list
  const projectListCopy = [...editProps.projectList]


  /* States and Refs */
  const EditNameRef = useRef()
  const EditPriorityRef = useRef()
  const EditDescriptionRef = useRef()
  const EditProjectRef = useRef()
  const EditDueDateRef = useRef()


  /* For CreatableSelect on Project */
  const [isLoading, setIsLoading] = useState(false);
  // const [options, setOptions] = useState([]);
  const [value, setValue] = useState();
  function handleCreateProject(inputValue) {
      setIsLoading(true);
      setTimeout(() => {
        const newOption = createOption(inputValue);
        setIsLoading(false);
        // setOptions((prev) => [...prev, newOption]);
        setValue(newOption);
      }, 1000);
      editProps.setProjectList((prev) => {return [...prev, inputValue]})
  }


  // For DatePicker on DueDate
  const [selectedDate, setSelectedDate] = useState(null)

  
  // Handle Edit Task Button
  function handleEditTask(e) {
      // If any of the input is empty, popup an window
      if(EditNameRef.current.value == "" || 
         EditPriorityRef.current.value == "" || 
         EditDescriptionRef.current.value == "" || 
         EditProjectRef.current.getValue().length == 0 || 
         EditDueDateRef.current.input.value == "") {
          alert("No field can be empty! Please check and edit the task again.")
          return
      }
      // If inputs are all valid
      // Call the setState for the todoList
      todoListCopy[targetIdx].name = EditNameRef.current.value
      todoListCopy[targetIdx].priority = EditPriorityRef.current.value
      todoListCopy[targetIdx].description = EditDescriptionRef.current.value
      todoListCopy[targetIdx].project = EditProjectRef.current.getValue()[0].label
      todoListCopy[targetIdx].duedate = EditDueDateRef.current.input.value

      editProps.setTodoList((prevList) => {
          return todoListCopy
      })

      // Clear the inputs
      EditNameRef.current.value = null
      // newTaskPriorityRef.current.value = null
      EditDescriptionRef.current.value = null
      EditProjectRef.current.setValue(null)
      EditDueDateRef.current.setSelected(null)
      // set the page back
      window.location.pathname = '/'
      // TODO: set the edit item back

  }


  // Debug area
  // console.log(value? value: {label: editProps.editedTask.project, value: editProps.editedTask.project})
  


  return (
      <div className='edit-container'>
        <div className='edit-title-wrapper'>
          <div className='edit-title-text'>Edit Task</div>
          <div className='edit-title-right-line'></div>
        </div>
        <div className='edit-wrapper'>
          <div className='edit-first-line-wrapper'>
              {/* Name of the new task */}
              <input className='edit-name-todo' ref={EditNameRef} defaultValue={editProps.editedTask.name}/>
              {/* Priority of the new task */}
              {editProps.editedTask.priority && <select className='edit-priority-todo' ref={EditPriorityRef} defaultValue={editProps.editedTask.priority}>
                  <option key="Priority 1" value="Priority 1">Priority 1</option>
                  <option key="Priority 2" value="Priority 2">Priority 2</option>
                  <option key="Priority 3" value="Priority 3">Priority 3</option>
                  <option key="Priority 4" value="Priority 4">Priority 4</option>
                  <option key="Priority 5" value="Priority 5">Priority 5</option>
              </select>}
          </div>
          <div className='edit-second-line-wrapper'>
              {/* Description of the new task */}
              <input className='edit-description-todo' ref={EditDescriptionRef} defaultValue={editProps.editedTask.description}/>
              {/* Project of the new task */}
              {editProps.editedTask.project && <CreatableSelect className='edit-project-todo' ref={EditProjectRef} // defaultValue={editProps.editedTask.project}
              isClearable
              isDisabled={isLoading}
              isLoading={isLoading}
              onChange={(newValue) => setValue(newValue)}
              onCreateOption={handleCreateProject}
              options={projectListToOptions(projectListCopy)}
              value={value? value: {label: editProps.editedTask.project, value: editProps.editedTask.project}}
              />}
          </div>
          <div className='edit-third-line-wrapper'>
              {/* Due Date of the new task */}
              {editProps.editedTask.duedate && <DatePicker className='edit-duedate-todo' ref={EditDueDateRef} // defaultValue={Date.parse(editProps.editedTask.duedate)}
              selected={selectedDate? selectedDate: Date.parse(editProps.editedTask.duedate)} 
              onChange={date => setSelectedDate(date)} 
              />}
              {/* Botton to confirm edit on the new task */}
              <button className='confirm-edit-button' onClick={handleEditTask}>Edit Task</button>
          </div>
        </div>
      </div>
    )
}
