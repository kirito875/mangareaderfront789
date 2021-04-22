import axios from "axios";
import React, { useState,useEffect } from 'react';
import './App.css';
import {useHistory} from "react-router-dom";
import dummy from "./dummycover.jpg"
function Table(){
    let x;
    const history=useHistory();
    const[Arra,setArra]=useState([]);
    let[sum,setSum]=useState(0);
    const [isLoadings, setLoadings] = useState(true);
    useEffect(async function get(){
      let response = await axios.get('https://mangareader789.herokuapp.com/api/addcart')
       x= response.data.standup
       setArra(x);
      setLoadings(false);
    });
   
   function removefromcart(ele,key){  
    axios({
        method: 'delete',
        url: 'https://mangareader789.herokuapp.com/api/deletecartitem/'+ele._id,
      })
      
    
      alert("item will be removed")
      history.push("/api")
      
}
if(isLoadings){
  return <div>Loading...</div>; 
}
function cartlocal(){
  history.push("/addresspage")
  localStorage.setItem("usercart",JSON.stringify(filteredcontent))
}

let filteredcontent = Arra.filter((ele)=>{ return ele.username.indexOf(JSON.parse(localStorage.getItem("username")))!==-1})
filteredcontent.map((ele)=>(sum=sum+(+ele.bookprice)))

    return(
     <div className="container">
         <p className="display-2">MyCart</p>
         
             <div className="card mb-2 p-2" style={{width:"100%",height:"100%"}}>

           {(filteredcontent.length==0)?<div className="display-3 mb-1">cart is empty!!!..add something to buy something</div>:<div></div> }   

      <div className="row row-cols-1 row-cols-md-4">
         {
            
            filteredcontent.map((ele,index)=>(
                <div className="col mt-2 mb-2" style={{width:"200px",height:"300px"}}>
                <div className="card border-0 shadow" style={{width:"150px",height:"300px"}}>
                <span className="card-header bg-white border-0" style={{color:"red",textAlign:"right"}} onClick={()=>removefromcart(ele,index)} ><i className="fas fa-times" ></i></span>   
                
                 <img src={ele.img} className="" alt="..."  style={{width:"100px",height:"150px",display:"block",marginLeft:"auto",marginRight:"auto"}} />
                  <div className="card-body pt-1">
                
                 <p className="card-title" style={{fontSize:"10px"}}>{ele.bookname}</p>
                  <p className="card-text" style={{fontSize:"8px"}}>Author-{ele.author}</p>
                  <p className="card-text" style={{fontSize:"13px"}}>cost:${ele.bookprice}</p>
                  </div>
                </div>
               </div>
               
             ))
         }
     </div>

     <div className="card-footer bg-white border"><div className="display-4 float-end">Total:${sum}</div></div> 
              </div>
          
           
         {filteredcontent.length==0?(<button className="btn mb-2 disabled" style={{backgroundColor:"black",color:"white",width:"50%"}} onClick={cartlocal}><div className="display-6">checkout</div></button> ):(<button className="btn mb-2" style={{backgroundColor:"black",color:"white",width:"50%"}} onClick={cartlocal}><div className="display-6">checkout</div></button> )}
          
      
     </div>
    );
}
export default Table;