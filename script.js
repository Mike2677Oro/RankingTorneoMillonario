// Variable para llevar el registro de la ronda actual
var rondaActual = 1; // Comienza desde la ronda 1

// Función para cargar los participantes desde el archivo
function cargarParticipantes() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        console.log("Archivo cargado con éxito");
        var contenido = event.target.result;
        var participantes = parsearContenido(contenido);

        // Dividir los participantes en grupos de 8 para cada ronda
        var rondas = dividirEnRondas(participantes);

        // Mostrar las rondas
        mostrarRondas(rondas);
    };

    reader.onerror = function(event) {
        console.error("Error al cargar el archivo:", event.target.error);
    };

    reader.readAsText(file);
}

// Función para parsear el contenido del archivo y extraer los nombres de los participantes
function parsearContenido(contenido) {
    // Dividir el contenido en líneas
    var lineas = contenido.split('\n');
    // Eliminar las líneas vacías y dividir cada línea por comas para obtener los nombres de los participantes
    return lineas.filter(Boolean).flatMap(function(linea) {
        return linea.split(',');
    });
}

// Función para dividir los participantes en grupos de 8 para cada ronda
function dividirEnRondas(participantes) {
    var rondas = [];
    for (var i = 0; i < participantes.length; i += 8) {
        rondas.push(participantes.slice(i, i + 8));
    }
    return rondas;
}

// Función para mostrar las rondas
function mostrarRondas(rondas) {
    var tablaSFE = document.getElementById('tablaSFE');
    var tablaBPlay = document.getElementById('tablaBPlay');

    // Limpiar cualquier contenido previo en las tablas
    limpiarTabla(tablaSFE);
    limpiarTabla(tablaBPlay);

    // Mostrar solo los participantes de la ronda actual en la tabla de arriba
    var participantesActuales = rondas[rondaActual - 1]; // Restamos 1 para obtener el índice correcto
    mostrarParticipantes(tablaSFE, participantesActuales, true);

    // Si no es la última ronda, mostrar los participantes de la siguiente ronda en la tabla de abajo
    if (rondaActual < 16) { // Se detiene después de la ronda 16
        var siguientesParticipantes = rondas[rondaActual];
        mostrarParticipantes(tablaBPlay, siguientesParticipantes, false);
    } else {
        // Si es la última ronda, ocultar la tabla de abajo y mostrar el botón para avanzar a la semifinal
        tablaBPlay.style.display = 'none';
        mostrarBotonSemifinal();
    }

    // Cambiar los títulos de las tablas
    cambiarTitulosTablas();
    
    // Agregar un botón para avanzar a la siguiente ronda si no es la ronda 15
    if (rondaActual < 15) {
        agregarBotonAvanzar(rondas);
    }
}

// Función para mostrar el botón para avanzar a la semifinal
function mostrarBotonSemifinal() {
    var botonSemifinal = document.getElementById('botonSemifinal');
    if (!botonSemifinal) {
        botonSemifinal = document.createElement('button');
        botonSemifinal.id = 'botonSemifinal';
        botonSemifinal.textContent = "Avanzar a la semifinal";
        botonSemifinal.onclick = function() {
            // Redirigir a la página semifinalistas.html
            window.location.href = 'semifinalistas.html';
        };
        document.body.appendChild(botonSemifinal);
    }
}

// Función para agregar un botón para avanzar a la siguiente ronda
function agregarBotonAvanzar(rondas) {
    var botonAvanzar = document.getElementById('botonAvanzar');
    if (!botonAvanzar) {
        botonAvanzar = document.createElement('button');
        botonAvanzar.id = 'botonAvanzar';
        botonAvanzar.textContent = "Avanzar a la siguiente ronda";
        botonAvanzar.onclick = function() {
            avanzarRonda(rondas);
        };
        document.body.appendChild(botonAvanzar);
    }
}

// Función para mostrar los participantes en una tabla
function mostrarParticipantes(tabla, participantes) {
    var maquinasAsignadas = asignarMaquinas(participantes.length);

    participantes.forEach(function(nombre, indice) {
        var fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${tabla.id === 'tablaSFE' ? 'Máquina ' + maquinasAsignadas[indice] : 'Máquina -'}
        `;
        tabla.appendChild(fila);
    });
}

// Función para asignar máquinas aleatorias sin repetirse
function asignarMaquinas(numParticipantes) {
    var maquinasAsignadas = [];
    var maquinasDisponibles = Array.from({length: 8}, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7, 8]

    for (var i = 0; i < numParticipantes; i++) {
        var index = Math.floor(Math.random() * maquinasDisponibles.length);
        var maquinaAsignada = maquinasDisponibles.splice(index, 1)[0];
        maquinasAsignadas.push(maquinaAsignada);
    }

    return maquinasAsignadas;
}

// Función para limpiar cualquier contenido previo en la tabla
function limpiarTabla(tabla) {
    tabla.innerHTML = '';
}

// Función para avanzar a la siguiente ronda
function avanzarRonda(rondas) {
    // Incrementar el número de ronda actual
    rondaActual++;

    // Mostrar las rondas actualizadas
    mostrarRondas(rondas);
}

// Función para cambiar los títulos de las tablas
function cambiarTitulosTablas() {
    var tituloSFE = document.getElementById('tituloSFE');
    var tituloBPlay = document.getElementById('tituloBPlay');
    
    // Si la ronda actual es par, mostrar "Casino SFE" en la tabla superior y "bplay" en la tabla inferior
    if (rondaActual % 2 === 0) {
        tituloSFE.textContent = `Ronda ${rondaActual} - Casino Santa Fe`;
        tituloBPlay.textContent = `Ronda ${rondaActual + 1} - bplay`;
    } else {
        // Si la ronda actual es impar, mostrar "bplay" en la tabla superior y "Casino SFE" en la tabla inferior
        tituloSFE.textContent = `Ronda ${rondaActual} - bplay`;
        tituloBPlay.textContent = `Ronda ${rondaActual + 1} - Casino Santa Fe`;
    }
}

// Agregar un listener al input de archivo para cargar los participantes cuando se seleccione un archivo
document.getElementById('fileInput').addEventListener('change', cargarParticipantes);
