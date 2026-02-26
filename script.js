// ==========================================
// 1. BASE DE DATOS DE PREGUNTAS Y CONTEXTO
// ==========================================
const preguntas = [
    {
        pregunta: "¿Quién fue Antonio Lenin Fonseca?",
        opciones: ["Un cantante", "Un héroe nacional", "Un deportista"],
        respuestaCorrecta: 1, 
        imagenContexto: "public/imagen1.jpg",
        bioContexto: "Antonio Lenín Fonseca fue un destacado militante y médico nicaragüense que entregó su vida por la liberación de su país, convirtiéndose en un verdadero héroe nacional."
    },
    {
        pregunta: "¿De qué país fue Antonio Lenin Fonseca?",
        opciones: ["México", "Costa Rica", "Nicaragua"],
        respuestaCorrecta: 2, 
        imagenContexto: "public/imagen2.jpg",
        bioContexto: "Nació en la ciudad de León, Nicaragua, en 1951, y dedicó su juventud y su carrera profesional a luchar por el bienestar y la libertad del pueblo nicaragüense."
    },
    {
        pregunta: "¿Qué profesión tenía Antonio Lenin Fonseca?",
        opciones: ["Ingeniero", "Periodista", "Médico"],
        respuestaCorrecta: 2, 
        imagenContexto: "public/imagen3.jpg",
        bioContexto: "Ingresó a la escuela de medicina de la Universidad Nacional Autónoma de Nicaragua entre 1970 y 1971."
    },
    {
        pregunta: "¿En qué año se incorporó Antonio Lenin Fonseca al Frente Sandinista de Liberación Nacional?",
        opciones: ["1970", "1980", "1990"],
        respuestaCorrecta: 0, 
        imagenContexto: "public/imagen4.jpg",
        bioContexto: "Fue incorporado al FSLN por Francisco Jose Jarquin <Camilo> y por su hermano William Fonseca alrededor de 1970."
    },
    {
        pregunta: "¿Con qué pseudónimo era conocido Lenin Fonseca en las filas revolucionarias?",
        opciones: ["Roger", "Ariel", "Pedro"],
        respuestaCorrecta: 1, 
        imagenContexto: "public/imagen5.jpg",
        bioContexto: "En la clandestinidad y durante las misiones, era conocido por sus compañeros de lucha con el seudónimo de 'Ariel', un nombre que inspiraba respeto y valentía."
    },
    {
        pregunta: "¿Qué valor representó Antonio Lenin Fonseca?",
        opciones: ["Egoísmo", "Solidaridad", "Pereza"],
        respuestaCorrecta: 1, 
        imagenContexto: "public/imagen6.jpg",
        bioContexto: "Representó la solidaridad absoluta, demostrándolo al atender sin descanso a los más necesitados y al arriesgar su propia vida por el bienestar colectivo."
    },
    {
        pregunta: "¿Qué podemos aprender de Antonio Lenin Fonseca?",
        opciones: ["A no estudiar", "A ser solidarios y justos", "A pelear"],
        respuestaCorrecta: 1, 
        imagenContexto: "public/imagen7.jpg",
        bioContexto: "Su mayor legado es la enseñanza de que debemos ser solidarios y justos, utilizando nuestras habilidades y conocimientos para ayudar a nuestra comunidad."
    },
    {
        pregunta: "¿Cómo podemos seguir su ejemplo?",
        opciones: ["Ayudando a los demás", "Ignorando a los demás", "Rompiendo reglas"],
        respuestaCorrecta: 0, 
        imagenContexto: "public/imagen8.jpg",
        bioContexto: "La mejor forma de honrar su memoria en nuestro día a día es aplicando sus valores: ayudando a nuestros compañeros y aportando positivamente a la sociedad."
    },
    {
        pregunta: "¿Por qué es importante Antonio Lenin Fonseca para la memoria histórica de Nicaragua?",
        opciones: [
            "Por qué su lucha ayuda a recordar los hechos históricos del país", 
            "Por qué representa los valores de sacrificio, justicia y compromiso social", 
            "Por qué su ejemplo permite que las nuevas generaciones conozcan y valoren la historia nacional", 
            "Todas las anteriores"
        ],
        respuestaCorrecta: 3, 
        imagenContexto: "public/imagen9.jpg",
        bioContexto: "Su figura histórica es fundamental porque encarna el sacrificio heroico y sirve de inspiración para que las nuevas generaciones valoren la historia y construyan un país mejor."
    },
    {
        pregunta: "¿Qué institución lleva su nombre como homenaje?",
        opciones: ["Hospital", "Biblioteca", "Escuela"],
        respuestaCorrecta: 0, 
        imagenContexto: "public/imagen10.jpg",
        bioContexto: "El importante Hospital Escuela Antonio Lenín Fonseca, ubicado en Managua, lleva su nombre para honrar eternamente su dedicación como médico y su sacrificio por la salud del país."
    }
];

// ==========================================
// 2. VARIABLES Y ESTADO
// ==========================================
let preguntaActual = 0;
let puntos = 0;
let usuario = { nombre: "", area: "" }; 
let reporteRespuestas = [];

const PUNTOS_POR_ACIERTO = 10;
const PUNTOS_POR_FALLO = -5;

