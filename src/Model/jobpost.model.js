const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    skills: {
      type: String,
      default: null,
    },
    salary: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    qualification: {
      type: String,
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const JobPost = mongoose.model("jobpost", jobPostSchema);
module.exports = JobPost;
