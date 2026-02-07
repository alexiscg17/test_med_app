import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
      } else {
        throw new Error("Failed to fetch profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setUpdatedDetails(userDetails);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {editMode ? (
          <form onSubmit={handleSubmit} className="profile-form">

            <h2>Edit Profile</h2>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={updatedDetails.name || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={updatedDetails.email || ""}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={updatedDetails.phone || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="profile-btn-group">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" className="btn-danger" onClick={handleCancel}>
                Cancel
              </button>
            </div>

          </form>
        ) : (
          <div className="profile-details">
            <h1>Welcome, {userDetails.name}</h1>

            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>

            <button className="btn-primary" onClick={handleEdit}>
              Edit Profile
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfileCard;
