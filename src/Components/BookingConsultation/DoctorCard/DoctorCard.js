import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import { v4 as uuidv4 } from 'uuid';


const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const handleBooking = () => {
        setShowModal(true);
    };

    const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter(
            (appointment) => appointment.id !== appointmentId
        );

        setAppointments(updatedAppointments);

        // 🔥 Clear persisted appointment
        localStorage.removeItem(name);
    };

    const handleFormSubmit = (appointmentData) => {
        const fullAppointment = {
            doctor: {
                name,
                speciality,
                experience,
                ratings,
            },
            patient: {
                name: appointmentData.name,
                phoneNumber: appointmentData.phoneNumber,
            },
            appointmentDate: appointmentData.appointmentDate,
            appointmentTime: appointmentData.appointmentTime,
        };

        // Save appointment keyed by doctor name (or doctorId)
        localStorage.setItem(name, JSON.stringify(fullAppointment));

        setAppointments([{ id: uuidv4(), ...fullAppointment }]);
        setShowModal(false);
    };

    useEffect(() => {
        const storedAppointment = JSON.parse(localStorage.getItem(name));
      
        if (storedAppointment?.doctor) {
          setAppointments([
            {
              id: uuidv4(),
              ...storedAppointment,
            },
          ]);
        }
    }, [name]);


  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>


      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                    {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                        <p>Name: {appointment.patient.name}</p>
                        <p>Phone Number: {appointment.patient.phoneNumber}</p>
                        <p>Date: {appointment.appointmentDate}</p>
                        <p>Time: {appointment.appointmentTime}</p>
                        <button onClick={() => handleCancel(appointment.id)}>
                        Cancel Appointment
                        </button>
                    </div>
                    ))}
                </>
                ) : (
                <AppointmentForm
                    doctorName={name}
                    doctorSpeciality={speciality}
                    doctorExperience={experience}
                    doctorRatings={ratings}
                    onSubmit={handleFormSubmit}
                />
                )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCard;