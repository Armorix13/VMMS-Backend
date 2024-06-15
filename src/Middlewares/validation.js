const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('./../Utils/pick');
const ApiError = require('./../Utils/apiError');

// Helper function to remove empty string and null values from an object
const removeEmptyValues = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      newObj[key] = removeEmptyValues(obj[key]); // Recursively remove empty string and null values from nested objects
    } else if (obj[key] !== '' && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

// Middleware function for request validation using Joi schemas
const validate = (schema) => (req, res, next) => {
   // Remove empty string and null values from req.body, req.params, and req.query
   req.body = removeEmptyValues(req.body);
   req.params = removeEmptyValues(req.params);
   req.query = removeEmptyValues(req.query);

  //  console.log(req.body, req.params, req.query);
  // Pick the appropriate schema keys for 'params', 'query', and 'body'
  const validSchema = pick(schema, ['params', 'query', 'body']);

  // Pick relevant properties from the request object based on the schema keys
  const object = pick(req, Object.keys(validSchema));

  // Validation options
  const options = {
    abortEarly: false, // Continue validation after first error
    allowUnknown: true, // Allow extra fields not specified in the schema
    stripUnknown: true, // Remove fields not specified in the schema
  };

  // Validate the object against the compiled schema
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } }) // Label errors by key (parameter name)
    .validate(object, options);

  // If validation error occurs
  if (error) {
    // Map error details to error messages and join them
    const errorMessage = error.details.map((details) => details.message.replace(/"/g, '')).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // Assign the validated values back to the request object
  Object.assign(req, value);

  // Proceed to the next middleware or route handler
  return next();
};

module.exports = validate;
