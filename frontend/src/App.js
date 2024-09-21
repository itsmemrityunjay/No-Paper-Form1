import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import FormBuilder from "./components/Form/FormBuilder";
import FormViewer from "./components/Form/FormViewer";
import FormList from "./components/Dashboard/FormList";
import Navbar from "./components/Navbar"; // Import the Navbar

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<FormList />} />
        <Route path="/create-form" element={<FormBuilder />} />
        <Route path="/forms/:formId" element={<FormViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
