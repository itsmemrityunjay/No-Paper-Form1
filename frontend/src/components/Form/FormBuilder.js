import React, { useState } from "react";
import api from "../../api";
import { TextField, Button, Typography } from "@mui/material";

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState([{ label: "", fieldType: "text" }]);

  const addField = () => {
    setFields([...fields, { label: "", fieldType: "text" }]);
  };

  const handleChange = (index, event) => {
    const updatedFields = fields.map((field, i) =>
      i === index
        ? { ...field, [event.target.name]: event.target.value }
        : field
    );
    setFields(updatedFields);
  };

  const handleSubmit = async () => {
    try {
      const formData = { title: formTitle, fields };
      await api.post("/forms", formData);
      alert("Form created successfully");
    } catch (error) {
      console.error("Error creating form:", error.response.data);
    }
  };

  return (
    <div>
      <Typography variant="h4">Create Form</Typography>
      <TextField
        label="Form Title"
        fullWidth
        margin="normal"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        required
      />
      {fields.map((field, index) => (
        <div key={index}>
          <TextField
            label="Field Label"
            name="label"
            fullWidth
            margin="normal"
            value={field.label}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <TextField
            label="Field Type"
            name="fieldType"
            select
            SelectProps={{ native: true }}
            value={field.fieldType}
            onChange={(e) => handleChange(index, e)}
            fullWidth
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
          </TextField>
        </div>
      ))}
      <Button variant="contained" color="secondary" onClick={addField}>
        Add Field
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Form
      </Button>
    </div>
  );
};

export default FormBuilder;
