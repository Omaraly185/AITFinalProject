import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/action";
import "./bookingForm.css";
import { ToastContainer } from "react-toastify";
import { validateFields } from "./bookingForm.helper";

const BookingForm = ({ handleOpen }) => {
  const dispatch = useDispatch();

  const bookingForm = useSelector((state) => state.bookingForm);

  useEffect(() => {
    dispatch(
      setFormData({
        ...bookingForm,
      })
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...bookingForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields(bookingForm);
    if (isValid) {
      handleOpen();
    }
  };

  return (
    <div className="myCustomHeight contact-form-container bookformcontainer">
      <ToastContainer style={{ marginTop: "50px" }} />
      <h1>Book Your Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="testing1234">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={bookingForm.name}
            onChange={handleChange}
            className="inputForm"
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={bookingForm.phoneNumber}
            onChange={handleChange}
            className="inputForm"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={bookingForm.email}
            onChange={handleChange}
            className="inputForm"
          />
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            value={bookingForm.message}
            onChange={handleChange}
            className={"inputForm"}
          />
        </div>
        <button className="minecraft" onClick={handleSubmit}>
          Choose an Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
