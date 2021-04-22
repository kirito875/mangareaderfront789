import axios from "axios";
import React, { useState,useEffect } from 'react';
function Register(){
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
  function mySubmitHandler(event){
    event.preventDefault();
    
    axios({
      method: 'post',
      url: 'https://mangareader789.herokuapp.com/api/newuser',
      data: {
       "username":username,
       "email":email,
       "password":password
      }
    }).then((response)=>{alert(response.data.message)})

  }   

    return(
        <div className="p-5" style={{backgroundColor:"black",width:"100%",height:"48em"}}>  <div class="card p-3 shadow" style={{width: "500px",
        margin: "0 auto",
        padding: "30px 0",}}>
<form class="form-horizontal" onSubmit={mySubmitHandler}>
      <div class="row mt-3">
        <div class="col">
            <h2>Sign Up</h2>
        </div>	
      </div>			
    <div class="form-group row mt-5">
        <label class="col-form-label col-4">Username</label>
        <div class="col-8">
            <input type="text" class="form-control" name="username" onChange={e=>setUsername(e.target.value)} required="required"/>
        </div>        	
    </div>
    <div class="form-group row mt-3">
        <label class="col-form-label col-4">Email Address</label>
        <div class="col-8">
            <input type="email" class="form-control" name="email" onChange={e=>setEmail(e.target.value)} required="required"/>
        </div>        	
    </div>
    <div class="form-group row mt-3">
        <label class="col-form-label col-4">Password</label>
        <div class="col-8">
            <input type="password" class="form-control" name="password" onChange={e=>setPassword(e.target.value)} required="required"/>
            {password}
        </div>        	
    </div>
    <div class="form-group row mt-3">
        <label class="col-form-label col-4">Confirm Password</label>
        <div class="col-8">
            <input type="password" class="form-control" name="confirm_password" required="required"/>
        </div>        	
    </div>
    <div class="form-group row mt-3">
        <div class="col">
            <p><label class="form-check-label"><input type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a>.</label></p>
            <button type="submit" class="btn btn-primary btn-lg mt-3" >Sign Up</button>
        </div>  
    </div>		      
</form>
<div class="text-center mt-5">Already have an account? <a href="/login">Login here</a></div>
</div></div>
  
    );
}
export default Register;