// ==========================================
// 3. REFERENCIAS AL DOM
// ==========================================
const pantallaRegistro = document.getElementById('pantalla-registro');
const pantallaQuiz = document.getElementById('pantalla-quiz');
const pantallaResultados = document.getElementById('pantalla-resultados');
const contenedorPregunta = document.getElementById('texto-pregunta');
const contenedorOpciones = document.getElementById('contenedor-opciones');
const modalContexto = document.getElementById('modal-contexto');
const marcadorPuntos = document.getElementById('marcador-puntos');
const contadorPregunta = document.getElementById('contador-pregunta');

// ==========================================
// 4. LÓGICA DEL JUEGO
// ==========================================

function startQuiz() {
    const inputNombre = document.getElementById('input-nombre').value.trim();
    const inputArea = document.getElementById('input-area').value;

    usuario.nombre = inputNombre !== "" ? inputNombre : "Estudiante";
    usuario.area = inputArea !== "" ? inputArea : "General";
    
    pantallaRegistro.style.display = 'none';
    pantallaQuiz.style.display = 'block';
    
    cargarPregunta();
}

function cargarPregunta() {
    const datosPregunta = preguntas[preguntaActual];
    
    contadorPregunta.innerText = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
    contenedorPregunta.innerText = `${preguntaActual + 1}. ${datosPregunta.pregunta}`;
    contenedorOpciones.innerHTML = '';

    datosPregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.innerText = opcion;
        boton.className = 'boton-opcion w-full text-left bg-[#f8fafc] hover:bg-[#e2e8f0] text-[#2d1b4e] font-semibold py-4 px-6 rounded-xl border-2 border-transparent focus:border-[#ff4d6d] transition-all shadow-sm';
        boton.onclick = (e) => seleccionarRespuesta(index, e);
        contenedorOpciones.appendChild(boton);
    });
}

function seleccionarRespuesta(indexSeleccionado, evento) {
    crearAroDeLuz(evento);
    
    const datosPregunta = preguntas[preguntaActual];
    const esCorrecta = (indexSeleccionado === datosPregunta.respuestaCorrecta);

    if (esCorrecta) {
        puntos += PUNTOS_POR_ACIERTO;
        marcadorPuntos.innerText = puntos;
        lanzarConfeti();
    } else {
        puntos += PUNTOS_POR_FALLO;
        marcadorPuntos.innerText = puntos;
    }

    reporteRespuestas.push({
        pregunta: datosPregunta.pregunta,
        respuestaElegida: datosPregunta.opciones[indexSeleccionado],
        acertada: esCorrecta
    });

    mostrarModalContexto(datosPregunta, esCorrecta);
}

function mostrarModalContexto(datosPregunta, esCorrecta) {
    document.getElementById('modal-imagen').src = datosPregunta.imagenContexto; 
    
    const titulo = document.getElementById('modal-titulo');
    if(esCorrecta) {
        titulo.innerText = "¡Excelente!";
        titulo.style.color = "#4ade80"; 
    } else {
        titulo.innerText = "Respuesta Incorrecta";
        titulo.style.color = "#f87171"; 
    }
    
    document.getElementById('modal-bio').innerText = datosPregunta.bioContexto;
    modalContexto.style.display = 'flex';
}

function siguientePregunta() {
    modalContexto.style.display = 'none';
    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        cargarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    pantallaQuiz.style.display = 'none';
    pantallaResultados.style.display = 'block';

    document.getElementById('resultado-nombre').innerText = usuario.nombre;
    document.getElementById('resultado-area').innerText = usuario.area;
    document.getElementById('resultado-puntos').innerText = puntos;

    const listaReporte = document.getElementById('lista-reporte');
    listaReporte.innerHTML = '';
    
    reporteRespuestas.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = "border-b pb-2";
        li.innerHTML = `<strong class="text-[#2d1b4e]">${index + 1}. ${item.pregunta}</strong><br>
                        <span class="${item.acertada ? 'text-green-600' : 'text-red-500'} font-semibold">
                            ${item.acertada ? '✓ Correcto' : '✗ Fallaste (Elegiste: ' + item.respuestaElegida + ')'}
                        </span>`;
        listaReporte.appendChild(li);
    });

    // ==========================================
    // NUEVO: ENVIAR DATOS A LA BASE DE DATOS
    // ==========================================
    fetch('/api/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: usuario.nombre,
            area: usuario.area,
            puntos: puntos
        })
    })
    .then(respuesta => respuesta.json())
    .then(data => console.log("Guardado en BD:", data))
    .catch(error => console.error("Error al guardar:", error));
}

// ==========================================
// 5. EFECTOS VISUALES
// ==========================================

function crearAroDeLuz(evento) {
    const boton = evento.currentTarget;
    const circulo = document.createElement('span');
    const diametro = Math.max(boton.clientWidth, boton.clientHeight);
    const radio = diametro / 2;

    circulo.style.width = circulo.style.height = `${diametro}px`;
    circulo.style.left = `${evento.clientX - boton.getBoundingClientRect().left - radio}px`;
    circulo.style.top = `${evento.clientY - boton.getBoundingClientRect().top - radio}px`;
    circulo.classList.add('efecto-ripple');

    const rippleExistente = boton.querySelector('.efecto-ripple');
    if (rippleExistente) {
        rippleExistente.remove();
    }

    boton.appendChild(circulo);
}

function lanzarConfeti() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#2d1b4e', '#ffffff']
        });
    }
}