import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';


const Tasks = () => {

  let now = new Date();
  let minDate = now.toISOString().substring(0,10);

  const [tasks, setTasks] = useState({
    tasks: [],
    loading: true,
  });
  
  const [reload, setReload] = useState(false);
  
 
  useEffect(() => {
   
   async function fetchMyAPI() {
      const res = await axios.get('http://127.0.0.1:8000/api/tasks');
      

      if(res.data.status === 200){
        setTasks({
          tasks: res.data.tasks,
          loading: false,
        });
      }
    }
    setReload(false)

    fetchMyAPI()
  },[reload]);



  const handleInput = async (e) =>{
        
    if(e.target.name === 'status'){
     
     if(e.target.checked){
      const res = await axios.get(`http://127.0.0.1:8000/api/search-status/1`);
      setTasks({
        ...tasks,
        tasks:res.data.tasks
      });
     }else if(!e.target.checked){
      const res = await axios.get(`http://127.0.0.1:8000/api/search-status/0`);
      setTasks({
        ...tasks,
        tasks:res.data.tasks
      });
     }
    }else{
      const res = await axios.get(`http://127.0.0.1:8000/api/search-date/${e.target.value}`);

      
      setTasks({
        ...tasks,
        tasks:res.data.tasks
      })
    }
  }


 const checkDisable = (item) =>{
  let now = new Date();
   
  let newDueDate = new Date(item.dueDate)

  var Difference_In_Time = newDueDate.getTime() - now.getTime();
        
 
  var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)) ;
 
  if(Difference_In_Days < 6){
  
    return true;
   
  }else{
    return false;
  }
    
 }

 const sortByDate = () =>{
  const sortedTasksByDate = tasks.tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)).reverse();
  setTasks({
    ...tasks,
    tasks: sortedTasksByDate
  })
}

const sortByStatus = () =>{
const sortedTasksByStatus =  tasks.tasks.sort((a, b) => a.status - b.status).reverse();

setTasks({
  ...tasks,
  tasks: sortedTasksByStatus
})
}

const sortByTaskName = () =>{
 const sortedByTaskName = tasks.tasks.sort((a, b) => a.task.localeCompare(b.task))

 setTasks({
  ...tasks,
  tasks: sortedByTaskName
})
}

const deleteTask = async (e,id) =>{

  const thidClickFunda = e.currentTarget;
  thidClickFunda.innerText ='Deleting...';

  const res = await axios.delete(`http://127.0.0.1:8000/api/delete-task/${id}`);

  if(res.data.status === 200){
    thidClickFunda.closest('tr').remove();

    swal({
      title: 'Deleted!',
      text:res.data.message,
      icon:"success",
      button: 'OK!'

  });
}
}


const resetTable = () =>{
  setReload(true)
}




  let task_HTML_TABLE ='';

  if(tasks.loading){
    task_HTML_TABLE = <tr><td colSpan="7"><h2>Loading...</h2></td></tr>;
  }else{
    task_HTML_TABLE = tasks.tasks.map((item) =>{
      return (
        <tr key={item.id}>
          <td >
            {item.id}
          </td>
          <td >
            {item.task}
          </td>
          <td style={item.status === '1' ? {color: 'green', fontWeight: 'bold'} : {color: 'red'}}>
           {item.status === '1' ? 'Completed': 'Not Completed'}
          </td>
          <td >
            {item.dueDate}
          </td>
          <td  >
            <Link to={`edit-task/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
          </td>
          <td  >
          <button 
          onClick={(e) => deleteTask(e,item.id)}
          disabled={checkDisable(item)} type='button' className='btn btn-danger btn-sm'>Delete</button>
          </td>
        </tr>
      )
    })
  }

  

     
    

  return (
    <div className='container'>
        <div className='row'>
<div className='col-md-12'>
<div className='card'>
<div className='card-header'>
    <h4>Task Data
        <Link to={'add-task'} className='btn btn-primary btn-sm float-end'>Add Task+</Link>
        <button onClick={resetTable} className='btn btn-success btn-sm float-end mx-4' >Reset</button>
    </h4>
</div>
<div className='card-body'>
  
  <input 
  type="date" 
  min={minDate}
  name="dueDate"
  onChange={handleInput}
  className='form-control' />
  <label style={{fontWeight:'bold'}}>Search tasks by date</label>
<br />
<br />
  <div className="form-check form-switch">
  <input 
  className="form-check-input" 
  type="checkbox" 
  name='status'
  onChange={handleInput}
  
  />
  </div>
  <label style={{fontWeight:'bold'}} className="form-check-label">Search tasks by status</label>
  

<br />
<br />

  <table width="100%" className='table table-bordered table-striped'>
<thead>
  <tr>
    <th>ID#</th>
    <th style={{cursor:'pointer'}} onClick={() => sortByTaskName()}>Task</th>
    <th style={{cursor:'pointer'}} onClick={() => sortByStatus()} >Status</th>
    <th style={{cursor:'pointer'}} onClick={() =>sortByDate()}>DueDate</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
</thead>
<tbody>
{task_HTML_TABLE}
</tbody>
  </table>

</div>
</div>

</div>
        </div>

    </div>
  )
}

export default Tasks;