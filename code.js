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
                <div class="text-container">
                    <h2 class="note-title">${note.title || "Sin título"}</h2>
                    <p class="note-date">${formattedDate}</p>
                    <p class="note-time">${formattedTime}</p>
                </div>
                <div class="image-container">
                    <img src="${note.mood || 'default.png'}" alt="Mood seleccionado" class="note-mood" width="100" height="100">
                </div>
            </div>
            <p class="note-description">${note.description ? note.description.split("\n")[0] : "No hay descripción."}</p>
        `;

        notesContainer.appendChild(noteElement);
    });
}

