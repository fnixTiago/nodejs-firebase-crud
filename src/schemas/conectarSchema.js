const { z } = require("zod");

// Definir el esquema de validación para un usuario
const ConectarSchema = z.object({
    name: z.string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
    score: z.number()
        .int({ message: "El score debe ser un entero" })
        .positive({ message: "El score debe ser un positivo" })
}).passthrough(); // Permite otros campos sin error, pero los eliminaremos después

// .strict(); // Esto asegura que no se acepten otros campos

// Middleware de validación
const validateConectar = (req, res, next) => {
    try {
        const parsedData = ConectarSchema.parse(req.body);

        // Solo conserva los campos validados (`name` y `score`)
        req.body = {
            name: parsedData.name,
            score: parsedData.score
        };
       next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

module.exports = validateConectar;
