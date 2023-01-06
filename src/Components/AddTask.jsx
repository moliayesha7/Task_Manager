import React, { useState } from "react";
import TaskService from "../services/TaskService";
import { Link } from "react-router-dom";
const AddTask = () => {
  const initialTaskState = {
    id : null,
    message:"",
    due_date:"",
    priority:"",
    assigned_to: ""
  };
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {

    let formData = new FormData(); 

    formData.append('message', task.message);  
    formData.append('due_date', task.due_date);
    formData.append('priority', task.priority);  
    formData.append('assigned_to', task.assigned_to);
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    TaskService.create(formData,config)
      .then(response => {
        setTask({
          id: response.data.taskid,
          status: response.data.status,
        
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(initialTaskState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
        <h3 className="text-center">Add New Task</h3>
      {submitted ? (
        <div>
          <h4>Task Created successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              required
              value={task.message}
              onChange={handleInputChange}
              name="message"
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="due_date">Due Date</label>
            <input
              type="text"
              className="form-control"
              id="due_date"
              required
              value={task.due_date}
              onChange={handleInputChange}
              name="due_date"
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              className="form-control"
              id="priority"
              required
              value={task.priority}
              onChange={handleInputChange}
              name="priority"
            />
          </div>

          <div className="form-group mt-2">
            <label htmlFor="assigned_to">Assigned To</label>
            <input
              type="text"
              className="form-control"
              id="assigned_to"
              required
              value={task.assigned_to}
              onChange={handleInputChange}
              name="assigned_to"
            />
          </div>
          <button onClick={saveTask} className="btn btn-success mt-3">
            Submit
          </button>
          <div className="col-md-3 offset-md-9">      
            <Link to="/">Back to Tasklist</Link>
        </div>
        </div>
      )}
    </div>
  );
};


export default AddTask;
