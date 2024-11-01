const app =require("./src/app");

app.get("/", (req, res) => {
    res.send("¡Hola desde Firebase y Node.js en Vercel!");
});

// Cambia para usar el puerto asignado por Vercel o el puerto 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});