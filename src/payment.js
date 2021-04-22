import React, { useState,useEffect } from 'react';
import "./pay.css"
import {useHistory} from "react-router-dom";
import axios from "axios";
function Payment(){
    
    const[Cre,setCre]=useState(false)
    const[Deb,setDeb]=useState(true)
    const[Gpay,setGpay]=useState(true)
    const[Inb,setInb]=useState(true)
    const[savedcards,setSavedcards]=useState([]);
    const[isLoading,setLoading]=useState(true);
    const[cardnumber,setCardnumber]=useState("")
    const[cardowner,setCardowner]=useState("")
    const[expirymonth,setExpirymonth]=useState(0)
    const[expiryyear,setExpiryyear]=useState(0)
    const[cardnumberdeb,setCardnumberdeb]=useState("")
    const[cardownerdeb,setCardownerdeb]=useState("")
    const[expirymonthdeb,setExpirymonthdeb]=useState(0)
    const[expiryyeardeb,setExpiryyeardeb]=useState(0)
    const[cardnumbercre,setCardnumbercre]=useState("")
    const[cardownercre,setCardownercre]=useState("")
    const[expirymonthcre,setExpirymonthcre]=useState(0)
    const[expiryyearcre,setExpiryyearcre]=useState(0)
    const[savedebcard,setSaveddebcard]=useState("");
    const[savecrecard,setSavecrecard]=useState("")
    let x="btn btn-light mx-auto nav-link active ml-1"
    let y
    let history =useHistory();
    useEffect(async function get(){
        let response = await axios.get('https://mangareader789.herokuapp.com/api/cards')
        setSavedcards(response.data.standup)
       
        setLoading(false);
      },[savedcards]);
  
      if(isLoading){
          return <div>Loading...</div>; 
      }
   function creditcard(){
     setCre(false)
     setDeb(true)
     setGpay(true)
     setInb(true)
     
   }
   function debitcard(){
    setCre(true)
    setDeb(false)
    setGpay(true)
    setInb(true)
  }
  function gpay(){
    setCre(true)
    setDeb(true)
    setGpay(false)
    setInb(true)
  }
  function intban(){
    setCre(true)
    setDeb(true)
    setGpay(true)
    setInb(false)
  }
  function carddisplay(ele){
    setCardnumber(ele.cardnumber)
    setCardowner(ele.cardowner)
    setExpirymonth(ele.expirymonth)
    setExpiryyear(ele.expiryyear)   
  }
  function carddisplaydeb(ele){
    setCardnumberdeb(ele.cardnumber)
    setCardownerdeb(ele.cardowner)
    setExpirymonthdeb(ele.expirymonth)
    setExpiryyeardeb(ele.expiryyear)
  }
  function cardnone(){
    setCardnumberdeb("")
    setCardownerdeb("")
    setExpirymonthdeb(0)
    setExpiryyeardeb(0)  
  }
  function thankyou(){
      if(savedebcard=="savecard"){
        axios({
            method:"post",
            url:"https://mangareader789.herokuapp.com/api/newcard",
            data:{
                cardnumber:cardnumberdeb,
                cardowner:cardownerdeb,
                expirymonth:expirymonthdeb,
                expiryyear:expiryyeardeb,
                cardtype:"debit card",
                username:JSON.parse(localStorage.getItem("username"))  
            } 
        })
      }
      if(savecrecard=="savecard"){
        axios({
            method:"post",
            url:"https://mangareader789.herokuapp.com/api/newcard",
            data:{
                cardnumber:cardnumbercre,
                cardowner:cardownercre,
                expirymonth:expirymonthcre,
                expiryyear:expiryyearcre,
                cardtype:"credit card",
                username:JSON.parse(localStorage.getItem("username"))  
            } 
        })
      }
      
      axios({
          method:"post",
          url:"https://mangareader789.herokuapp.com/api/order",
          data:{
              username:JSON.parse(localStorage.getItem("username")),
              order:JSON.parse(localStorage.getItem("usercart")),
          } 
      })
    axios({
        method: 'delete',
        url: 'https://mangareader789.herokuapp.com/api/selectedProductsAll/'+localStorage.getItem("username"),
      })
    history.push("/thankyou")
  }
  let filteredcontent = savedcards.filter((ele)=>{ return ele.username.indexOf(JSON.parse(localStorage.getItem("username")))!==-1})
  let filteredcontentdebcards =filteredcontent.filter((ele)=>{return ele.cardtype.indexOf("debit card")!==-1})
  let filteredcontentcrecards =filteredcontent.filter((ele)=>{return ele.cardtype.indexOf("credit card")!==-1})
 function testing(){
     if(!Cre)
     { 
         return(<div className="row">
     <div className="col">
          <form className="mx-3 mt-3">
          <div class="form-group mt-1" style={{textAlign:"left"}}> <label for="cardNumber">
          <div className="row row-cols-1 row-cols-md-4">
                      {
                                      
                                      filteredcontentcrecards.map((ele,key)=>(
                                        <div className="col" style={{height:"100px",width:"200px"}}>
                                        <div className="card w-100" style={{height:"5rem",width:"100%"}}>
                                            <div className="form-check my-auto">
                                            <input type="radio" className="form-check-input" id={key} name="cards" />
                                            <label for={key} className="form-check-label"><b>{ele.cardowner}</b></label>
                                            <p>{ele.cardnumber[0]}{ele.cardnumber[1]}{ele.cardnumber[2]}{ele.cardnumber[3]}-XXXX-XXXX-XXXX</p>
                                            </div>
                                           
                                            
                                        </div>
                                        </div>
                                      ))
                                 
                             }
            </div>
                               <h6>Credit Card number</h6>
                              
                           </label>
                           <div class="input-group mt-1" style={{textAlign:"left"}}> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " onChange={(e)=>setCardnumbercre(e.target.value)}  required/>
                               <div class="input-group-append"> <span class="input-group-text text-muted" style={{height:"100%"}}> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>
                           </div>
                       </div>
                       <div class="form-group mt-1"  style={{textAlign:"left"}}> <label for="username">
                               <h6>Card Owner</h6>
                           </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control " onChange={(e)=>setCardownercre(e.target.value)} /> </div>
                      
                       <div class="row mt-1">
                           <div class="col-sm-8">
                               <div class="form-group" style={{textAlign:"left"}}> <label><span class="hidden-xs">
                                           <h6>Expiration Date</h6>
                                       </span></label>
                                   <div class="input-group" style={{textAlign:"left"}}> <input type="number" placeholder="MM" name="" class="form-control" onChange={(e)=>setExpirymonthcre(e.target.value)}  required/> <input type="number" placeholder="YY" name="" class="form-control" onChange={(e)=>setExpiryyearcre(e.target.value)} required/> </div>
                               </div>
                           </div>
                           <div class="col-sm-4">
                               <div class="form-group mb-4" style={{textAlign:"left"}}> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                       <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                   </label> <input type="text" required class="form-control"/> </div>
                           </div>
                       </div>
                       <p className="float-start"><label class="form-check-label"><input type="checkbox" onChange={(e)=>setSavecrecard(e.target.value)} value="savecard"/> save card</label></p>
                   </form>
          </div>
          <div class="card-footer mx-auto" style={{width:'600px'}}> <button type="button" class="subscribe btn btn-primary btn-block shadow-sm" onClick={()=>{thankyou()}}> Confirm Payment </button> </div>
                  
 </div>);}
 else if(!Deb){
    return(<div className="row">
    <div className="col">
         <form className="mx-3 mt-3">
         <div class="form-group mt-1" style={{textAlign:"left"}}> <label for="cardNumberdeb">
         <div className="row row-cols-1 row-cols-md-3">
         {
                                      
                                      filteredcontentdebcards.map((ele,key)=>(
                                        <div className="col" style={{height:"100px",width:"200px"}}>
                                          <div className="card w-100" style={{height:"5rem",width:"100%"}}>
                                              <div className="form-check my-auto">
                                              <input type="radio" className="form-check-input" id={key} name="cards" />
                                              <label for={key} className="form-check-label"><b>{ele.cardowner}</b></label>
                                              <p>{ele.cardnumber[0]}{ele.cardnumber[1]}{ele.cardnumber[2]}{ele.cardnumber[3]}-XXXX-XXXX-XXXX</p>
                                              </div>
                                             
                                              
                                          </div>
                                          </div>
                                      ))
                                 
                             }

                               
                             </div>
                             <input type="radio" className="form-check-input" id="none" name="cards" />
                                              <label for="none" className="form-check-label"><b>new debitcard</b></label>
                              <h6>Debit Card number</h6> 
                          </label>
                          <div class="input-group mt-1" style={{textAlign:"left"}}> <input type="text" name="cardNumbedeb" placeholder="Valid card number" class="form-control" onChange={(e)=>setCardnumberdeb(e.target.value)} required/>
                              <div class="input-group-append"> <span class="input-group-text text-muted" style={{height:"100%"}}> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>
                          </div>
                      </div>
                      <div class="form-group mt-1"  style={{textAlign:"left"}}> <label for="usernamedeb">
                              <h6>Card Owner</h6>
                          </label> <input type="text" name="usernamedeb" placeholder="Card Owner Name" required class="form-control" onChange={(e)=>setCardownerdeb(e.target.value)} /> </div>
                     
                      <div class="row mt-1">
                          <div class="col-sm-8">
                              <div class="form-group" style={{textAlign:"left"}}> <label><span class="hidden-xs">
                                          <h6>Expiration Date</h6>
                                      </span></label>
                                  <div class="input-group" style={{textAlign:"left"}}> <input type="number" placeholder="MM" name="" class="form-control"  required onChange={(e)=>setExpirymonth(e.target.value)}/> <input type="number" placeholder="YY" name="" class="form-control"  required onChange={(e)=>setExpiryyeardeb(e.target.value)}/> </div>
                              </div>
                          </div>
                          <div class="col-sm-4">
                              <div class="form-group mb-4" style={{textAlign:"left"}}> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">
                                      <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>
                                  </label> <input type="text" required class="form-control"/> </div>
                          </div>
                      </div>
                      
                      <p className="float-start"><label class="form-check-label"><input type="checkbox" onChange={(e)=>setSaveddebcard(e.target.value)} value="savecard"/> save card</label></p>
                  
                 
                  </form>
         </div>
 <div class="card-footer mx-auto" style={{width:'600px'}}> <button type="button" class="subscribe btn btn-primary btn-block shadow-sm" onClick={()=>{thankyou()}}> Confirm Payment </button> </div>
                 
</div>);
 }
 else if(!Gpay){
     return(<div className="row">
     <div className="col">
          <form className="mx-3 mt-3">
          <div class="form-group mt-1" style={{textAlign:"left"}}> <label for="upiid">
                               <h6>UPI ID</h6>
                           </label>
                           <div class="input-group mt-1 mb-3" style={{textAlign:"left"}}> <input type="text" name="upiid" placeholder="Valid upi id" class="form-control " required/>
                              
                           </div>
            </div>
                       
                     
        </form>
    </div>
    <div class="card-footer mx-auto" style={{width:'600px'}}> <button type="button" class="subscribe btn btn-primary btn-block shadow-sm" onClick={()=>{thankyou()}}> Verify </button> </div>
                  
 </div>);
 }
 else if(!Inb){
     return(<div className="row mb-2 p-2">
     <div className="col">
          <form className="mx-2 mt-2">
          <div  class="pt-3" style={{textAlign:"left"}}>
                        <div class="form-group"> <label for="Select Your Bank">
                                <h6>Select your Bank</h6>
                            </label> <select class="form-select mt-2">
                                <option value="" selected disabled>--Please select your Bank--</option>
                                <option>Bank 1</option>
                                <option>Bank 2</option>
                                <option>Bank 3</option>
                                <option>Bank 4</option>
                                <option>Bank 5</option>
                                <option>Bank 6</option>
                                <option>Bank 7</option>
                                <option>Bank 8</option>
                                <option>Bank 9</option>
                                <option>Bank 10</option>
                            </select> </div>
                        <div class="form-group mt-4">
                            <p> <button type="button" class="btn btn-primary "><i class="fas fa-mobile-alt mr-2" onClick={()=>{thankyou()}}></i> Proceed Payment</button> </p>
                        </div>
                        <p class="text-muted">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>
                    </div> 
                       
                     
        </form>
    </div>
 
                  
 </div>)
 }
    
 }
    return(
        
    <div className="container py-5">
          

          <div className="display-6">payment</div>
          <div className="card mx-auto mt-3 px-1" style={{width:'600px',height:"100%"}}>
          <ul className="nav nav-pills rounded nav-fill mt-2" style={{width:"580px"}}>
      
              <li className="nav-item" style={{display:"inline"}}><button className={!Cre? x:"btn btn-light mx-auto nav-link ml-1"} onClick={creditcard}><i class="fas fa-credit-card "></i>  Creditcard</button></li>
              <li className="nav-item" style={{display:"inline"}}><button className={!Deb? x:"btn btn-light mx-auto nav-link ml-1"} onClick={debitcard}><i class="fas fa-credit-card "></i>  Debit card</button></li>
              <li className="nav-item" style={{display:"inline"}}><button className={!Gpay? x:"btn btn-light mx-auto nav-link ml-1"} onClick={gpay}><span style={{fontSize:"1.05rem"}}><i class="fab fa-google-pay fa-lg"></i></span></button></li>
              <li className="nav-item" style={{display:"inline"}}><button className={!Inb? x:"btn btn-light mx-auto nav-link ml-1"} onClick={intban}><i class="fas fa-mobile-alt mr-2"></i> Net Banking</button></li>
          </ul>
     {/* start of credit */}
       {testing()}
          {/* end of credit */}
        
         </div>
        
       
     
     
     
     
     
     
     </div>
            
    )
}
export default Payment;