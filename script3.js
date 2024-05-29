// Función para cargar los finalistas desde el archivo
function cargarFinalistas() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        console.log("Archivo cargado con éxito");
        var contenido = event.target.result;
        var finalistas = parsearContenido(contenido);

        // Mostrar solo los dos primeros finalistas en la tabla
        var finalistasAMostrar = finalistas.slice(0, 2);

        mostrarFinalistas(finalistasAMostrar, 'tablaCasinoSFE');
    };

    reader.onerror = function(event) {
        console.error("Error al cargar el archivo:", event.target.error);
    };

    reader.readAsText(file);
}

// Función para mostrar los finalistas en una tabla específica
function mostrarFinalistas(finalistas, tablaId) {
    var tabla = document.getElementById(tablaId);
    var tbody = tabla.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpiar cualquier contenido previo en la tabla

    finalistas.forEach(function(nombre) {
        var fila = document.createElement('tr');

        // Celda para el nombre del finalista
        var celdaNombre = document.createElement('td');
        celdaNombre.textContent = nombre;
        fila.appendChild(celdaNombre);

        tbody.appendChild(fila);
    });
}

// Función para parsear el contenido del archivo y extraer los nombres de los finalistas
function parsearContenido(contenido) {
    // Dividir el contenido en líneas
    var lineas = contenido.split('\n');
    // Eliminar las líneas vacías y devolver un array con los finalistas
    return lineas.filter(Boolean);
}

// Agregar un listener al input de archivo para cargar los finalistas cuando se seleccione un archivo
document.getElementById('fileInput').addEventListener('change', cargarFinalistas);
