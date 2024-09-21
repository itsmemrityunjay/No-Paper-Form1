import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4">Sign Up</Typography>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
