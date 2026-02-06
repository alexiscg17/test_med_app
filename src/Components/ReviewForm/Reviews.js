import React, { useEffect, useState } from 'react';
import ReviewRow from './ReviewRow/ReviewRow';
import './Reviews.css';

const Reviews = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const appointments = Object.keys(localStorage)
      .map((key) => {
        try {
          return JSON.parse(localStorage.getItem(key));
        } catch {
          return null;
        }
      })
      .filter((item) => item?.doctor);

    const uniqueDoctors = {};
    appointments.forEach((appt) => {
      uniqueDoctors[appt.doctor.name] = appt.doctor;
    });

    setDoctors(Object.values(uniqueDoctors));
  }, []);

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor, index) => (
            <ReviewRow
              key={doctor.name}
              index={index}
              doctor={doctor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
