const express = require("express");
const route = express.Router();
const validate = require("./../Middlewares/validation");
const { encode, authorize } = require("./../Middlewares/auth");
const userSchema = require("./../Schema/users.schema");
const userController = require("./../Controller/user.controller");
const upload = require("../Middlewares/uploadMedia");

/**
 * @swagger
 * /v1/users/signUpUser:
 *  post:
 *     summary: This api used to signup  user
 *     description: Sign Up  Api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: John
 *               email:
 *                 type: string
 *                 example : johnDavid@gmail.com
 *               password:
 *                 type: string
 *                 example: johndavid@123
 *               currentPassword:
 *                 type: string
 *                 example: johndavid@123
 *               location:
 *                 type: string
 *                 example: South San
 *               deviceToken:
 *                 type: string
 *                 example: samsung
 *               deviceType:
 *                 type: number
 *                 example: 1
 *             required:
 *               -Name
 *               - email
 *               - password
 *               - location
 *               - deviceType
 *               - deviceToken
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/signUpUser",
  validate(userSchema.registerValidation),
  userController.register
);

/**
 * @swagger
 * /v1/users/logInUser:
 *   post:
 *     summary: This api is used to login user
 *     description: login Api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johnDavid@gmail.com
 *               password:
 *                 type: string
 *                 example: johndavid@123
 *               deviceType:
 *                 type: number
 *                 example: 1
 *               deviceToken:
 *                 type: string
 *                 example: mi
 *             required:
 *               - email
 *               - password
 *               - deviceType
 *               - deviceToken
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/logInUser",
  validate(userSchema.loginValidation),
  userController.logInUser
);

/**
 * @swagger
 * /v1/users/socialLogIn:
 *   post:
 *     summary: This api used to social login user
 *     description: Social login Api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: David
 *               email :
 *                 type: string
 *                 example: johnDavid@gmail.com
 *               socialId :
 *                 type: string
 *                 example: 567$erty
 *               deviceToken :
 *                 type: string
 *                 example: three
 *               deviceType :
 *                 type: string
 *                 example: 1
 *             required:
 *               - socialId
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/socialLogIn",
  validate(userSchema.socialValidation),
  userController.socialLogInUser
);

/**
 * @swagger
 * /v1/users/updateUser:
 *   post:
 *     summary: This API is used to update user data.
 *     description: Update user API.
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 type: string
 *                 format: binary
 *               userName:
 *                 type: string
 *                 example: philip
 *               phoneNumber:
 *                 type: number
 *                 example: 7354640000443
 *               about:
 *                 type: string
 *                 example: I am
 *               location:
 *                 type: string
 *                 example: US
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/updateUser",
  authorize,
  validate(userSchema.updateUserValidation),
  upload.single("profileImage"),
  userController.updateUser
);

/**
 * @swagger
 * /v1/users/uploadProfileImage:
 *   post:
 *     summary: This api is used to delete user
 *     description: Delete user Api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/uploadProfileImage",
  authorize,
  upload.single("image"),
  userController.uploadProfileImage
);

/**
 * @swagger
 * /v1/users/changePassword:
 *   put:
 *     summary: This api used to change password
 *     description: Change password api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword :
 *                 type: string
 *                 example: hfsdgfydsg
 *               newPassword :
 *                 type: string
 *                 example: jdnvdfvfdf
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.put(
  "/changePassword",
  authorize,
  validate(userSchema.changePasswordValidation),
  userController.changePassword
);

/**
 * @swagger
 * /v1/users/forgetPassword:
 *   post:
 *     summary: This api used to generate forget password api
 *     description: forget password Api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email :
 *                 type: string
 *                 example: johnDavid@gmail.com
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/forgetPassword",
  validate(userSchema.forgetPasswordValidation),
  userController.forgetPassword
);

/**
 * @swagger
 * /v1/users/otpVerification:
 *   post:
 *     summary: This api used to verify OTP
 *     description: OTP verification  Api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email :
 *                 type: string
 *                 example: johnDavid@gmail.com
 *               otp :
 *                 type: string
 *                 example: 000000
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/otpVerification",
  validate(userSchema.otpVerificationValidation),
  userController.otpVerification
);

/**
 * @swagger
 * /v1/users/resetPassword:
 *   post:
 *     summary: This api used rest passowrd
 *     description: Reset password Api
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id :
 *                 type: string
 *                 example: 649bd2dff7326be80914a0e8
 *               newPassword :
 *                 type: string
 *                 example: 000000
 *             required:
 *               - email
 *               - newPassword
 *               - otp
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post(
  "/resetPassword",
  validate(userSchema.resetPasswordValidation),
  userController.resetPassword
);

// /**
//  * @swagger
//  * /v1/users/getUser:
//  *   get:
//  *     summary: This api is used to get user data
//  *     description: Get User Api
//  *     tags:
//  *       - Users
//  *     responses:
//  *       200:
//  *         description: OK
//  *       201:
//  *         description: created
//  *       400:
//  *         description: Bad Request
//  *       401:
//  *         description: Unauthorized
//  *       403:
//  *         description: Forbidden
//  *       500:
//  *         description: Internal Server Error
//  */
// route.get('/getUser', userController.getUser)

/**
 * @swagger
 * /v1/users/deleteUser:
 *   post:
 *     summary: This api is used to delete user
 *     description: Delete user Api
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post("/deleteUser", authorize, userController.deleteUser);

/**
 * @swagger
 * /v1/users/logoutUser:
 *   post:
 *     summary: This api is used logout user
 *     description: Logout User Api
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK
 *       201:
 *         description: created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
route.post("/logoutUser", authorize, userController.logoutUser);

module.exports = route;
