const  express = require( 'express');
const swaggerJsdoc = require('swagger-jsdoc') ;
const swaggerUi = require('swagger-ui-express') ;
const swaggerDefinition = require('./../swagger/swagger.definition') ;

const router = express.Router();

const specs = swaggerJsdoc(
  swaggerDefinition
);

router.use('/', swaggerUi.serve ,(req, res, next) => {  
  swaggerUi.setup(specs, {
  explorer: true,
  debug: true,
})(req, res, next);});

module.exports =  router;
