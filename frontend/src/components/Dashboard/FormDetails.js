import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const FormDetails = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  // Fetch form details and submissions when the component mounts
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const formResponse = await api.get(`/forms/${formId}`);
        setForm(formResponse.data);

        const submissionsResponse = await api.get(
          `/forms/${formId}/submissions`
        );
        setSubmissions(submissionsResponse.data);
      } catch (error) {
        console.error("Error fetching form details:", error);
      }
    };

    fetchFormDetails();
  }, [formId]);

  if (!form) return <Typography>Loading form details...</Typography>;

  return (
    <div>
      <Typography variant="h4">{form.title}</Typography>
      <Typography variant="h6">Fields:</Typography>
      <List>
        {form.fields.map((field, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Label: ${field.label}, Type: ${field.fieldType}`}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Submissions:
      </Typography>
      {submissions.length > 0 ? (
        <List>
          {submissions.map((submission, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Submission #${index + 1}`} />
              <List>
                {submission.answers.map((answer, idx) => (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={`Question: ${answer.question}`}
                      secondary={`Answer: ${answer.answer}`}
                    />
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No submissions yet.</Typography>
      )}
    </div>
  );
};

export default FormDetails;
