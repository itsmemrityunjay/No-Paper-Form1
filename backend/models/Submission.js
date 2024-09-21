const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  form: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
