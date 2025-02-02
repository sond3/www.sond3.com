export function imageNavigation() {
    const projectItems = document.querySelectorAll('.projects-item-info');
    const projectMedias = document.querySelectorAll('.projects-item-media');

    projectItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const media = projectMedias[index];

            if (media.classList.contains('is-visible')) {
                // Si el elemento ya tiene la clase is-visible, la quitamos
                media.classList.remove('is-visible');
            } else {
                // Ocultar todos los elementos .projects-item-media
                projectMedias.forEach(media => {
                    media.classList.remove('is-visible');
                });

                // Mostrar el elemento .projects-item-media correspondiente
                media.classList.add('is-visible');

                // Desplazar el elemento .projects-item-info a la parte superior
                item.scrollIntoView({ block: 'start' });
            }
        });
    });
}