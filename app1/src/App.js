import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignIn";

//layout
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import PreApplication from "./pages/PreApplication";
import Application from "./pages/Application";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

 
function App() {
  return (
    // BEM
    <div className='app'>
      <Router>
        <Header />

        <Routes>
        

          <Route path='/search' element={<SearchPage />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/application/:email/:firstname/:lastname/:phone/:startDate/:endDate/:noAdults/:noChildren' element={<Application/>}/>
          <Route path='/pre-application/:startDate/:endDate/:noAdults/:noChildren' element={<PreApplication/>}/>
          <Route path="/payment/:id" element={<PaymentPage/>}/>
          <Route path="/payment/success/:id" element={<PaymentSuccessPage/>}/>
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
  