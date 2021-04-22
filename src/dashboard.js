import {useHistory} from "react-router-dom";
import { store } from './store.js';
import axios from "axios";
import React, { useContext,useState,useEffect } from 'react';
function Dashboard(){
    const globalState = useContext(store);
    let history=new useHistory();
    let x=localStorage.getItem("userdata")
    let y=localStorage.getItem("token")
    const [isLoading, setLoading] = useState(true);
    const[isLoadingadd,setLoadingadd]=useState(true)
    const[orders,setOrders]=useState([])
    const[alladdress,setAlladdress]=useState([])
    const[allcards,setAllcards]=useState([])
    useEffect(async function get(){
        let response = await axios.get('https://mangareader789.herokuapp.com/api/ordersget')
      

       setOrders(response.data.standup)
     
        setLoading(false);
      });
  
      if(isLoading){
          return <div>Loading...</div>; 
      }
      function extractaddress(){
        axios.get('https://mangareader789.herokuapp.com/api/address')
        .then(function (response) {
          // handle success
         
        setAlladdress(response.data.standup)
        setLoadingadd(false)
       
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      }
      function extractcards(){
        axios.get('https://mangareader789.herokuapp.com/api/cards')
        .then(function (response) {
          // handle success
         
        setAllcards(response.data.standup)
        setLoadingadd(false)
       
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      }
    function logout(){
        localStorage.clear();
        const { dispatch } = globalState;
    dispatch({ type: 'action description',payload:["login","register","Adminlogin"]})
        history.push("/login");
    }
    let filteredcontent = orders.filter((ele)=>{ return ele.username.indexOf(JSON.parse(localStorage.getItem("username")))!==-1})
    let filteredcontentadd=alladdress.filter((ele)=>{return ele.username.indexOf(JSON.parse(localStorage.getItem("username")))!==-1})
    let filteredcontentcards=allcards.filter((ele)=>{return ele.username.indexOf(JSON.parse(localStorage.getItem("username")))!==-1})
    return(
    <div className="container-fluid">
        <div className="card w-50 mx-auto mt-3" style={{height:"100%"}}> 
        <div className="card-body">
            <div className="row">
                <div className="col-5">
                <img src="https://img.pngio.com/men-profile-icon-png-image-free-download-searchpngcom-profile-of-a-person-png-715_657.png" alt="Men Profile Icon PNG Image Free Download searchpng.com" style={{width:"240px",height:"261px"}}/>
                {!y?<h1>hey user login for you see the dashboard</h1>:<h1>hey {JSON.parse(x).username}</h1>}
                </div>
                <div className="col-7">
                <div class="accordion" id="accordionExample">
                < div class="accordion-item">
                     <h2 class="accordion-header" id="flush-headingOne">
                     <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          <b>Orders placed</b>
                            </button>
                     </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                         <div class="accordion-body">
                             {filteredcontent.length==0?<div>no orders yet</div>:<div></div>}
                         <table className="table">
                                   <thead>
                                             <tr>
                                      <td>order.no</td>
                                      <td>books</td>
                                       <td>deilivery status</td>
                                       </tr>
                                     </thead>
                                  <tbody>
                                  {
                                     filteredcontent.map((ele,key)=>(<tr>
                                     <td><div>{key+1}</div></td> 
                                    <td>{ele.order.map((el)=>(<div>{el.bookname}</div>))}</td> 
                                     <td>delivered</td>
                                        </tr>))
                                    }
                                  </tbody>
                                 </table> 
                        </div>
                    </div>
                   </div>
                   < div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                       <button class="accordion-button collapsed" type="button"  data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={extractaddress}>
                         <b> Saved Addresses</b>  
                         </button>
                       </h2>
                         <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                             {filteredcontentadd.length==0?<div>no saved address</div>:<div></div>}
                        {isLoadingadd==true?(<div className="accordian-body"><div>Loading...</div></div>):(  <div class="accordion-body">
                         {
                                filteredcontentadd.map((ele,key)=>(
                                    <div className="card w-100 p-2" style={{height:"60px"}}>
                                    <div className="form-check my-auto">
                                    <input type="radio" className="form-check-input" id={key} name="addresses"/>
                                    <label for={key} className="form-check-label">{ele.address}, {ele.city}, {ele.state}, {ele.country}-{ele.pincode}</label>
                                    </div>
                                   
                                    
                                </div>
                                ))
                            
                         }
                         </div>)}
                        
                           </div>
                    </div>
                    < div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                       <button class="accordion-button collapsed" type="button"  data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={extractcards}>
                            <b>Saved cards</b>
                         </button>
                       </h2>
                         <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                             {filteredcontentcards.length==0?<div>no cards saved</div>:<div></div>}
                        {isLoadingadd==true?(<div className="accordian-body"><div>Loading...</div></div>):(  <div class="accordion-body">
                         {
                                filteredcontentcards.map((ele,key)=>(
                                    <div className="card w-100 p-2" style={{height:"60px"}}>
                                    <div className="form-check my-auto">
                                  
                                              <label for={key} className="form-check-label"><b>{ele.cardowner}</b></label>
                                              <p>{ele.cardnumber[0]}{ele.cardnumber[1]}{ele.cardnumber[2]}{ele.cardnumber[3]}-XXXX-XXXX-XXXX <b>{ele.cardtype}</b></p>
                                            
                                    </div>
                                   
                                    
                                </div>
                                ))
                            
                         }
                         </div>)}
                        
                           </div>
                    </div>



                </div>
                  
            </div>
            </div>
       </div>
        <div className="card-footer"> <button className="btn btn-danger float-end" onClick={logout}>log out</button></div>
        </div>
      
        
    </div>
   
    )
}
export default Dashboard;