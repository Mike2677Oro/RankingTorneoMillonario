// Función para cargar los participantes desde el archivo
function cargarParticipantes() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        console.log("Archivo cargado con éxito");
        var contenido = event.target.result;
        var participantes = parsearContenido(contenido);

        // Dividir los participantes en dos grupos para cada tabla
        var casinoSFE = participantes.slice(0, 8);
        var bplay = participantes.slice(8, 16);

        // Mostrar los participantes en las tablas junto con la asignación de máquinas
        mostrarParticipantesConMaquinasAleatorias(casinoSFE, 'tablaCasinoSFE', 'Máquina');
        mostrarParticipantesConMaquinasAleatorias(bplay, 'tablaBPlay', 'Máquina');
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
    // Eliminar las líneas vacías y devolver un array con los participantes
    return lineas.filter(Boolean);
}

// Función para mostrar los participantes en una tabla específica junto con la asignación de máquinas aleatorias y checkboxes
function mostrarParticipantesConMaquinasAleatorias(participantes, tablaId, maquinaLabel) {
    var tabla = document.getElementById(tablaId);
    var tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpiar cualquier contenido previo en el tbody

    // Generar un array con números de máquina aleatorios y no repetidos
    var maquinasAsignadas = generarMaquinasAleatorias(participantes.length);

    for (var i = 0; i < participantes.length; i++) {
        var fila = document.createElement('tr');
        
        // Celda para el nombre del participante
        var celdaNombre = document.createElement('td');
        celdaNombre.textContent = participantes[i]; // Nombre del participante
        fila.appendChild(celdaNombre);

        // Celda para la máquina asignada
        var celdaMaquina = document.createElement('td');
        celdaMaquina.textContent = `${maquinaLabel} ${maquinasAsignadas[i]}`; // Número de máquina
        fila.appendChild(celdaMaquina);

        
        tbody.appendChild(fila);
    }
}

// Función para generar máquinas aleatorias sin repetirse
function generarMaquinasAleatorias(numParticipantes) {
    var maquinasAsignadas = [];
    var maquinasDisponibles = Array.from({length: 8}, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7, 8]

    for (var i = 0; i < numParticipantes; i++) {
        var index = Math.floor(Math.random() * maquinasDisponibles.length);
        var maquinaAsignada = maquinasDisponibles.splice(index, 1)[0];
        maquinasAsignadas.push(maquinaAsignada);
    }

    return maquinasAsignadas;
}

// Agregar un listener al input de archivo para cargar los participantes cuando se seleccione un archivo
document.getElementById('fileInput').addEventListener('change', cargarParticipantes);
