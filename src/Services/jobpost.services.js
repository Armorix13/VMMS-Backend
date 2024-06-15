const JobPost = require("../Model/jobpost.model");

const createJobPost = async (req) => {
  try {
    const job = await JobPost.create(req.body);
    return job;
  } catch (error) {
    throw error;
  }
};

const updateJob = async (req) => {
  try {
    const id = req.params.id;
    const job = await JobPost.findOne({ _id: id });
    if (!job) {
      const error = new Error("Job not found");
      error.status = 404;
      throw error;
    }
    const updatedJob = await JobPost.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return updatedJob;
  } catch (error) {
    error.status = error.status || 500;
    throw error;
  }
};

const deleteJob = async (req) => {
  try {
    const id = req.params.id;
    const job = await JobPost.findOne({ _id: id });
    if (!job) {
      const error = new Error("Job not found");
      error.status = 404;
      throw error;
    }
    const deletedJob = await JobPost.findOneAndDelete({ _id: id });
    return deletedJob;
  } catch (error) {
    throw error;
  }
};

const getJob = async (req) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (req.params.id) {
      const id = req.params.id;
      const data = await JobPost.findOne({ _id: id, isDeleted: false });
      if (!data) {
        throw new Error("Job not found");
      }
      let message = "Job fetched successfully";
      return { data, message };
    }

    const jobQuery = JobPost.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const jobs = await jobQuery.exec();
    const total = await JobPost.countDocuments({ isDeleted: false });
    const totalPages = Math.ceil(total / limit);

    let message =
      jobs.length === 0 ? "No data found" : "Jobs fetched successfully";
    return {
      data: jobs,
      total,
      page,
      limit,
      totalPages,
      message,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { createJobPost, deleteJob, updateJob, getJob };
