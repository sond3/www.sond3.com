export function animateImagesOnLoad() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    lazyImages.forEach((img) => {
        img.classList.add('img-loading'); // Añade la clase de carga inicial

        img.addEventListener('load', () => {
            img.classList.remove('img-loading');
            img.classList.add('img-loaded'); // Añade la clase de animación cuando la imagen se carga
        });

        // Para imágenes que ya están en caché
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
}