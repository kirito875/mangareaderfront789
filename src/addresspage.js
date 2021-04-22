import axios from "axios";
import React, { useState,useEffect,useContext} from 'react';
import {useHistory} from "react-router-dom";
function Addresspage(){
    let history =useHistory();
    const[address,setAddress]=useState("")
    const[city,setCity]=useState("")
    const[pincode,setPincode]=useState("")
    const[state,setStateaddress]=useState("")
    const[country,setCountry]=useState("")
    const[isLoading,setLoading]=useState("")
    const[alladdress,setAlladdress]=useState([])
    useEffect(async function get(){
        let response = await axios.get('https://mangareader789.herokuapp.com/api/address')
     
        setAlladdress(response.data.standup)
        setLoading(false);
      });
  
      if(isLoading){
          return <div>Loading...</div>; 
      }

    function mySubmitHandler(event){
        event.preventDefault();
    
        axios({
          method: 'post',
          url: 'https://mangareader789.herokuapp.com/api/newaddress',
          data: {
           "username":JSON.parse(localStorage.getItem("username")),
           "address":address,
           "city":city,
           "pincode":pincode,
           "state":state,
           "country":country
          
          }
        }).then((response)=>{alert("address added")})
      

        
    }
    let filteredcontent = alladdress.filter((ele)=>{ return ele.username.indexOf(JSON.parse(localStorage.getItem("username")))!==-1})
    return(<div className="container">
        <div className="card w-50 mx-auto bg-light mt-4" style={{height:"100%"}}>
            <div className="card-body">
                <h3>Delivery Address</h3>
                <h6>saved addresses</h6>
                {
                     filteredcontent.map((ele,key)=>(
                         <div className="card w-100 p-2" style={{height:"52px"}}>
                             <div className="form-check my-auto">
                             <input type="radio" className="form-check-input" id={key} name="addresses"/>
                             <label for={key} className="form-check-label">{ele.address}, {ele.city}, {ele.state}, {ele.country}-{ele.pincode}</label>
                             </div>
                            
                             
                         </div>
                     ))
                }
                  <div class="accordion" id="accordionExample">
                       <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                       <button class="accordion-button collapsed" type="button"  data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          Add New Address
                         </button>
                       </h2>
                         <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                          <div class="accordion-body">
                          <form onSubmit={mySubmitHandler}> 
                                 <label for="adr" className="float-start p-2"><i class="far fa-address-card"></i> Address</label>
                           <input type="text" id="adr" className="form-control" name="address" placeholder="eg: flatno:104, H.no, street" onChange={(e)=>setAddress(e.target.value)}/>
                         <label for="cty" className="float-start p-2"><i class="fas fa-city"></i> City</label>
                          <input type="text" id="cty" className="form-control" name="address" placeholder="eg: Hyderabad" onChange={(e)=>setCity(e.target.value)}/>
                          <div className="row">
                               <div className="col-4">
                                    <label for="pincode" className="float-start p-2"><i class="fas fa-map-marker-alt"></i> Pincode</label>
                               <input type="text" id="pincode" className="form-control" name="address" placeholder="eg: 506001" onChange={(e)=>setPincode(e.target.value)}/>
                           </div>
                              <div className="col-4">
                                   <label for="state" className="float-start p-2"> State</label>
                               <input type="text" id="state" className="form-control" name="address" placeholder="eg: Telangana" onChange={(e)=>setStateaddress(e.target.value)}/>
                                        </div>
                                 <div className="col-4">
                            <label for="country" className="float-start p-2"> Country</label>
                                <input type="text" id="country" className="form-control" name="address" placeholder="eg: India" onChange={(e)=>setCountry(e.target.value)}/>
                                 </div>
                            </div>
        
                          <button type="submit" className="btn btn-success w-100 mt-3">Add Address</button>
                        </form>
                         </div>
                           </div>
                    </div>
                </div>
                
           
            </div>
            <div className="footer p-3"> <button className="btn btn-primary w-90" onClick={()=>history.push("/pay")}>proceed to payment</button></div>
           
        </div>
     
          
    </div>)
  }
  export default Addresspage;