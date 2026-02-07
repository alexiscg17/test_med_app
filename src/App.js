import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notification from './Components/Notification/Notification';
import LandingPage from './Components/LandingPage/LandingPage';
import SignUp from './Components/SignUp/SignUp'
import Login from './Components/Login/Login'
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultation"
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Reviews from './Components/ReviewForm/Reviews';
import ProfileCard from './Components/ProfileCard/ProfileCard'
 
function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Notification>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/appointments" element={<BookingConsultation/>}/>
                    <Route path="/instant-consultation" element={<InstantConsultation/>} />
                    <Route path="/reviews" element={<Reviews/>} />
                    <Route path="/profile" element={<ProfileCard/>} />
                </Routes>
            </Notification>
        </BrowserRouter>
    </div>
  );
}
export default App;
