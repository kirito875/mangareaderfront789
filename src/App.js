import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Home from "./Home"
import Contact from "./Contact"
import Login from "./Login"
import Adminlogin from "./adminlogin"
import Register from "./Register"
import Table from "./Table"
import Payment from "./payment"
import Dashboard from "./dashboard"
import Thankyou from "./thankyou"
import Admindashboard from "./admindashboard"
import Addresspage from "./addresspage"
import { store } from './store.js';
import React, { useState,useEffect,useContext } from 'react';

function App() {
  const globalState = useContext(store);
    localStorage.setItem("status","Login");
    const[x,setX]=useState("");
    const { dispatch } = globalState;
    //dispatch({ type: 'action description',payload:"abhivarma"})
    console.log(globalState.state)
    return (
      <div className="App">
 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
            <Link to={'/'} className="navbar-brand" style={{color:'black'}} href="#">M@ng@re@der</Link>
           
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <ul className="navbar-nav">
                <li><NavLink exact to={'/'} className="nav-link" activeStyle={{ fontWeight: "bold",color: "black"}}> Home </NavLink></li>
                <li><NavLink to={'/contact'} className="nav-link" activeStyle={{ fontWeight: "bold",color: "black"}}>Contact us</NavLink></li>
                {(globalState.state[1]=="register")&&(!localStorage.getItem("token"))?(<li><NavLink to={'/register'} className="nav-link" activeStyle={{ fontWeight: "bold",color: "black"}}>{globalState.state[1]}</NavLink></li>):<div></div>}
               
              
                <li><NavLink to={'/api'} className="nav-link" activeStyle={{ fontWeight: "bold",color: "black"}}>MyCart</NavLink></li>
           
              </ul>
            
            
   
  
            </div>
            <div className="d-flex float-right">
              <li className="list-unstyled"><NavLink to={'/login'} className="float-end mx-2">{globalState.state[0]}</NavLink></li>
               <li className="list-unstyled"><NavLink to={'/admin'} className="ml-1"> {globalState.state[2]}</NavLink></li>
              </div>
            
          </div>
        </nav>
        <Switch>
              <Route path="/addresspage" component={Addresspage}/>
              <Route path="/thankyou" component={Thankyou}/>
              <Route path="/admindashboard" component={Admindashboard}/>
              <Route path="/admin" component={Adminlogin}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path='/pay' component={Payment} />
              <Route path='/contact' component={Contact} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route path='/api' component={Table} />
              <Route  path='/' component={Home} />
            
        </Switch>
 
    
      </div>
    );
  
}



export default App;
