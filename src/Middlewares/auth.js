require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Model/users.model");


const authorize = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ status: 401, message: "Token is missing", data: null, });
  } else {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
      req.auth = decoded._id;
      return next();
    } catch (error) {
      next(error);
    }
  }
};

const adminAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ status: 401, message: "Token is missing", data: null, });
  } else {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
      req.auth = decoded._id;
      const admin = await User.findOne({ _id: req.auth });
      if (!admin || admin.role != 1) throw new Error('Sorry you do not have access')
      return next();
    } catch (error) {
      next(error);
    }
  }
};

// const encode = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({
//       email: email,
//     });
//     if (user) {
//       const compare = await bcrypt.compare(password, user.password);
//       if (compare) {
//         const payload = {
//           _id: user.id,
//         };
//         const authToken = jwt.sign(payload, process.env.JWT_SECRET);
//         req.authToken = authToken;
//         req.userId = user.id || "";
//         next();
//       } else {
//         throw new Error("User credential not matched");
//       }
//     } else {
//       throw new Error("User credential not matched");
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// const decodeForPassword = (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ status: 401, message: "Token is missing", data: null, });
//   } else {
//     try {
//       const accessToken = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(
//         accessToken,
//         process.env.JWT_SECRET_ForChangePassword
//       );
//       req.decode_id = decoded._id;
//       return next();
//     } catch (error) {
//       next(error);
//     }
//   }
// };

module.exports = { authorize, adminAuth };