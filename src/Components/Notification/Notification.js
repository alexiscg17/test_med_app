import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // ✅ auth
    const storedUsername = sessionStorage.getItem('email');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // ✅ read ALL appointments from localStorage
    const storedAppointments = Object.keys(localStorage)
      .map((key) => {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch {
          return null;
        }
      })
      .filter((item) => item?.doctor);

    setAppointments(storedAppointments);
    setShowNotification(storedAppointments.length > 0);
  }, [location.pathname]);

  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    <>
      <Navbar />
      {children}

      {isLoggedIn && showNotification && (
        <div className="notification-container">
          {appointments.map((appt, index) => (
            <div className="notification-card" key={index}>
              <button className="close-btn" onClick={handleClose}>×</button>

              <h3>Appointment Confirmed ✅</h3>

              <p>
                <strong>Patient:</strong> {appt.patient.name}
              </p>

              <p>
                <strong>Doctor:</strong> {appt.doctor.name}
              </p>

              <p>
                <strong>Date:</strong> {appt.appointmentDate}
              </p>

              <p>
                <strong>Time:</strong> {appt.appointmentTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Notification;
