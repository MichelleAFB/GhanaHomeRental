import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//pages
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";

//layout
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import PreApplication from "./pages/PreApplication";
import Application from "./pages/Application";

 
function App() {
  return (
    // BEM
    <div className='app'>
      <Router>
        <Header />

        <Routes>
          <Route path='/search' element={<SearchPage />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/application/:email/:firstname/:lastname/:phone' element={<Application/>}/>
          <Route path='/pre-application' element={<PreApplication/>}/>
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
