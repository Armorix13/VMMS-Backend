const JobApplication = require("../Model/JobApplcation.model");
const JobPost = require("../Model/jobpost.model");
const User = require("../Model/users.model");

const createJobApplcation = async (req) => {
  try {
    const { postJobId, name, email, phoneNumber, resumeLink, userId } =
      req.body;
    if (userId) {
      const userExist = await User.findOne({ _id: userId });
      if (!userExist) {
        return res.status(404).send({ message: "User not found" });
      }
    }
    const jobExist = await JobPost.findOne({ _id: postJobId });
    if (!jobExist) {
      return res.status(404).send({ message: "Job not found" });
    }
    const jobApplicationData = {
      postJobId,
      name,
      email,
      phoneNumber,
      resumeLink,
    };
    if (userId) {
      jobApplicationData.userId = userId;
    }
    const jobApplication = new JobApplication(jobApplicationData);
    await jobApplication.save();
    return jobApplication;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { createJobApplcation };
