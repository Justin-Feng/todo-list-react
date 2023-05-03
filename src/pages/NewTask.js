
import './NewTask.css'
// Libraries
import React from 'react'
import {useRef, useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import CreatableSelect from 'react-select/creatable';
import ReactDatePicker from 'react-datepicker'
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


export default function NewTask(newTaskProps) {

    const projectListCopy = [...newTaskProps.projectList]

    // States and Refs
    const newTaskNameRef = useRef()
    const newTaskPriorityRef = useRef()
    const newTaskDescriptionRef = useRef()
    const newTaskProjectRef = useRef()
    const newTaskDueDateRef = useRef()


    // For Selection on Project
    const [isLoading, setIsLoading] = useState(false);
    // const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    function handleCreateProject(inputValue) {
        setIsLoading(true);
        setTimeout(() => {
          const newOption = createOption(inputValue);
          setIsLoading(false);
        //   setOptions((prev) => [...prev, newOption]);
          setValue(newOption);
        }, 1000);
        newTaskProps.setProjectList((prev) => {return [...prev, inputValue]})
    }


    // For DatePicker on DueDate
    const [selectedDate, setSelectedDate] = useState(null)


    // Handle Adding New Task Button
    function handleAddNewTask(e) {
        // If any of the input is empty, popup an window
        if(newTaskNameRef.current.value === "" || 
           newTaskPriorityRef.current.value === "" || 
           newTaskDescriptionRef.current.value === "" || 
           newTaskProjectRef.current.getValue().length === 0 || 
           newTaskDueDateRef.current.input.value === "") {
            // javascript:window.open('','_blank','height=600,width=400')
            alert("No field can be empty! Please check and add the task again.")
            return
        }
        // If inputs are all valid
        // Call the setState for the todoList
        newTaskProps.setTodoList((prevList) => {
            return [...prevList, {
                id: uuidv4(), 
                name: newTaskNameRef.current.value, 
                priority: newTaskPriorityRef.current.value, 
                description: newTaskDescriptionRef.current.value, 
                project: newTaskProjectRef.current.getValue()[0].label, 
                duedate: newTaskDueDateRef.current.input.value, 
                completed: false, 
            }]
        })
        // Clear the inputs
        newTaskNameRef.current.value = null
        newTaskPriorityRef.current.value = 'Priority 1'
        newTaskDescriptionRef.current.value = null
        newTaskProjectRef.current.setValue(null)
        newTaskDueDateRef.current.setSelected(null)
        alert("Task added successfully!")
    }



    // Style Variable for Creatable Select
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: '#ffffff80', height: '50px', }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isFocused ? '#6757505d' : '#67575038', 
            color: 'black'
          };
        }
    };


    // Debug area
    // console.log(newTaskProjectRef.current.getValue())

    
    return (
        <div className='new-task-container'>
          <div className='new-task-title-wrapper'>
            <div className='new-task-title-text'>New Task</div>
            <div className='new-task-title-right-line'></div>
          </div>
          <div className='new-task-input-wrapper'>
            <div className='new-task-input-left-wrapper'>
                {/* Name of the new task */}
                <div className='new-task-input-left-name-wrapper'>
                    <div className='new-task-input-left-name-prompt'>Name</div>
                    <input className='new-task-input-left-name-input' ref={newTaskNameRef} placeholder='What is the name/title of this new task?'/>
                </div>
                <div className='new-task-input-left-description-wrapper'>
                    <div className='new-task-input-left-description-prompt'>Description</div>
                    {/* Description of the new task */}
                    <textarea className='new-task-input-left-description-input' ref={newTaskDescriptionRef} placeholder="Let's add some description about this new task ... "/>
                </div>
            </div>
            <div className='new-task-input-middle-wrapper'>
                <div className='new-task-input-middle-priority-wrapper'>
                    <div className='new-task-input-middle-priority-prompt'>Level of Priority</div>
                    {/* Priority of the new task */}
                    <select className='new-task-input-middle-priority-input' ref={newTaskPriorityRef}>
                        <option>Priority 1</option>
                        <option>Priority 2</option>
                        <option>Priority 3</option>
                        <option>Priority 4</option>
                        <option>Priority 5</option>
                    </select>
                </div>
                <div className='new-task-input-middle-project-wrapper'>
                    <div className='new-task-input-middle-project-prompt'>Project</div>
                    {/* Project of the new task */}
                    <CreatableSelect className='new-task-input-middle-project-input' ref={newTaskProjectRef}
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={(newValue) => setValue(newValue)}
                    onCreateOption={handleCreateProject}
                    options={projectListToOptions(projectListCopy)}
                    value={value}
                    styles={colourStyles}
                    placeholder="Select ... or Type to Create Project"
                    />
                </div>
                <div className='new-task-input-middle-duedate-wrapper'>
                    <div className='new-task-input-middle-duedate-prompt'>Due Date</div>
                    {/* Due Date of the new task */}
                    <ReactDatePicker className='new-task-input-middle-duedate-input' ref={newTaskDueDateRef}
                    selected={selectedDate} 
                    onChange={date => setSelectedDate(date)} 
                    placeholderText='Pick a date ...'
                    />
                </div>
            </div>
            <div className='new-task-input-right-wrapper'>
                {/* Botton to create the new task */}
                <i className='new-task-input-add-button fa-solid fa-plus' onClick={handleAddNewTask}>Add Task</i>
            </div>
          </div>
        </div>
      )
}
