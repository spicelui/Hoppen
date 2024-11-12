function replaceA(event) {
    const input = event.target;
    input.value = input.value.replace(/a/g, 'ɑ');
    input.value = input.value.replace(/á/g, 'ɑ́');
}

function autoResize(textarea) {
    // Solo cambiar el tamaño si el contenido no cabe en el área visible
    if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = 'auto'; // Reinicia el alto
        textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta al nuevo alto necesario
    }
}
function searchNotes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase(); // Obtener el término de búsqueda y convertirlo a minúsculas
    const notesContainer = document.getElementById('notes-container'); // El contenedor donde se muestran las notas
    notesContainer.innerHTML = ''; // Limpiar el contenedor de notas

    // Obtener notas del localStorage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Filtrar las notas por el término de búsqueda
    const filteredNotes = notes.filter(note => {
        const title = note.title ? note.title.toLowerCase() : '';
        const description = note.description ? note.description.toLowerCase() : '';
        return title.includes(searchTerm) || description.includes(searchTerm); // Verifica si el término de búsqueda está en el título o descripción
    });

    // Mostrar las notas filtradas
    filteredNotes.forEach((note, index) => {
        const { formattedDate, formattedTime } = formatDateTime(note.date);

        const noteElement = document.createElement('div');
        noteElement.classList.add('note-container');

        noteElement.innerHTML = `
            <div class="notelayout">
            <div class="image-container">
                <img src="${note.mood || 'default.png'}" alt="Mood seleccionado" class="note-mood" width="74" height="74">
            </div>
            <div class="text-container">
                <h2 class="note-title">${note.title || "Untitled"}</h2>
            </div>
        </div>
        <p class="note-description">${note.description ? note.description.split("\n")[0] : "No hɑy descripción."}</p>
         <p class="note-date">${formattedDate}</p>
         <p class="note-time">${formattedTime}</p>
    `;
        notesContainer.appendChild(noteElement);
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('es-ES', dateOptions);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return { formattedDate, formattedTime };
}

let notes = JSON.parse(localStorage.getItem('notes')) || [];
const notesContainer = document.getElementById('notes-container');
notes = notes.sort((a, b) => new Date(b.date) - new Date(a.date));

notes.forEach((note, index) => {
    const { formattedDate, formattedTime } = formatDateTime(note.date);

    const noteElement = document.createElement('div');
    noteElement.classList.add('note-container');

    noteElement.innerHTML = `
        <div class="notelayout">
            <div class="image-container">
                <img src="${note.mood || 'default.png'}" alt="Mood seleccionado" class="note-mood" width="90" height="90">
            </div>
            <div class="text-container">
                <h2 class="note-title">${note.title || "Untitled"}</h2>
            </div>
        </div>
        <p class="note-description">${note.description ? note.description.split("\n")[0] : "No hɑy descripción."}</p>
         <p class="note-date">${formattedDate}</p>
         <p class="note-time">${formattedTime}</p>
    `;

    notesContainer.appendChild(noteElement);

    // Redirigir a la página de edición al hacer clic en el contenedor
    noteElement.addEventListener('click', () => {
        window.location.href = `create.html?noteIndex=${index}`;
    });
});

// Función para borrar una nota
function deleteNote(create) {
    notes.splice(create, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    window.location.reload(); // Recargar para actualizar la lista de notas
}
