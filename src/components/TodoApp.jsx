import React, { useState } from 'react';
import Task from './Task';
export const STATUS = {
  PENDING: 0,
  DONE: 1
}
export default function TodoApp() {
  const [job, setJob] = useState('')
  const [jobs, setJobs] = useState([])
  const [editJobs, setEditJobs] = useState(null)
  const [error, setError] = useState(null)
  const handleChange = (e) =>{
    setJob(e.target.value)
  }
  const handleSubmit = () =>{
    if(!job){
      setError('New task cannot be empty!')
      return
    }
    setError(null)
    setJobs(prev => [...prev, {
      id: Math.ceil(Math.random() * 100000),
      name: job,
      status: STATUS.PENDING
    }])
    setJob('')
  }
  const handleUpdateStatus = (e, id) =>{
    setJobs(prev => prev.map(item => {

      if(item.id == id){
        item.status = e.target.checked ? STATUS.DONE : STATUS.PENDING
      } 
      return item
    }))
  }
  const handleEditJobs = (id) => {
    const editJob = jobs.find(item => item.id == id)
    setJob(editJob.name)
    setEditJobs(editJob)

  }
  const handleChangeUpdate = (e) =>{
    setJobs(prev => prev.map(item => {
      if(item.id == editJobs.id){
        item.name = job
      }
      setJob('')
      setEditJobs(null)
      return item
    }))
  }
  const handleDelete = (id) =>{
    if(editJobs?.id === id){
      setEditJobs(null)
      setJob('')
    }
    setJobs(prev => prev.filter(item => item.id !== id))
  }
  return (
    <div className="todo-app">
      <div className="todo-box">
        <h1 className="title">Todo List</h1>
        <div className="create-box">
          <input type="text" name="name" placeholder="Add your task" onChange={handleChange} value={job}/>
          {editJobs ? (
            <button onClick={handleChangeUpdate} className="btn-add-task">Update</button>
          ): (
            <button onClick={handleSubmit} className="btn-add-task">+</button>
          )}
        </div>
        {
          error && <div className='error'>{error}</div>
        }
        {jobs.length === 0 && (
            <div className="empty-list">
              Your list is empty! <br />
              Add a new task above to get started.
            </div>
          )}
        <div className="todo-list">
          {jobs.map((item, index) =>(
              <Task key={index} data={item} onChangeStatus={handleUpdateStatus} onEditJobs={handleEditJobs} onDelete={handleDelete}/>
          ))}
        </div>
      </div>
    </div>
  )
}
