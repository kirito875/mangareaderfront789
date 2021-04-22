import {useHistory} from "react-router-dom";
import { store } from './store.js';
import { useState,useEffect } from 'react';
import axios from "axios";

import React, { useContext } from 'react';
function Admindashboard(){
    const globalState = useContext(store);
    let history=new useHistory();
    let x=localStorage.getItem("admindata")
    let y=localStorage.getItem("admintoken")
    const[Arr,setArr]=useState([]);
    const [isLoading, setLoading] = useState(true);
    const[Searchkey,setSearchkey]=useState("");
    const[bookname,setBookname]=useState("")
    const[bookprice,setBookprice]=useState("")
    const[author,setAuthor]=useState("")
    const[publisher,setPublisher]=useState("")
    const[shortdescrip,setShortdescrip]=useState("")
    const[category,setCategory]=useState("")
    const[img,setImg]=useState("")
    const[rating,setRating]=useState("")

    useEffect(async function get(){
      let response = await axios.get('https://mangareader789.herokuapp.com/api/standup')
      let x= response.data.standup
      setArr(x);
      setLoading(false);
    });

    if(isLoading){
        return <div>Loading...</div>; 
    }
    function removefromstore(ele,key){  
      axios({
          method: 'delete',
          url: 'https://mangareader789.herokuapp.com/api/deleteitem/'+ele._id,
        })
       let users;
       users=[...Arr];
        users.splice(key,1);
        setArr(users);
        alert("book has been removed");
        
  }
  function bookadd(){
    axios({
      method:"post",
      url:"https://mangareader789.herokuapp.com/api/standup",
      data:{
        bookname:bookname,
        bookprice:bookprice,
        author:author,
        publisher:publisher,
        shortdescrip:shortdescrip,
        category:category,
        img:img,
        rating:rating,
          
      }
      }); 
      alert("book added")  
  }



    function logout(){
        localStorage.clear();
       const { dispatch } = globalState;
   dispatch({ type: 'action description',payload:["login","register","Adminlogin"]})
        history.push("/admin");
    }
    return(
      
    <div className="container">
       {!y?<h1>hey user login for you see the dashboard</h1>:<h1 style={{textAlign:"left"}}>hey {JSON.parse(x).username}</h1>}

        
         <h6 className="mb-2 mt-2">Menu</h6>
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        List of books
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <table className="table">
             <thead>
                 <tr>
                     <td>bookname</td>
                     <td>author</td>
                     <td>publisher</td>
                     <td>bookprice</td>
                     <td>removefromstore</td>
                 </tr>
             </thead>
             <tbody>
                {
                    Arr.map((ele,key)=>(<tr>
                        <td>{ele.bookname}</td>
                        <td>{ele.author}</td>
                        <td>{ele.publisher}</td>
                        <td>${ele.bookprice}</td>
                        <td><button className="btn btn-danger" onClick={()=>removefromstore(ele,key)}>remove</button></td>
                    </tr>))
                } 
             </tbody>
         </table>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Add a new book
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
       <div className="card mx-auto p-5" style={{width:"80%",height:"100%"}}>
           <div className="card-body">
           <form onSubmit={bookadd}>
                <div class="row mb-3">
                  <label for="input3" class="col-sm-2 col-form-label" ><h6>Bookname</h6></label>
                 <div class="col-sm-10">
                  <input type="text" class="form-control" id="input3" onChange={(e)=>setBookname(e.target.value)}/>
               </div>
               </div>
                 <div class="row mb-3">
                <label for="input4" class="col-sm-2 col-form-label" ><h6>Author</h6></label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" id="input4" onChange={(e)=>setAuthor(e.target.value)}/>
                 </div>
                 </div>
                 <div class="row mb-3">
                <label for="input4" class="col-sm-2 col-form-label" ><h6>Publisher</h6></label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" id="input4" onChange={(e)=>setPublisher(e.target.value)}/>
                 </div>
                 </div>
                 <div class="row mb-3">
                <label for="input4" class="col-sm-2 col-form-label" ><h6>Bookprice</h6></label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" id="input4" onChange={(e)=>setBookprice(e.target.value)}/>
                 </div>
                 </div>
                 <div class="row mb-3">
                <label for="input4" class="col-sm-2 col-form-label" ><h6>Description</h6></label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" id="input4" onChange={(e)=>setShortdescrip(e.target.value)}/>
                 </div>
                 </div>
                 <div class="row mb-3">
                <label for="input5" class="col-sm-2 col-form-label" ><h6>Category</h6></label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" id="input5" onChange={(e)=>setCategory(e.target.value)}/>
                 </div>
                 </div>
                 <div class="row mb-3">
                <label for="input5" class="col-sm-2 col-form-label" ><h6>img url</h6></label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" id="input5" onChange={(e)=>setImg(e.target.value)}/>
                 </div>
                 </div>
                 <div class="row mb-3">
                <label for="input5" class="col-sm-2 col-form-label" ><h6>rating</h6></label>
                <div class="col-sm-10">
                   <input type="text" class="form-control" id="input5" onChange={(e)=>setRating(e.target.value)}/>
                 </div>
                 </div>
           <button type="submit" class="btn btn-primary">ADD BOOK</button>
         </form>
           </div>

       </div>
      </div>
    </div>
  </div>
 < div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Number of views of website
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
       total number of visits today:{Math.floor(Math.random() * 100) + 1}
      </div>
    </div>
  </div>
  
</div>
       

         <button className="btn btn-danger float-end mt-3" onClick={logout}>log out</button>
    </div>
   
    )
}
export default Admindashboard;