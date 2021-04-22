import './App.css';
import axios from "axios";
import React, { useState,useEffect } from 'react';
import dummy from "./dummycover.jpg"
function Home(){
    const[Arr,setArr]=useState([]);
    const [isLoading, setLoading] = useState(true);
    const[Searchkey,setSearchkey]=useState("");
    const[category,setCategory]=useState("");
    const[mod,setMod]=useState({});

    useEffect(async function get(){
      let response = await axios.get('https://mangareader789.herokuapp.com/api/standup')
      let x= response.data.standup
      
      for(let i=0;i<x.length;i++)
      {
          Arr[i]=x[i];
      }
      setLoading(false);
    });

    if(isLoading){
        return <div>Loading...</div>; 
    }
    
    function addCart(elem){
        if(!localStorage.getItem("token")){
            alert("please login")
        }
        else{
        axios({
        method:"post",
        url:"https://mangareader789.herokuapp.com/api/addcart",
        data:{
            bookname:elem.bookname,
            bookprice:elem.bookprice,
            author:elem.author,
            publisher:elem.publisher,
            shortdescrip:elem.shortdescrip,
            img:elem.img,
            username:localStorage.getItem("username")
        }
        });
    }
    }
   
    function selected(sel){
        setCategory(sel.target.value);
    }
    function searchitem(searched){
      setSearchkey(searched.target.value);
    }
    let selectedcontent = Arr.filter((ele)=>{return ele.category.indexOf(category)!==-1})
    let filteredcontent = selectedcontent.filter((ele)=>{ return ele.bookname.indexOf(Searchkey)!==-1})

    return(
    <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 sticky-top">
            <div className="container-fluid px-5"> <div className="input-group border-0 px-1">  <select className="input-group-text border-0" onChange={selected}>
               <option value="">All</option>  
              <option value="Action">Action</option>
              <option value="Horror">Horror</option>
              <option value="Psychological">Psychological</option>
             <option value="romance">romance</option>
             </select>
            <input class="form-control m-0 border-0" type="search" placeholder="Search" aria-label="Search" onChange={searchitem} style={{width:""}}/>
            <button class="btn btn-secondary border-0" type="submit"><i class="fas fa-search"></i></button></div>
           
          </div>
          
         
            
        </nav>
        {!Searchkey?<div></div>:<h6>You Have Searched For "{Searchkey}"</h6>}
       

        <h2 className="tm-main-title mt-2 mx-3">Welcome to our bookstore</h2> 
        <div className="container">  
       
        <marquee behavior="scroll" direction="left"><h2>These books are 50% off!!!</h2></marquee>
  
      <div className="row row-cols-1 row-cols-md-4">
         {
            
             filteredcontent.map((ele)=>(
                <div className="col mb-4" id="mmm">
                <div className="card border-0 " >
                 <img src={ele.img} className="imgee" alt="..." />
                  <div className="card-body">
                 <h5 className="card-title">{ele.bookname}</h5>
                  <p className="card-text">Author-{ele.author}<br/>Publisher-{ele.publisher}</p>
                  </div>
                  <div className="card-footer bg-white border-0"><button className="btn btn-info" onClick={()=>addCart(ele)} style={{color:"white"}}>Add to Cart</button></div>
                </div>
               
               </div>
               
             ))
         }

     </div>
     </div>
        
          
      
    </div>
    );
}
export default Home;