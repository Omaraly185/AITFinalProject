import React from "react";
import { Route, Routes } from "react-router-dom";
import BookNow from "./Pages/Home/bookNow";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<BookNow />} />
      </Routes>
    </div>
  );
}

export default App;
