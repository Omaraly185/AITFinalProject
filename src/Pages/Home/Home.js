import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Home = (props) => {
  const [showPanel, setShowPanel] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:4000/events");
      const events = await response.json();
      console.log(events);
      setEvents(events);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
    }
  };

  const formatDate = (start) => {
    const dateString = start;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  const handleSelectSlot = (slotInfo) => {
    const { start, action } = slotInfo;
    if (action === "click" || action === "select") {
      if (start < new Date()) {
        toast.error("You can't select a date before today!");
        return;
      }

      setSelectedDate(formatDate(start));
      setSelectedTime("");
      setShowPanel(true);
    }
  };

  const handleTimeSelect = (date, time) => {
    setShowPanel(false);

    const selectedTimeString = `${date} ${time}`;
    const eventDate = new Date(selectedTimeString);
    const newEvent = {
      title: "",
      start: eventDate,
      end: eventDate,
    };
    setEvents([...events, newEvent]);
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
