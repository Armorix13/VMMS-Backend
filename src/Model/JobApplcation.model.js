const mongoose = require("mongoose");
const jobApplicationSchema = new mongoose.Schema(
  {
    userId: { type: String, default: null },
    postJobId: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost" },
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    resumeLink: { type: String },
    status: {
      type: String,
      enum: [
        "Review",
        "Shortlisted",
        "Unsuitable",
        "Interview",
        "Offered",
        "Declined",
        "Hired",
      ],
      default: "Review",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("jobapplications", jobApplicationSchema);
