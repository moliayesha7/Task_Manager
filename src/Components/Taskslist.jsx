import React, { useState, useEffect } from "react";
import TaskService from "../services/TaskService";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const Taskslist = () => {
  let navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [list, setList] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    retrieveTasks();
 
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTasks = () => {
    TaskService.getAll()
      .then(response => {   
       const res=response.data.tasks.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
       setTasks(res)
      })
      .catch(e => {
        console.log(e);
      });
  };



  const refreshList = () => {
    retrieveTasks();
    setCurrentTask(null);
    setCurrentIndex(-1);
  };

  const setActiveTask = (task, index) => {
    setCurrentTask(task);
    setCurrentIndex(index);
  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };
  const updateTask = () => {
    let formData = new FormData(); 

    formData.append('message', currentTask.message);  
    formData.append('due_date', currentTask.due_date);
    formData.append('priority', currentTask.priority);  
    formData.append('assigned_to', currentTask.assigned_to);
    formData.append('taskid', currentTask.id);
    const config = {     
        headers: { 
          'content-type': 'multipart/form-data' ,
         'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
        }
    }
    console.log(config,formData)
    TaskService.update(config,formData)
      .then(response => {
        console.log("update",response.data.status);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTask = ()=> {
    let formData = new FormData();
    formData.append('taskid', currentTask.id);
    const config = {     
      headers: { 
        'content-type': 'multipart/form-data' ,
        'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
      }
    }


    axios.post(`https://devza.com/tests/tasks/delete`,formData,config)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
        navigate("/add"); 
      })  

  };

 
  return (
    <div className="list row border p-5 bg-white  max-w-3xl">
      <div className="col-md-3 offset-md-9 mb-4">  
          <Link to="/add" className="btn btn-sm btn-success">Add New Task</Link>
      </div>
       
      <div className="col-md-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Task"       
            onChange={(event) => {
              setList(event.target.value);
            }}
          />        
        </div>
      </div>
      <div className="col-md-6">
          <h4>Tasks List</h4>

          <ul className="list-group mt-3">
            {tasks && tasks.filter((tasks) => {
                      if(list === ""){
                          return tasks;
                      }
                      else if(tasks.message.toLowerCase()
                              .includes(list.toLowerCase())){
                          return tasks
                      }

                  }).map((tasks, index) => (
                <li className={
                    "list-group-item mt-2 border" + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTask(tasks, index)}
                  key={index}
                >
                      <div class="row">
                        <div class="col-md-3">Task</div>
                        <div class="col-md-9">   : {tasks.message} </div>
                      </div>
                      <div class="row">
                        <div class="col-md-3 text-nowrap">Last Day</div>
                        <div class="col-md-9">   : {tasks.due_date} </div>
                      </div>
                      <div class="row">
                        <div class="col-md-3">Priority</div>
                        <div class="col-md-9">   : {tasks.priority}  </div>
                      </div>
                      <div class="row">
                        <div class="col-md-3">Assigned</div>
                        <div class="col-md-9">   : {tasks.assigned_to} </div>
                      </div>
                  
                </li>
              ))} 
          </ul>

        </div>
      <div className="col-md-6">
        {currentTask ? (
           <div className="edit-form">
                  <h4>Task Edit</h4>
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
                    <div className="form-group mt-3">
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
                    <div className="form-group mt-3">
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
                    <div className="form-group mt-3">
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
                
 
                  <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={deleteTask}
                  >
                    Remove 
                  </button>
                  <button
                    type="submit"
                    className="m-3 btn btn-sm btn-success"
                    onClick={updateTask}
                  >
                    Update
                  </button>
                  <p>{message}</p>
            </div>
        ) : (
            <div className="mt-3">
              <br />
              <p>Please click for Edit Task...</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Taskslist;
