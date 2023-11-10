import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Home = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "aitfinalprojectapi-production.up.railway.app"
      );
      const events = await response.json();
      console.log(events);
      setEvents(events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    const { start, action } = slotInfo;
    if (action === "click" || action === "select") {
      if (start < new Date()) {
        toast.error("You can't select a date before today!");
        return;
      }
    }
  };

  if (loading) {
    return <div style={{ color: "black" }}>Loading...</div>; // Display a loading message or spinner while events are being fetched
  }

  return (
    <div className="myCustomHeight">
      <ToastContainer />
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        onSelectSlot={handleSelectSlot}
        longPressThreshold={10}
        startAccessor="start"
        endAccessor="end"
        step={60}
        timeslots={1}
        views={["month", "agenda"]}
        min={new Date(0, 0, 0, 7, 0)} // 7 AM
        max={new Date(0, 0, 0, 21, 0)} // 9 PM
      />
    </div>
  );
};

export default Home;
