import React from "react";
import "../css/Home.css";
import Banner from "../layout/Banner";
import Card from "../layout/Card";

// ES7 snippets to do 'rfce'
import {useState,useEffect} from 'react'
function Home() {

  const[isLoading,setIsLoading]=useState(true)

  useEffect(()=>{

    const prom=new Promise((resolve,reject)=>{

    })

    prom.then(()=>{
      
    })

  },[])
  return (
    <div className='home'>
      <Banner />

      <div className='home__section'>

      </div>
    </div>
  );
}

export default Home;
