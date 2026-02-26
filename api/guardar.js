const mongoose = require('mongoose');

// 1. Definimos cómo se guardarán los datos de cada estudiante
const resultadoSchema = new mongoose.Schema({
    nombre: String,
    area: String,
    puntos: Number,
    fecha: { type: Date, default: Date.now }
});

// 2. Creamos el modelo (evitando que Vercel lo duplique por error)
const Resultado = mongoose.models.Resultado || mongoose.model('Resultado', resultadoSchema);

// 3. Esta es la función principal que recibe los datos desde tu página web
export default async function handler(req, res) {
    // Solo permitimos que la página "envíe" datos (POST), no que los pida
    if (req.method !== 'POST') {
        return res.status(405).json({ mensaje: 'Método no permitido. Usa POST.' });
    }

    try {
        // Conectamos a tu MongoDB usando la variable secreta de Vercel
        await mongoose.connect(process.env.MONGODB_URI);

        // Extraemos los datos que mandó el archivo script.js
        const { nombre, area, puntos } = req.body;

        // Creamos un nuevo registro con esos datos
        const nuevoResultado = new Resultado({ nombre, area, puntos });
        
        // Lo guardamos definitivamente en la base de datos
        await nuevoResultado.save();

        // Le avisamos a tu página que todo salió perfecto
        res.status(200).json({ mensaje: '¡Resultado guardado exitosamente en MongoDB!' });
        
    } catch (error) {
        console.error("Error al guardar en la base de datos:", error);
        res.status(500).json({ error: 'Error conectando a la base de datos' });
    }
}