import mongoose from 'mongoose';

// 1. Definimos el esquema de los datos
const resultadoSchema = new mongoose.Schema({
    nombre: String,
    area: String,
    puntos: Number,
    fecha: { type: Date, default: Date.now }
});

// 2. Creamos el modelo
const Resultado = mongoose.models.Resultado || mongoose.model('Resultado', resultadoSchema);

// 3. Función principal para Netlify
export const handler = async (event, context) => {
    // Solo permitimos que la página envíe datos (POST)
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Método no permitido" };
    }

    try {
        // Conectamos a tu MongoDB Atlas
        await mongoose.connect(process.env.MONGODB_URI);

        // Extraemos los datos que mandó el script.js
        const { nombre, area, puntos } = JSON.parse(event.body);

        // Guardamos el nuevo registro
        const nuevoResultado = new Resultado({ nombre, area, puntos });
        await nuevoResultado.save();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje: '¡Resultado guardado exitosamente!' }),
        };
    } catch (error) {
        console.error("Error en la base de datos:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error conectando a la base de datos' }),
        };
    }
};
