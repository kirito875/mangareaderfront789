import axios from "axios";
import React, { useState,useEffect,useContext} from 'react';
import {useHistory} from "react-router-dom";
import { store } from './store.js';

function Login(){
  const globalState = useContext(store);
    let history =useHistory();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    let x=localStorage.getItem("userdata")
   function mySubmitHandler(event){
    event.preventDefault();
    
    axios({
      method: 'post',
      url: 'https://mangareader789.herokuapp.com/api/verifyuser',
      data: {
       "email":email,
       "password":password
      }
    }).then(function(response){
        alert("login success")
        if(response.data.message=="login success mama")
        {
         
  
          const { dispatch } = globalState;
          dispatch({ type: 'action description',payload:["hey, "+response.data.userobj.username,"",""]})
          console.log(globalState.state)
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("userdata",JSON.stringify(response.data.userobj))
          localStorage.setItem("username",JSON.stringify(response.data.userobj.username))
          localStorage.setItem("status","dashboard")
          history.push("/dashboard")
        }
    
    })
    
    
   }
   function logout(){
    localStorage.clear();
    const { dispatch } = globalState;
    dispatch({ type: 'action description',payload:["login","register","Adminlogin"]})
    history.push("/login");

   }
   function dasboard(){
     let tk=localStorage.getItem("token");
     if(!tk){return(<div className="p-5" style={{backgroundColor:"black",width:"100%",height:"48em"}}>  <div class="card p-3 shadow" style={{width: "500px",
     margin: "0 auto",
     padding: "30px 0",height:"350px"}}>
   <form class="form-horizontal" onSubmit={mySubmitHandler}>
   <div class="row mt-3">
     <div class="col">
         <h2>log in</h2>
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
       {history.push("/dashboard")}
      </div>
     
      )
   }
  
   }


    return(
       <div>{dasboard()}</div>
    );
}
export default Login;