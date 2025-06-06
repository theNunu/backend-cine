import swaggerJsdoc from "swagger-jsdoc";

const PORT = process.env.PORT

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentación de la API de Cinemas",
        version: "1.0.0",
        description: "API REST con Express + Swagger",
    },
    servers: [
        {
            url: `http://localhost:${PORT}/api`,
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['src/app/modules/**/*.ts'], // rutas donde están los comentarios Swagger
};

export const swaggerSpec = swaggerJsdoc(options);
