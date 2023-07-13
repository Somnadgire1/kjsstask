import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import ImageHome from "./ImageHome";
import ImageDetails from "./ImageDetail";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ImageHome />} />
        <Route path="/image/:id" element={<ImageDetails />} />
      </Routes>
    </div>
  );
};

export default App;
