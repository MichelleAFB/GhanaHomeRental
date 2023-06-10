import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignIn";


//components
import ApplicationModal from "./admin-components/modals/ApplicationModal";
//layout
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import PreApplication from "./pages/PreApplication";
import Application from "./pages/Application";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import YourStay from "./pages/YourStay";
import AdminYourStay from "./pages/AdminYourStay";
import Reviews from "./pages/Reviews";
import { Menu } from "@material-ui/core";
import {useEffect,useState}from 'react'
import {connect} from 'react-redux'

function App({reload}) {

 

  useEffect(()=>{

  },[reload])
  
  return (
    // BEM
    <div className='app'>
      <ApplicationModal/>
      <Router>
        <Header />
        

        <Routes>
        
        <Route path='/reviews' element={<Reviews />}/>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/application/:email/:firstname/:lastname/:phone/:startDate/:endDate/:noAdults/:noChildren' element={<Application/>}/>
          <Route path='/pre-application/:startDate/:endDate/:noAdults/:noChildren' element={<PreApplication/>}/>
          <Route path="/payment/:id" element={<PaymentPage/>}/>
          <Route path="/payment/success/:id" element={<PaymentSuccessPage/>}/>
          <Route path="/your-stay/:id" element={<YourStay/>}/>
          <Route path="/admin-your-stay/:id" element={<AdminYourStay/>}/>
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  var reload= state.adminApplications.reload;
 
  

  return {
   
   reload:reload
  };
};

export default connect(mapStateToProps)(App)
  