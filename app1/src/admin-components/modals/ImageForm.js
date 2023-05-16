import React from 'react'
import {useState,useEffect,useRef,useMemo} from 'react'
import axios from 'axios'
import emailjs from "@emailjs/browser";

function ImageForm({occupant,send}) {


 
  const formRef=useRef

  useEffect(()=>{
   

  },[send])

  const sendEmail = async(form) => {
   
    console.log("testing emailjs functionality");
    console.log(form.current);
    
    const response= await emailjs
      .sendForm(
        "service_hhij0z7",
        "signup_template_id",
        form.current,
        "3X6tKTw8npQeKEIq5"
      )
      .then(
        (result) => {
          console.log(result.text);
          return result.text
        },
        (error) => {
          console.log(error.text);
          return error.text
        }
      );
      return response
  };

 console.log("hello")
    console.log(formRef)
  return (
    <form class="bg-red-400 p-3" ref={formRef}>
      <input type="text" value={occupant.firstname} name="first"/>
      <input type="text" value={occupant.lasttname} name="last"/>
      <input type="text" value={occupant.email} name="email"/>
      <input type="text" value={ `hi ${occupant.firstname} ${occupant.lastname},  Please use the following link to set up your identification process! http://localhost:3001/setUpIdentification/${occupant.id}`} name="message"/>
      {
        send && 
        (<div>
            {sendEmail(formRef)}
        </div>)
      }
  </form>
  )
}

export default ImageForm