import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from "../services/TaskService";

const Task = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTaskState = {
    id : null,
    message:"",
    due_date:"",
    priority:"",
    assigned_to: ""
  };
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const getTask = id => {
    TaskService.get(id)
      .then(response => {
        setCurrentTask(response.data.tasks);
        console.log(response.data.tasks);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
    getTask(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const updatePublished = status => {
 
    let formData = new FormData(); 

    formData.append('message', currentTask.message);  
    formData.append('due_date', currentTask.due_date);
    formData.append('priority', currentTask.priority);  
    formData.append('assigned_to', currentTask.assigned_to);
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    

    TaskService.update(currentTask.id, formData,config)
      .then(response => {
        setCurrentTask({ ...currentTask });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTask = () => {
    let formData = new FormData(); 

    formData.append('message', currentTask.message);  
    formData.append('due_date', currentTask.due_date);
    formData.append('priority', currentTask.priority);  
    formData.append('assigned_to', currentTask.assigned_to);
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    TaskService.update(currentTask.id, currentTask)
      .then(response => {
        console.log("update",response.data.tasks);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = () => {
  
    TaskService.remove(currentTask.id)
      .then(response => {
        console.log("delete",response.data.tasks);
        navigate("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTask ? (
        <div className="edit-form">
          <h4>Task</h4>
          <form>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <input
                type="text"
                className="form-control"
                id="message"
                name="message"
                value={currentTask.message}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="due_date">Due Date</label>
              <input
                type="text"
                className="form-control"
                id="due_date"
                name="due_date"
                value={currentTask.due_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <input
                type="text"
                className="form-control"
                id="priority"
                name="priority"
                value={currentTask.priority}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="assigned_to">Assigned To</label>
              <input
                type="text"
                className="form-control"
                id="assigned_to"
                name="assigned_to"
                value={currentTask.assigned_to}
                onChange={handleInputChange}
              />
            </div>
          
          </form>

        

          <button className="badge badge-danger mr-2" onClick={deleteTask}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTask}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Task;
