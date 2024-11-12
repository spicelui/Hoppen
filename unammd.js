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
// Función para establecer el color de acento
function setAccentColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
    localStorage.setItem('accentColor', color);
  }

  // Cargar el color guardado al cargar la página
  window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setAccentColor(savedColor);
      document.getElementById('color-select').value = savedColor;
    }
  });

  // Cambiar color de acento al seleccionar una opción
  document.getElementById('color-select').addEventListener('change', (event) => {
    setAccentColor(event.target.value);
  });

  if (colorGuardado) {
    document.documentElement.style.setProperty("--accent-red", colorGuardado);
    document.getElementById("colorSelect").value = colorGuardado;
}