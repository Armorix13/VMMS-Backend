const jobPostService = require("../Services/jobpost.services");

const createJobPost = async (req, res, next) => {
  try {
    const data = await jobPostService.createJobPost(req);
    res.status(201).json({
      success: true,
      message: "JobPost created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const data = await jobPostService.updateJob(req);
    res.status(201).json({
      success: true,
      message: "JobPost updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
const deletedJob = async (req, res, next) => {
  try {
    const data = await jobPostService.deleteJob(req);
    res.status(201).json({
      success: true,
      message: "JobPost deleted successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getJob = async (req, res, next) => {
  try {
    const { data, page, limit, totalPages, total, message } =
      await jobPostService.getJob(req);
    res.status(200).json({
      success: true,
      message: message,
      total,
      data,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createJobPost, deletedJob, updateJob, getJob };
