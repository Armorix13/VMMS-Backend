const dotenv = require('dotenv');
const Joi = require('joi');
const path = require("path");

// Load environment variables from the .env file in the project root directory
dotenv.config({ path: path.join(__dirname, '../.env') });


// Define the schema for expected environment variables
const envVarsSchema = Joi.object().keys({
  SMTP_HOST: Joi.string().description('Server that will send the emails'),
  SMTP_PORT: Joi.number().description('Port to connect to the email server'),
  SMTP_USER: Joi.string().description('Username for the email server'),
  SMTP_PASSWORD: Joi.string().description('Password for the email server'),
  SMTP_FROM: Joi.string().description('The "from" field in the emails sent by the app'),
}).unknown();

// Validate the environment variables against the schema
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } }) // Label errors by key (environment variable name)
  .validate(process.env);

// If validation error occurs, throw an error with the details
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Export the configuration object with environment variables
module.exports = {
  env: 'development', // Set your environment (development, production, etc.)
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USER,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.SMTP_FROM,
  },
};
