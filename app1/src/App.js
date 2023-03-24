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
          <Route path='/application/:email/:firstname/:lastname/:phone/:startDate/:endDate/:noAdults/:noChildren' element={<Application/>}/>
          <Route path='/pre-application/:startDate/:endDate/:noAdults/:noChildren' element={<PreApplication/>}/>
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}
//http://localhost:3001/pre-application/Sun%20Mar%2026%202023%2000:00:00%20GMT-0500%20(Central%20Daylight%20Time)/Fri%20Mar%2031%202023%2000:00:00%20GMT-0500%20(Central%20Daylight%20Time)/2/2
export default App;
