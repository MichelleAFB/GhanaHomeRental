import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link,useParams } from "react-router-dom";
import { useRef } from "react";

//out
import axios from "axios";
import emailjs from "@emailjs/browser";


//redux
import { useDispatch } from 'react-redux';
import { setUser,setUserType } from '../redux/user/user-actions';

//icons
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import personIcon from "../assets/personIcon.svg"
import "../css/PreApplication.css"
//check if person is logged in

//TODO:fixing emailJS
function SignIn() {

  const navigate=useNavigate()
  
  
  const [formData, setFormData] = useState({
   /* firstname: "",
    lastname: "",
    email: "",
    phone:"",
    password: "",
    passwordConfirm: "",
    */
    message:"Thank you for setting up your account for AAC dallas private flagship suite! We look forward to hosting you next experience at the American Airlines Center at Dallas."
  });

  const[signIn,setSignIn]=useState(true)

  const[firstname,setFirstName]=useState()
  const[lastname,setLastName]=useState()
  const[email,setEmail]=useState()
  const[phone,setPhone]=useState()
  const[password,setPassword]=useState()
  const[passwordConfirm,setPasswordConfirm]=useState()
  const[admin,setAdmin]=useState(false)
  const[adminId,setAdminId]=useState()
 
  const[isLoading,setIsLoading]=useState(true)

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const form = useRef();

  useEffect(()=>{
    const prom=new Promise((resolve,reject)=>{
     
      sessionStorage.clear()
      resolve()
    })

    prom.then(()=>{
      setIsLoading(false)
    })
  })

  const onChange = (e) => {
    
    console.log(e.currentTarget);

    var form=formData
    form[e.currentTarget.name]=e.currentTarget.value
    console.log(form)
      setFormData(form)
    
  
    
  };

 console.log(formData)
 const dispatch=useDispatch()

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
          console.log(response)
          if(response.data.success){
            const emailResponse=sendEmail(e);
            emailResponse.then((data)=>{ 
              if(data==true){
                sessionStorage.removeItem("admin")
                dispatch(setUser(response.data.client))
               
                sessionStorage.setItem("client",JSON.stringify({firstname:firstname,lastname:lastname,email:email,phone:phone}))
                sessionStorage.setItem('user',JSON.stringify({firstname:firstname,lastname:lastname,email:email,phone:phone}))
                sessionStorage.setItem("signInType","signIn")
                dispatch( setUserType("client"))
                sessionStorage.setItem("userType",JSON.stringify("client"))
                
                alert("SUCCESS: account set up. confirmation email sent to "+ email)
                

                const prom=new Promise((resolve,reject)=>{
                    alert("SUCCESS: You are now logged in. ")

                    resolve()
                }).catch(()=>{
                  alert("SUCCESS: confirmation email resent")
                  
                })

                prom.then(()=>{
                  navigate("/")
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
    console.log(form);
    const response= await emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_KEY,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
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

  

  if(!isLoading){
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
                            <input type="email" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setEmail(e.target.value)
                            }}/>
                         </div>
                         <div class="flex justify-around mt-2 ">
                            <label class="text-white font-bold">Pass:</label>
                            <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setPassword(e.target.value)
                            }}/>
                         </div>
                        {admin? <div class="flex justify-around mt-2 ">
                         <label class="text-white font-bold mr-2">Id:</label>
                            <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setAdmin(e.target.value)
                            }}/>
                            </div>:<div></div>}
                         <div class="flex justify-around mt-2 ">
                           
                            <button class={admin?"bg-green-500 p-3 rounded-sm":"bg-gray-500 rounded-small p-3"} onClick={(e)=>{
                              setAdmin(!admin)
                            }}><p class="text-white">Admin</p>
                            </button>
                           
                         </div>
                         <button class="mt-2 bg-green-500 hover:bg-green-400 rounded-md p-3"
                          onClick={()=>{
                            const prom=new Promise((resolve,reject)=>{

                              if(!admin){
                                console.log("HELLLO")
                                var message
                                if(email==null){
                                    message=message+"ERROR: please enter email"
                                }
                                if(password==null){
                                  message=message+"ERROR: please enter password"
                                }
                                if( message!=null){
                                  alert(message)
                                }
                                console.log("HERE")
                              axios.post("http://localhost:3012/sign-in/sign-in-user",{email:email,password:password}).then((response)=>{
                                console.log(response)
                                if(response.data.success){
                                  console.log(response.data.client)
                                  sessionStorage.removeItem("admin")
                                  dispatch(setUser(response.data.client))
                                 console.log("here")
                                  sessionStorage.setItem("client",JSON.stringify(response.data.client))
                                  sessionStorage.setItem('user',JSON.stringify(response.data.client))
                                  sessionStorage.setItem("signInType","signIn")
                                  setTimeout(()=>{
                                    resolve()
                                  },300)
                                }
                              })
                            }else{
                              axios.post("http://localhost:3012/sign-in/sign-in-admin",{email:email,password:password,adminId:adminId}).then((response)=>{
                                console.log(response)

                                if(response.data.success){
                                  sessionStorage.removeItem("client")
                                  dispatch(setUser(response.data.admin))
                                  sessionStorage.setItem("admin",JSON.stringify({firstname:response.data.admin.firstname,lastname:response.data.admin.lastname,email:email,phone:response.data.admin.phone}))
                                  sessionStorage.setItem("user",JSON.stringify({firstname:response.data.admin.firstname,lastname:response.data.admin.lastname,email:email,phone:response.data.admin.phone}))

                                   
                                  setTimeout(()=>{
                                    resolve()
                                  },300)
                                }else{
                                  alert("ERROR: wrong credentials")
                                }

                              })
                            }
                           })

                            prom.then(()=>{
                              const prom2=new Promise((resolve2,reject2)=>{
                                if(!admin){
                                 dispatch( setUserType("client"))
                                 sessionStorage.setItem("userType",JSON.stringify("client"))
                                }else{
                                  dispatch(setUserType("admin"))
                                  sessionStorage.setItem("userType",JSON.stringify("admin"))
                                }
                                resolve2()
                              })

                              prom2.then(()=>{
                               navigate("/")
                              })
                              
                             
                              
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
              onChange(e)
              console.log(firstname)
            
            }}
            
          />

          <input
            type='text'
            name='lastname'
            placeholder='Last...'
            className='emailInput'
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
              onChange(e)
              console.log(lastname)
              
            }}
          />

         
          
          <input
            type='email'
            name='email'
            placeholder='Email...'
            className='emailInput'
            onChange={(e) => {
              setEmail(e.target.value);
              onChange(e)
             
            }}
          />
        
            <input
            type='phone'
            name='phone'
            placeholder='Phone...'
            className='emailInput'
            onChange={(e) => {
              setPhone(e.target.value);
              onChange(e)
              
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
                onChange(e)
               
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
                onChange(e)
                
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
      }else{
                  return(<div></div>)
                }
}

export default SignIn