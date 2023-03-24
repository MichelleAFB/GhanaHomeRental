import { Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link,useParams } from "react-router-dom";
import { useRef } from "react";

//out
import axios from "axios";
import emailjs from "@emailjs/browser";


//icons
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import personIcon from "../assets/personIcon.svg"
import "../css/PreApplication.css"
//check if person is logged in

//TODO:fixing emailJS
function PreApplication() {

  const navigate=useNavigate()
  
  const {noChildren}=useParams()
  const {noAdults}=useParams()
  const{startDate}=useParams()
  const {endDate}=useParams()

  const[signIn,setSignIn]=useState(true)

  const[firstname,setFirstName]=useState()
  const[lastname,setLastName]=useState()
  const[email,setEmail]=useState()
  const[phone,setPhone]=useState()
  const[password,setPassword]=useState()
  const[passwordConfirm,setPasswordConfirm]=useState()

  const {...props}=useParams()
  console.log(props)

console.log("no adults:"+noAdults)

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const form = useRef();

  const [formData, setFormData] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone:phone,
    password: password,
    passwordConfirm: passwordConfirm,
    message:"Thank you for setting up your account for AAC dallas private flagship suite! We look forward to hosting you next experience at the American Airlines Center at Dallas."
  });

  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if(e.target.name=="firstname"){
      setFormData((prevState) => ({
        ...prevState,
        [firstname]: e.target.value,
      })
      );
    }
   /* setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    })
    );
    */
    
  };

 console.log(formData)

  const signUp = (e) => {
    e.preventDefault()
    console.log(formData);
    console.log("***SIGNUP NEW USER(SIGN_UP.JS)*****");
    console.log(password);
    console.log(passwordConfirm);
    console.log(firstname)
    console.log(lastname)
    console.log(email)
    console.log(phone)

    if (password != passwordConfirm ) {
      alert("passwords do not match!");
    }if(firstname==null || lastname==null || phone==null || email==null || password==null || passwordConfirm==null){
      alert("please fill out all fields")
    } else {
      console.log(email);
      axios
        .post("http://localhost:3012/sign-up/create-user", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phone:phone
        })
        .then((response) => {
          if(response.data.success){
            const emailResponse=sendEmail(e);
            emailResponse.then((data)=>{
              if(data==true){
                alert("SUCCESS: account set up. confirmation email sent to "+ email)
                

                const prom=new Promise((resolve,reject)=>{
                    alert("SUCCESS: You are now logged in. ")
                    resolve()
                })

                prom.then(()=>{
                  navigate("/application/"+email+"/"+firstname+"/"+lastname+"/"+phone+"/"+startDate+"/"+endDate+"/"+noAdults+"/"+noChildren)
                })
                  
             
                
              }else{
                alert("SUCCESS: account created, error sending email to "+email)
              }
            })
          }
        });
    }
    
  };


  const sendEmail = async(e) => {
    e.preventDefault();
    console.log("testing emailjs functionality");
    console.log(formData.email);
    console.log(e.target);
    const response= await emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        e.target,
        "3X6tKTw8npQeKEIq5"
      )
      .then(
        (result) => {
          console.log(result.text);
          return true
        },
        (error) => {
          console.log(error.text);
          return false
        }
      );
      return response
  };

  


  return (
    <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black bg-opacity-50'>
        <main id='content' role='main' class='w-full max-w-md mx-auto '>
            <div class=' bg-pink-300  rounded-xl shadow-lg dark:bg-gray-300 dark:border-gray-700 mb-5'>
              <div class="flex flex-col w-full">
                <div class="flex flex-col  m-3">
               {
               signIn? 
               <div class="flex flex-col">
                  <p class="text-xl text-center border-b-2 border-green-700  text-green-700 font-bold ">Sign In</p>
                  <p class="text-xl text-center  text-gray-700 font-bold " onClick={()=>{
                    setSignIn(false)
                  }}>Sign Up</p>
               </div> 
               :
               <div class="flex flex-col">
                  <p class="text-xl text-center border-b-2 border-green-700  text-green-700 font-bold ">Sign Up</p>
                  <p class="text-xl text-center  text-gray-700 font-bold " onClick={()=>{
                    setSignIn(true)
                  }}>Sign In</p>
               </div> 
               }
               </div>
                
              <div class=' p-3'>
                  {signIn? 
                      <div class="flex-flex-col p-3">
                      <div class="flex justify-around">
                       
                      </div>
                      <div class="flex flex-col">
                         <div class="flex justify-around">
                            <label class="text-white font-bold">Email:</label>
                            <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setEmail(e.target.value)
                            }}/>
                         </div>
                         <div class="flex justify-around mt-2 ">
                            <label class="text-white font-bold">Pass:</label>
                            <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setPassword(e.target.value)
                            }}/>
                         </div>
                         <button class="mt-2 bg-green-500 hover:bg-green-400 rounded-md p-3"
                          onClick={()=>{
                            const prom=new Promise((resolve,reject)=>{
                              axios.post("http://localhost:3012/sign-in/sign-in-user",{email:email,password:password}).then((response)=>{
                                console.log(response)
                                if(response.data.success){
                                  sessionStorage.setItem("client",JSON.stringify({firstname:response.data.client.firstname,lastname:response.data.client.lastname,email:email,phone:response.data.client.phone}))
                                  resolve()
                                }
                              })
                            })

                            prom.then(()=>{
                              const client=JSON.parse(sessionStorage.getItem("client"))
                              console.log(client)
                              navigate("/application/"+client.email+"/"+client.firstname+"/"+client.lastname+"/"+ client.phone+"/"+noAdults+"/"+noChildren)
                            })
                          }}>
                         <p class="text-white  text-center">Submit</p>
                       </button>
                        
                      </div>
                    </div>
                  :
                  <div class="flex-flex-col p-3">
                    <div class="flex justify-around">
                    <main className='m-4'>
        <form ref={form} onSubmit={signUp} class='mb-10'>
          <div class="flex flex-col">
          <input
            type='text'
            name='firstname'
            placeholder='First...'
            className='emailInput'
            
            onChange={(e) => {
              setFirstName(e.target.value);
            
            }}
            
          />

          <input
            type='text'
            name='lastname'
            placeholder='Last...'
            className='emailInput'
            onChange={(e) => {
              setLastName(e.target.value);
              
            }}
          />

         
          
          <input
            type='email'
            name='email'
            placeholder='Email...'
            className='emailInput'
            onChange={(e) => {
              setEmail(e.target.value);
             
            }}
          />
        
            <input
            type='phone'
            name='phone'
            placeholder='Phone...'
            className='emailInput'
            onChange={(e) => {
              setPhone(e.target.value);
              
            }}
          />
       
          <div className='flex justify-between'>
          
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              className='passwordInput'
              placeholder='Confirm Password...'
              onChange={(e) => {
                setPassword(e.target.value);
               
              }}
            />
          
            <img
              class=''
              src={visibilityIcon}
              alt='show password'
              onChange={onChange}
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            />
          </div>
          <div className='passwordInputDiv'>
            <input
              type={showPasswordConfirm ? "text" : "password"}
              name='passwordConfirm'
              className='passwordInput'
              placeholder='Confirm Password...'
              onChange={(e) => {
                console.log(e)
                setPasswordConfirm(e.target.value);
                
              }}
            />
            <img
              className='showPassword'
              src={visibilityIcon}
              alt='show password'
              onChange={onChange}
              onClick={() => {
                setShowPasswordConfirm((prevState) => !prevState);
               
              }}
            />
          </div>
         
        
          
          <input hidden={true} value="Thank you for setting up your account for AAC dallas private flagship suite! We look forward to hosting you next experience at the American Airlines Center at Dallas." name="message"/>
          <div className='signInBar'>
            
            <input className='signInButton' type='submit' value='Sign Up'  />
            <ArrowRightIcon fill='bg-green-400' width='34px' height='34px' />  <faCloudArrowDown/>
           


          </div>
          </div>
        </form>
      </main>
             
                    </div>

                
                  </div>
                  }

              </div>
              </div>
            </div>
        </main>
    </div>
  )
}

export default PreApplication