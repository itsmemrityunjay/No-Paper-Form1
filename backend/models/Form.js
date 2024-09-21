const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fields: [
    {
      label: { type: String, required: true },
      fieldType: { type: String, required: true }, // text, number, email, etc.
      required: { type: Boolean, default: false },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", FormSchema);
