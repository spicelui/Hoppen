const textarea = document.getElementById('description');

function autoResize() {
  // Restaurar el tamaño al valor mínimo para calcular el nuevo tamaño
  textarea.style.height = 'auto'; // Ajusta la altura a 'auto' primero para recalcular
  
  // Ajustar el ancho y la altura al contenido del textarea
  textarea.style.height = `${textarea.scrollHeight}px`;
}

// Llamar a la función al escribir o al presionar Enter
textarea.addEventListener('input', autoResize);
textarea.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    autoResize();
  }
});

// Llamar a la función al cargar la página para inicializar el tamaño
autoResize();

function replaceA(event) {
    const input = event.target;
    input.value = input.value.replace(/a/g, 'ɑ');
    input.value = input.value.replace(/á/g, 'ɑ́');
}

// Función para abrir el menú
function openMenu() {
    const menu = document.getElementById("image-menu");
    menu.style.display = "flex";
    setTimeout(() => {
        menu.classList.add("active"); // Activa la clase 'active' para animar
    }, 0); // Pequeño retraso para permitir que se inicie la animación
}

// Función para cerrar el menú
function closeMenu() {
    const menu = document.getElementById("image-menu");
    menu.classList.remove("active"); // Elimina la clase 'active' para animar el cierre
    setTimeout(() => {
        menu.style.display = "none"; // Oculta el menú después de la animación
    }, 500); // Después de la animación, oculta el menú
}

// Cerrar el menú al hacer clic fuera de la ventana blanca
document.getElementById("image-menu").addEventListener("click", function(event) {
    const menuContainer = document.querySelector(".menu-container");
    if (!menuContainer.contains(event.target)) {
        closeMenu(); // Si el clic es fuera de la ventana blanca, cierra el menú
    }
});

// Función para cambiar la imagen
function changeImage(imageSrc) {
    document.getElementById("main-image").src = imageSrc;
    closeMenu(); // Cierra el menú después de seleccionar una imagen
}

// Obtener el índice de la nota de la URL
const urlParams = new URLSearchParams(window.location.search);
const noteIndex = urlParams.get('noteIndex');
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Cargar la nota si existe un índice
if (noteIndex !== null && notes[noteIndex]) {
    const note = notes[noteIndex];
    document.getElementById('title').value = note.title || '';
    document.getElementById('date').value = note.date || '';
    document.getElementById('description').value = note.description || '';
    document.getElementById('main-image').src = note.mood || 'happy.png';

    autoResize(document.getElementById('title'));
    autoResize(document.getElementById('description'));
}

// Guardar o actualizar la nota
document.getElementById('save-btn').addEventListener('click', () => {
    const updatedNote = {
        title: document.getElementById('title').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value,
        mood: document.getElementById('main-image').src
    };

    // Actualizar la nota en localStorage
    if (noteIndex !== null) {
        notes[noteIndex] = updatedNote;
    } else {
        notes.push(updatedNote);  // Añadir nueva nota si no se está editando ninguna
    }

    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.href = 'index.html';
});


// Función para borrar una nota
function deleteNote() {
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.href = 'index.html'; // Redirigir al inicio
}

// Función para establecer la fecha y hora actuales solo si el campo de fecha está vacío
function setCurrentDateTime() {
    const dateInput = document.getElementById('date');

    // Verificar si el campo de fecha está vacío antes de asignar la fecha actual
    if (!dateInput.value) {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        dateInput.value = currentDateTime; // Asignar el valor solo si está vacío
    }
}

// Llamar a la función para establecer la fecha solo al cargar la página
window.onload = () => {
    setCurrentDateTime();
};

document.getElementById("export-btn").addEventListener("click", function(e) {
    e.preventDefault(); // Prevenir la acción predeterminada del enlace

    const notas = getNotas(); // Obtener las notas actuales de tu app
    const data = JSON.stringify(notas);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notas.json'; // El nombre del archivo a descargar
    a.click(); // Simular un clic para iniciar la descarga
    URL.revokeObjectURL(url); // Liberar el objeto URL
});

function getNotas() {
    // Aquí obtenemos la ruta de la imagen que está en el src
    const imagenSeleccionada = document.getElementById("main-image").src;
    
    // Extraer solo la ruta de la imagen (sin el dominio ni la ruta base)
    const imagenRuta = imagenSeleccionada.split('/').pop(); // Esto toma solo el nombre de la imagen, como "happy.png"
    
    return [
        { 
            "titulo": document.getElementById("title").value, 
            "contenido": document.getElementById("description").value, 
            "fecha": document.getElementById("date").value,
            "imagen": imagenRuta // Guardamos solo el nombre de la imagen
        }
    ];
}

document.getElementById("import-btn").addEventListener("click", function(e) {
    e.preventDefault(); // Prevenir la acción predeterminada del enlace
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json'; // Aceptamos solo archivos JSON
    input.click(); // Simulamos un clic para abrir el selector de archivos

    input.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const notas = JSON.parse(e.target.result);
                cargarNotas(notas); // Aquí cargas las notas a tu app
            };
            reader.readAsText(file); // Leemos el archivo como texto
        }
    });
});

function cargarNotas(notas) {
    // Cargar las notas importadas en tu aplicación
    if (notas.length > 0) {
        document.getElementById("title").value = notas[0].titulo;
        document.getElementById("description").value = notas[0].contenido;
        document.getElementById("date").value = notas[0].fecha;
        
        // Aquí asignamos la imagen desde la ruta guardada
        const imagenSeleccionada = notas[0].imagen;
        
        // Concatenamos la carpeta de las imágenes si es necesario
        const rutaImagen = 'imagenes/' + imagenSeleccionada; // Asegúrate de que la carpeta 'imagenes' esté correctamente configurada
        
        document.getElementById("main-image").src = rutaImagen; // Establecer el src de la imagen
    }
}
// theme.js
window.onload = () => {
    // Obtener el tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeSelect = document.getElementById('theme-select');

    // Aplicar el tema guardado
    if (savedTheme) {
        applyTheme(savedTheme);
        themeSelect.value = savedTheme; // Actualiza el select al valor guardado
    } else {
        // Si no hay tema guardado, usar el valor predeterminado basado en el sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        localStorage.setItem('theme', defaultTheme); // Guardar la preferencia por defecto
        applyTheme(defaultTheme);
        themeSelect.value = defaultTheme;
    }

    // Escuchar cambios en el select y actualizar el tema
    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        localStorage.setItem('theme', selectedTheme); // Guardar la nueva preferencia
        applyTheme(selectedTheme);
    });
};

function applyTheme(theme) {
    const body = document.body;

    if (theme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else if (theme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    } else if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
    }
}
