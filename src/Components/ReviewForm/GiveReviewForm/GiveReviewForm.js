import React, { useState } from 'react';

const GiveReviewForm = ({ doctorName, onSubmit }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [warning, setWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!review || rating === 0) {
      setWarning(true);
      return;
    }

    onSubmit({ review, rating });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Review for {doctorName}</h3>

      {warning && <p className="warning">All fields required</p>}

      <div className="form-group">
        <label>Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Rating</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={num <= rating ? 'star active' : 'star'}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default GiveReviewForm;
