export function imageNavigation() {
    let currentIndex = 0; // Índice de la imagen actualmente visible
    const pictures = document.querySelectorAll('.projects picture');
    const totalPictures = pictures.length;

    // Inicialmente, oculta todas las imágenes excepto la primera
    pictures.forEach((pic, index) => {
        pic.style.display = index === 0 ? '' : 'none';
    });

    function showPicture(move) {
        pictures[currentIndex].style.display = 'none';
        currentIndex += move;
        if (currentIndex >= totalPictures) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = totalPictures - 1;
        }
        pictures[currentIndex].style.display = '';
    }

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 39) { // Flecha derecha
            showPicture(1);
        } else if (event.keyCode === 37) { // Flecha izquierda
            showPicture(-1);
        }
    });

    // Forzar el foco en el cuerpo del documento al cargar
    document.body.tabIndex = -1; // Hace que el cuerpo sea enfocable sin mostrar el indicador de foco
    document.body.focus(); // Pone el foco en el cuerpo del documento
}