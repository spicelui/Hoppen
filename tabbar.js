function setActive(event) {
    // quitar la clase "active" de todos los tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        
        // restaurar el ícono normal en tabs inactivos
        const icon = tab.querySelector('.icon');
        icon.textContent = icon.getAttribute('data-icon');
    });
    
    // añadir la clase "active" al tab clickeado
    const activeTab = event.currentTarget;
    activeTab.classList.add('active');

    // cambiar el ícono al de "activo"
    const activeIcon = activeTab.querySelector('.icon');
    activeIcon.textContent = activeIcon.getAttribute('data-icon-active');
}