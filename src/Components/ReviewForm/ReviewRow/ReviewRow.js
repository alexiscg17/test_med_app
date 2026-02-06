import React, { useEffect, useState } from 'react';
import GiveReviewForm from '../GiveReviewForm/GiveReviewForm';

const ReviewRow = ({ doctor, index }) => {
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState(null);

  useEffect(() => {
    const storedReview = localStorage.getItem(`review-${doctor.name}`);
    if (storedReview) {
      setReview(JSON.parse(storedReview));
    }
  }, [doctor.name]);

  const handleSubmit = (reviewData) => {
    localStorage.setItem(
      `review-${doctor.name}`,
      JSON.stringify(reviewData)
    );
    setReview(reviewData);
    setShowForm(false);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{doctor.name}</td>
        <td>{doctor.speciality}</td>
        <td>
          <button
            disabled={!!review}
            onClick={() => setShowForm(true)}
          >
            {review ? 'Reviewed' : 'Open Form'}
          </button>
        </td>
        <td>
          {review ? (
            <>
              ⭐ {review.rating}/5  
              <br />
              {review.review}
            </>
          ) : (
            '—'
          )}
        </td>
      </tr>

      {showForm && (
        <tr>
          <td colSpan="5">
            <GiveReviewForm
              doctorName={doctor.name}
              onSubmit={handleSubmit}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default ReviewRow;
