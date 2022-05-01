
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import AddTask from './pages/AddTask';
import Tasks from './pages/Tasks';
import EditTask from './pages/EditTasks';


function App() {
  return (
   <Router>
<Routes>
<Route exact path="/" element={<Tasks/>}/>
<Route  path="/add-task" element={<AddTask/>}/>
<Route  path="/edit-task/:id" element={<EditTask/>}/>
</Routes>
   </Router>
  );
}

export default App;
