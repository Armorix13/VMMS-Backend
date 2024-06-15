const jobApplicationService = require("../Services/jobApplication.service");

const createJobApplcation = async (req, res, next) => {
  try {
    const data = await jobApplicationService.createJobApplcation(req);
    console.log(data);
    res.status(200).json({
      success: true,
      message: "JobApplication sent successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createJobApplcation };
