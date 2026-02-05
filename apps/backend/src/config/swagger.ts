import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe Platform API",
      version: "1.0.0",
      description: "API documentation for Recipe Platform",
    },
    servers: [
      {
        url: "http://localhost:8000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
  tags: [
    { name: "Auth", description: "Authentication APIs" },
    { name: "Recipe", description: "Recipe management APIs" },
    { name: "Comment", description: "Recipe comments" },
    { name: "Rating", description: "Recipe ratings" },
    { name: "Favourite", description: "Favourite recipes" },
  ],
});
