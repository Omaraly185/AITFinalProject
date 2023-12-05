import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidepanel.css";
import { useSelector } from "react-redux";

function Sidepanel(props) {
  const [loading, setLoading] = useState(false);
  const { showPanel, selectedDate, events, setShowPanel, handleTimeSelect } =
    props;
  const name = useSelector((state) => state.bookingForm.name);
  const message = useSelector((state) => state.bookingForm.message) || "";
  const phoneNumber = useSelector((state) => state.bookingForm.phoneNumber);
  const email = useSelector((state) => state.bookingForm.email);
  const hoto = useSelector((state) => state.bookingForm);

  console.log(hoto);
  const arrayAT = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  const [submitTimeForm, setsubmitTimeForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const toggleCreditcard = (time) => {
    setSelectedTime(time);
    setsubmitTimeForm(true);
  };

  const handleFormSubmit = async (e) => {
    let appointmentLength = 0;

    e.preventDefault();
    setLoading(true);

    const selectedDateTimeString = `${selectedDate} ${selectedTime}`;
    const selectedDateTime = new Date(selectedDateTimeString);
    const endDateTime = new Date(selectedDateTime.getTime());
    const endTime = endDateTime.setHours(
      selectedDateTime.getHours() + appointmentLength + 1
    );

    if (!selectedDate || !selectedTime) {
      console.error("Please select a date and time for the appointment.");
      return;
    }

    const newEvent = {
      email,
      name,
      phoneNumber,
      selectedDate,
      selectedTime,
      endTime,
      message,
      description: `zoom meeting with ${email}`,
    };

    try {
      const response = await fetch(
        "https://aitfinalprojectapi-production.up.railway.app/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        }
      );

      if (response.ok) {
        console.log("Appointment created successfully");
      } else {
        console.error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
    setLoading(false);
    setsubmitTimeForm(false);
    handleClose();
    window.location.reload();
  };

  const handleClose = () => {
    setShowPanel(false);
  };
  const isTimeAvailable = (time) => {
    const selectedTimeString = `${selectedDate} ${time}`;
    const selectedTime = new Date(selectedTimeString);

    let appointmentLength = 0;
    const dayOfWeek = selectedTime.getDay();
    if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 5) {
      return false;
    }

    const endTime = new Date(selectedTime.getTime());
    endTime.setHours(selectedTime.getHours() + appointmentLength);

    return !events.some((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      const isConflicting =
        (selectedTime >= eventStart && selectedTime < eventEnd) ||
        (endTime > eventStart && endTime <= eventEnd) ||
        (selectedTime < eventStart && endTime > eventEnd);

      return isConflicting;
    });
  };

  return (
    <>
      {showPanel && (
        <div className="panel slide-in">
          <button className="panel-close-button" onClick={handleClose}>
            <span className="inner-content">
              <span className="label">Close</span>
            </span>
          </button>
          {!submitTimeForm ? (
            <>
              <div className="panel-title">
                Available times for {selectedDate}
              </div>
              <div className="available-times">
                {arrayAT.some((time) => isTimeAvailable(time)) ? (
                  arrayAT.map((time) =>
                    isTimeAvailable(time) ? (
                      <button
                        className="available-time-button"
                        onClick={() => toggleCreditcard(time)}
                        key={time}
                      >
                        {time}
                      </button>
                    ) : null
                  )
                ) : (
                  <div>No available times on this day</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="panel-title">
                Confirm Appointment for {selectedDate} at {selectedTime}
              </div>
              <form className="credit-card-form" onSubmit={handleFormSubmit}>
                Are you sure this is the appointment you'd like?
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
                <br />
                <button
                  style={{
                    backgroundColor: "red",
                    width: "185px",
                    height: "30px",
                  }}
                  type="cancel"
                  disabled={loading}
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Sidepanel;
