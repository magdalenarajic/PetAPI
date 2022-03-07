import React from "react";
import './App.css';
import {Home} from './Home';
import Appone from './Admin';
import {BrowserRouter, Switch, Route ,NavLink} from 'react-router-dom';

function App() {
  
  return (
    
    <BrowserRouter>
      <nav  class="mb-1 navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
  <ul class="navbar-nav">
  <a class="navbar-brand"> 
  Pet Rescue</a>
  <li>
    <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
    </li>
    <li>
    <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
    </li>
    

  </ul>
  </div>
</nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/admin' component={Appone}/>
        
        
      </Switch>
      
      </BrowserRouter>
   

    
    

  );


  
    
  }


export default App;