const express = require("express");
const {
  createForm,
  getForms,
  getForm,
  submitForm,
} = require("../controllers/formController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createForm);
router.get("/", protect, getForms);
router.get("/:formId", protect, getForm);
router.post("/:formId/submit", protect, submitForm);

module.exports = router;
