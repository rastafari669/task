import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";






const AddTask = () => {
  const navigate = useNavigate();

    let now = new Date();
   
   let minDate = now.toISOString().substring(0,10);

    const [state, setState] = useState({
        task: '',
        status: false,
        dueDate: '',
        error_list: []
        
    });
   

    const handleInput = (e) =>{
        
        if(e.target.name === 'status'){
            setState({
                ...state,
                [e.target.name]: e.target.checked
            })
        }else{
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
      
    
    }

    const SaveTask = async (e) =>{
      e.preventDefault();
     const res = await axios.post('http://127.0.0.1:8000/api/add-task',state);

     if(res.data.status === 200){
        //  console.log(res.data.message);
        swal({
            title: 'Success!',
            text:res.data.message,
            icon:"success",
            button: 'OK!'

        });
        navigate("/", { replace: true });
         setState({
            task: '',
            status: '',
            dueDate: '',
            error_list: []
         })
     }else{
       setState({
           ...state,
           error_list: res.data.validation_err
       })
     }
     
    
    }

    return (
        <div className='container'>
            <div className='row'>
    <div className='col-md-12'>
    <div className='card'>
    <div className='card-header'>
        <h4>Add Task
            <Link to={'/'} className='btn btn-primary btn-sm float-end'>Back</Link>
        </h4>
    </div>
    <div className='card-body'>
    <form onSubmit={SaveTask}>
        <div className='form-group mb-3'>
          <label style={{fontWeight: 'bold'}}>Task</label>
          <input 
          type="text" 
          name="task"
          onChange={handleInput}
          value={state.task} 
          className='form-control' />
          <span className='text-danger'>{ state.error_list.task }</span>
        </div>

        <div className='form-group mb-3'>
          <label style={{fontWeight: 'bold'}}>Status</label>
          <div className="form-check form-switch">
  <input 
  className="form-check-input" 
  type="checkbox" 
  name='status'
  onChange={handleInput}
  
  />
  
  <label className="form-check-label">{state.status ? 'Completed' : 'Not Completed'}</label>

 
</div>
         
        </div>

        <div className='form-group mb-3'>
          <label style={{fontWeight: 'bold'}}>Due Date</label>
          <input 
          type="date" 
          name="dueDate"
          min={minDate}
          onChange={handleInput}
          value={state.dueDate} 
          className='form-control' />

          <span className='text-danger'>{state.error_list.dueDate}</span>
        </div>

        <div className='form-group mb-3'>
          <button type='submit' className='btn btn-primary'>Save Task</button>
        </div>
    </form>
    </div>
    </div>
    
    </div>
            </div>
    
        </div>
      )
}

export default AddTask;