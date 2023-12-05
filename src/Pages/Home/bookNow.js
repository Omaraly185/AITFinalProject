import React from "react";
import "./home.css";
import MyCalendar from "./Home";
import Sidepanel from "./sidepanel";
import BookingForm from "./bookingForm";
import { useState } from "react";

function BookNow() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <>
        <Sidepanel />
        {isOpen && (
          <div className="Modal">
            <div className="Modal-content">
              <MyCalendar />
            </div>
            <button
              className="modal-close-button"
              onClick={() => handleClose()}
            >
              <span className="modal-inner-content">
                <span className="label">Close</span>
              </span>
            </button>
          </div>
        )}

        <div
          className="overlay-Img"
          style={{ position: isOpen ? "fixed" : "relative" }}
        >
          <div className="BookNowContainer">
            <BookingForm
              handleOpen={() => setIsOpen(true)}
              name={name}
              setName={setName}
            />
          </div>
        </div>
      </>
    </>
  );
}

export default BookNow;
