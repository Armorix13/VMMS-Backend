const ContactusService = require("../Services/contactus.services");

const sendQuery = async (req, res, next) => {
  try {
    const data = await ContactusService.sendQuery(req);
    console.log(data);
    res.status(200).json({
      success: true,
      message: "Query sent successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendQuery };
