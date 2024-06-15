const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'App Name',
      version: '0.0.1',
      description: 'This is a node express mongoose project',
    },
    servers: [
      {
        url: `http://localhost:3000`,
        description: 'Development Server',
      }
    ],
    // Define security schemes, such as bearer authentication
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http', // Authentication type (HTTP)
          in: 'header', // Location of the token in the request header
          name: 'Authorization', // Header name for the bearer token
          description: 'Bearer token to access these API endpoints', // Description of the security scheme
          scheme: 'bearer', // Authentication scheme
          bearerFormat: 'JWT', // Bearer format (JWT)
        },
      },
    },
    security: [{
      bearerAuth: []
    }],
  },
  apis: ['src/Routes/user.routes.js'],
};

module.exports = swaggerDefinition;

