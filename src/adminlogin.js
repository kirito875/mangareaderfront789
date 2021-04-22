import axios from "axios";
import React, { useState,useEffect,useContext} from 'react';
import {useHistory} from "react-router-dom";
import { store } from './store.js';

function Adminlogin(){
  const globalState = useContext(store);
    let history =useHistory();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    let x=localStorage.getItem("admindata")
   function mySubmitHandler(event){
    event.preventDefault();
    
    axios({
      method: 'post',
      url: 'https://mangareader789.herokuapp.com/api/verifyadmin',
      data: {
       "email":email,
       "password":password
      }
    }).then(function(response){
        alert(response.data.message)
        if(response.data.message=="login success mama")
        {
         
  
         const { dispatch } = globalState;
          dispatch({ type: 'action description',payload:["","","hey admin"]})
          console.log(globalState.state)
          localStorage.setItem("admintoken",response.data.token)
          localStorage.setItem("admindata",JSON.stringify(response.data.userobj))
          localStorage.setItem("status","dashboard")
         history.push("/admindashboard")
        }
    
    })
    
    
   }
   function logout(){
    localStorage.clear();
    const { dispatch } = globalState;
    dispatch({ type: 'action description',payload:"login"})
    history.push("/login");

   }
   function dasboard(){
     let tk=localStorage.getItem("admintoken");
     if(!tk){return(<div className="p-5" style={{backgroundColor:"black",width:"100%",height:"48em"}}>  <div class="card p-3 shadow" style={{width: "500px",
     margin: "0 auto",
     padding: "30px 0",height:"350px"}}>
   <form class="form-horizontal" onSubmit={mySubmitHandler}>
   <div class="row mt-3">
     <div class="col">
         <h2>Admin login</h2>
     </div>	
   </div>			
   
   <div class="form-group row mt-3">
     <label class="col-form-label col-4">Email Address</label>
     <div class="col-8">
         <input type="email" class="form-control" name="email" onChange={e=>setEmail(e.target.value)}  required="required"/>
     </div>        	
   </div>
   <div class="form-group row mt-3">
     <label class="col-form-label col-4">Password</label>
     <div class="col-8">
         <input type="password" class="form-control" name="password" onChange={e=>setPassword(e.target.value)} required="required"/>
      
     </div>        	
   </div>
   
   <div class="form-group row mt-3">
     <div class="col">
       
         <button type="submit" class="btn btn-primary btn-lg mt-3" >log in</button>
     </div>  
   </div>		      
   </form>
   
   </div>
   </div>)}
   else{
    return(
      <div>
         {history.push("/admindashboard")}
      </div>
     
      )
   }
  
   }


    return(
       <div>{dasboard()}</div>
    );
}
export default Adminlogin;
    