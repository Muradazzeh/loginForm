import React from 'react'
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom";
import Login from './components/login';
import Register from './components/register';


function App() {
  return (
<>
<Router>
    <div className="App">
    <h1>welcome to my login form </h1>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Register/>}/>
    
    </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
