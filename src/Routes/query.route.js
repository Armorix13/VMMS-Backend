const express = require("express");
const router = express.Router();
const validate = require("./../Middlewares/validation");
const contactusController = require("../Controller/contactus.controller");
const contactusService = require("../Services/contactus.services");
const contactusSchema = require("../Schema/contactus.schema");
const upload = require("../Middlewares/uploadMedia");

router.post(
  "/query",
  validate(contactusSchema.queryValidation),
  contactusController.sendQuery
);

router.post("/file", upload.single("file"), contactusService.upload);

module.exports = router;
