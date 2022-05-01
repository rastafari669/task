import React,{useState,useEffect} from 'react';
import {Link,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const EditTask = () => {
const navigate = useNavigate();

    const {id} = useParams();
    let now = new Date();
   
   let minDate = now.toISOString().substring(0,10);

    const [state, setState] = useState({
        task: '',
        status: '',
        dueDate: '',
        error_list:[]
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

    useEffect(() => {
        
        
        async function fetchMyTask() {
         const res = await axios.get(`http://127.0.0.1:8000/api/edit-task/${id}`);

         if(res.data.status === 200){
        setState({
            task: res.data.task.task,
            status: res.data.task.status === '1' ? true : false,
            dueDate: res.data.task.dueDate,
            error_list:[]
         })
       
       
         }
         else if(res.data.status === 404){
            swal({
                title: 'Warning!',
                text:res.data.message,
                icon:"warning",
                button: 'OK!'
    
            }); 
            navigate('/')
         }


         }
     
         fetchMyTask()
       },[id,navigate]);


    const updateTask = async (e) =>{
      e.preventDefault();

     
     const res = await axios.put(`http://127.0.0.1:8000/api/update-task/${id}`,state);

     if(res.data.status === 200){
        swal({
            title: 'Updated!',
            text:res.data.message,
            icon:"success",
            button: 'OK!'

        });

       

         navigate("/", { replace: true });
        
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
        <h4>Edit Task
            <Link to={'/'} className='btn btn-primary btn-sm float-end'>Back</Link>
        </h4>
    </div>
    <div className='card-body'>
    <form onSubmit={updateTask}>
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
  checked={state.status}
  
  
  />
  <label className="form-check-label">{state.status  ? 'Completed' : 'Not Completed'}</label>
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
          <span className='text-danger'>{ state.error_list.dueDate }</span>
        </div>

        <div className='form-group mb-3'>
          <button 
         
          type='submit' 
          className='btn btn-primary' id='updatebtn'>Update Task</button>
        </div>
    </form>
    </div>
    </div>
    
    </div>
            </div>
    
        </div>
      )
}

export default EditTask;