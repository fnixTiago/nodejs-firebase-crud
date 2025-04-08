const { z } = require("zod");

// Definir el esquema de validación para un usuario
const userSchema = z.object({
    name: z.string()
        .min(1, { message: "El nombre es obligatorio" })
        .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),

    lastname: z.string()
        .min(1, { message: "El apellido es obligatorio" })
        .max(100, { message: "El apellido debe tener menos de 100 caracteres" }),

    gender: z.enum(["male", "female", "other"], { message: "El género debe ser 'male', 'female' o 'other'" }),

    school: z.string()
        .min(1, { message: "La escuela debe tener al menos un carácter" })
        .max(100, { message: "El nombre de la escuela debe tener menos de 100 caracteres" })
        .optional(), // Hace que el campo school sea opcional

    age: z.number()
        .int({ message: "La edad debe ser un número entero" })
        .positive({ message: "La edad debe ser un número positivo" })
        .max(150, { message: "La edad debe ser menor o igual a 150" }) // Valida que sea razonable
}).passthrough(); // Permite otros campos sin error, pero los ignora después

// .strict(); // Esto asegura que no se acepten otros campos

// Middleware de validación
const validateConectar = (req, res, next) => {
    try {
        const parsedData = userSchema.parse(req.body);

        // Solo conserva los campos validados (`name` y `score`)
        req.body = {
            name : parsedData?.name,
            lastname : parsedData?.lastname,
            gender : parsedData?.gender,
            school : parsedData?.school,
            age : parsedData?.age
        };
       next();
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

module.exports = validateConectar;
