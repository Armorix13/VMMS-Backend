const express = require("express");
const router = express.Router();
const validate = require("./../Middlewares/validation");
const jobPostController = require("../Controller/jobpost.controller");
const jobApplicationController = require("../Controller/jobApplication.controller");
// const contactusSchema = require("../Schema/contactus.schema");

router.post("/createJob", jobPostController.createJobPost);
router.put("/updateJob/:id", jobPostController.updateJob);
router.delete("/deleteJob/:id", jobPostController.deletedJob);
router.get("/", jobPostController.getJob);
router.get("/:id", jobPostController.getJob);

router.post("/jobApply", jobApplicationController.createJobApplcation);

module.exports = router;
