import React from 'react';
import './App.css';
import {Home} from './Home';
import {Korisnik} from './Korisnik';
import {Zivotinja} from './Zivotinja';
import {BrowserRouter, Switch, Route ,NavLink} from 'react-router-dom';

function Apptwo() {
  return (
    <BrowserRouter>
      <nav  class="mb-1 navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
  <ul class="navbar-nav">
  <a class="navbar-brand"> 
  Pet Rescue</a>
  <li class="nav-item">
    <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
    </li>
  <li class="nav-item">
    <NavLink className="nav-link" to="/korisnik">
              Korisnik
            </NavLink>
    </li>
    <li class="nav-item">
    <NavLink className="nav-link" to="/zivotinja">
              Životinja
            </NavLink>
    </li>
    

  </ul>
  </div>
  </nav>

      <Switch>
      <Route path='/home' component={Home}/>
      <Route path='/korisnik' component={Korisnik}/>
        <Route path='/zivotinja' component={Zivotinja}/>
        
      </Switch>
      
      </BrowserRouter>
    

  );
  
    
  }


export default Apptwo;