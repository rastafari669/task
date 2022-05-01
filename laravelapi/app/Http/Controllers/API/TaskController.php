<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Task;

class TaskController extends Controller
{

    public function index()
    {
        $tasks = Task::all();
       
            return response()->json([
                'status'=> 200,
                'tasks'=>$tasks,
            ]);
        }
          
        
       
    

    public function store(Request $request){

        $validator = Validator::make($request->all(),[
            'task'=>'required',
            
            'dueDate'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_err'=> $validator->messages(),
                
            ]);
        }else{
            $task = new Task;
            $task -> task = $request->input('task');
            $task -> status = $request->input('status');
            $task -> dueDate = $request->input('dueDate');
            $task->save();
    
            return response()->json([
                'status'=>200,
                'message'=>'Task Added Succesfully'
            ]);
        }
       
    }

    public function edit($id){

        $task = Task::find($id);
       if($task){
        return response()->json([
            'status'=>200,
            'task'=> $task
        ]);
       }else{
        return response()->json([
            'status'=> 404,
            'message'=>'No Task ID found',
        ]);
       }
       
    }

    public function update(Request $request,$id){

        $validator = Validator::make($request->all(),[
            'task'=>'required',
            
            'dueDate'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'validation_err'=> $validator->messages(),
                
            ]);
        }else{
            $task = Task::find($id);
            $task -> task = $request->input('task');
            $task -> status = $request->input('status');
            $task -> dueDate = $request->input('dueDate');
            $task->update();
    
            return response()->json([
                'status'=>200,
                'message'=>'Task Updated Succesfully'
            ]);
        }
       
    }

    public function delete($id){

        $task = Task::find($id);
        $task->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Task Deleted Succesfully'
        ]);

    }

   

    public function searchDate($date)
    {
      $tasks = Task::where('dueDate','like','%'.$date.'%')->get();

      return response()->json([
        'status'=>200,
        'tasks'=>$tasks,
        
    ]);
    }

    public function searchStatus($status)
    {
      $tasks = Task::where('status','like','%'.$status.'%')->get();

      return response()->json([
        'status'=>200,
        'tasks'=>$tasks,
        
    ]);
    }
}
