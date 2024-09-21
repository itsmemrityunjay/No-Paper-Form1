import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { TextField, Button, Typography } from "@mui/material";

const FormViewer = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await api.get(`/forms/${formId}`);
        setForm(response.data);
        // Initialize answers array based on the number of fields
        setAnswers(new Array(response.data.fields.length).fill(""));
      } catch (error) {
        console.error("Error fetching form:", error.response.data);
      }
    };
    fetchForm();
  }, [formId]);

  const handleAnswerChange = (index, event) => {
    const updatedAnswers = answers.map((answer, i) =>
      i === index ? event.target.value : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const submissionData = {
        answers: form.fields.map((field, i) => ({
          question: field.label,
          answer: answers[i],
        })),
      };
      await api.post(`/forms/${formId}/submit`, submissionData);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
    }
  };

  if (!form) return <Typography>Loading form...</Typography>;

  return (
    <div>
      <Typography variant="h4">{form.title}</Typography>
      {form.fields.map((field, index) => (
        <TextField
          key={index}
          label={field.label}
          fullWidth
          margin="normal"
          value={answers[index] || ""}
          onChange={(e) => handleAnswerChange(index, e)}
          required
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Form
      </Button>
    </div>
  );
};

export default FormViewer;
