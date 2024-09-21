import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      const response = await api.get("/forms");
      setForms(response.data);
    };
    fetchForms();
  }, []);

  return (
    <div>
      <Typography variant="h4">Your Forms</Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create-form"
      >
        Create New Form
      </Button>
      <List>
        {forms.map((form) => (
          <ListItem
            key={form._id}
            button
            component={Link}
            to={`/forms/${form._id}`}
          >
            <ListItemText primary={form.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FormList;
