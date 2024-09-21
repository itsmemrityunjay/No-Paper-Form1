const Form = require("../models/Form");
const Submission = require("../models/Submission");

// Create a new form
exports.createForm = async (req, res) => {
  const { title, fields } = req.body;
  try {
    const form = await Form.create({
      title,
      fields,
      createdBy: req.user.id,
    });
    res.status(201).json(form);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating form", error: err.message });
  }
};

// Get all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find().populate("createdBy", "name email");
    res.json(forms);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching forms", error: err.message });
  }
};

// Get a specific form by ID
exports.getForm = async (req, res) => {
  const formId = req.params.formId;

  try {
    const form = await Form.findById(formId).populate(
      "createdBy",
      "name email"
    );
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching form", error: err.message });
  }
};

// Submit a form
exports.submitForm = async (req, res) => {
  const { answers } = req.body;
  const formId = req.params.formId;

  try {
    const submission = await Submission.create({
      form: formId,
      submittedBy: req.user.id,
      answers,
    });
    res.status(201).json(submission);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error submitting form", error: err.message });
  }
};
