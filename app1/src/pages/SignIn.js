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
  const [resetting,setResetting]=useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const[emailSent,setEmailSent]=useState(false)

  const form = useRef();
  const resetPasswordForm=useRef()

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
        .post("https://ghanahomestayserver.onrender.com/sign-up/create-user", {
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


  async function sendEmail(e){ 
    e.preventDefault();
    console.log("testing emailjs functionality");
    
    
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

  async function sendEmailResetPassword(){ 
   
    console.log("testing emailjs functionality");
    
    
    const response= await emailjs 
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_KEY,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        resetPasswordForm.current,
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

  

  if(!isLoading && !emailSent){
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
                         {
                          !resetting?
                          <div class="flex justify-around mt-2 ">
                            <label class="text-white font-bold">Pass:</label>
                            <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                              setPassword(e.target.value)
                            }}/>
                         </div>:
                         <div></div>

                         }
                          {
                            resetting?
                            <div class="flex-col w-full">
                              <div class="flex justify-around mt-2 ">
                                <button class={admin?"bg-green-500 p-3  rounded-sm":"bg-gray-500 rounded-small p-3"}         onClick=    {(e)=>{
                                   setAdmin(!admin)
                                   }}><p class="text-white">Admin</p>
                                  </button>
                               </div>
                            </div>
                            :
                            
                               <div class="flex justify-around mt-2 ">
                                {admin?
                                <div class="flex w-full justify-around ">
                                  <label class="text-white font-bold mr-5">Id:</label>
                                   <div class="flex flex-col  ">
                                      <input type="text" class="bg-white p-2 rounded-sm" onChange={(e)=>{
                                     setAdmin(e.target.value)
                                       }}/>
                                 <div class="flex  mt-2 ">
                                      <button class={admin?"bg-green-500 p-3  rounded-sm":"bg-gray-500 rounded-small p-3"}    onClick=    {(e)=>{
                                        setAdmin(!admin)
                                        }}><p class="text-white">Admin</p>
                                  </button>
                               </div>
                                   </div>
                                  </div>
                                  :
                                  <div class="flex w-full justify-around ">
                                  <label class="text-white font-bold mr-5 hidden">Id:</label>
                                   <div class="flex flex-col  ">
                                      <input type="text" class="hidden" onChange={(e)=>{
                                     
                                       }}/>
                                      <button  class={
                                      admin?"bg-green-500 p-3 rounded-sm":"bg-gray-500 rounded-small p-3"}  onClick={(e)=>{
                                       setAdmin(!admin)
                                       }}><p class="text-white">Admin</p>
                                    </button>
                                   </div>
                                  </div>
                             }
                              </div>
                          }
                        
                         <div class="flex w-full">
                         {
                          resetting?
                          <button class="flex w-full p-3" onClick={()=>{
                            console.log(resetting)
                            setResetting(!resetting)
                          }}>
                            <p class="over:text-green-500 text-green-800 font-bold text-end text-sm m-2">
                               Forgot password?
                            </p>
                          </button>
                          :
                          <button class="flex w-full p-3" onClick={()=>{
                            console.log(resetting)
                            setResetting(!resetting)
                          }}>
                            <p class="over:text-green-500 text-black font-semibold text-end text-sm m-2">
                               Forgot password?
                            </p>
                          </button>
                         }
                          
                        </div>
                     
                       {
                        !resetting?
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
                            axios.post("https://ghanahomestayserver.onrender.com/sign-in/sign-in-user",{email:email,password:password}).then((response)=>{
                              console.log(response)
                              if(!response.data.success){
                                alert(response.data.message)
                              }
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
                            axios.post("https://ghanahomestayserver.onrender.com/sign-in/sign-in-admin",{email:email,password:password,adminId:adminId}).then((response)=>{
                              console.log(response)
                              if(!response.data.success){
                                alert(response.data.message)
                              }

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
                   :
                         <button class="mt-2 bg-green-500 hover:bg-green-400 rounded-md p-3"
                         onClick={()=>{
                           const prom=new Promise((resolve,reject)=>{
                            console.log(resetPasswordForm)
                            if(admin){
                              sendEmailResetPassword().then((response)=>{
                                console.log(response) 
                                resolve()
                              })
                            }else{
                              sendEmailResetPassword().then((response)=>{
                                console.log(response)
                                resolve()
                              })

                            }
                          })
                          prom.then(()=>{
                           setEmailSent(!emailSent)  
                           })
                         }}>
                        <p class="text-white  text-center">Submit</p>
                      </button>
                       }
                       <form ref={resetPasswordForm}class="hidden">
                          <input type="email" name="email" value={email}/>
                          {!admin?
                          <input type="text" name="message" value={`Please use the following link to reset your password and regain access to ypur account: http://localhost:3000/reset-password/${email}`}/> 
                          :
                          <input type="text" name="message" value={`Please use the following link to reset your password and regain access to ypur account: http://localhost:3000/reset-password/admin/${email}`}/> 
                          }
                       </form>
                        
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
              return(
                 <div class='h-screen w-full fixed ml-0 mr-0 mt-0 mb-0 flex justify-center items-center bg-black   bg-opacity-50'>
                    <main id='content' role='main' class='w-full max-w-md mx-auto '>
                      <div class="mt-20">
                        <div class='  flex  rounded-xl shadow-lg h-1/2 w-3/4'>
                          <div class="flex flex-col w-full">
                            <div class="flex flex-col  m-3">
                                 <p class="text-white-600 text-xl font-semibold text-white">
                                   Please check your email to reset your password.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </main>
                     </div>
                  )
                }
}

export default SignIn