export function imageNavigation() {
    const projectInfo = document.querySelectorAll('.projects-item-info');
    const projectItem = document.querySelectorAll('.projects-item');

    projectInfo.forEach((item, index) => {
        item.addEventListener('click', () => {
            const media = projectItem[index];

            if (media.classList.contains('has-media')) {
                // Si el elemento ya tiene la clase has-media, la quitamos
                media.classList.remove('has-media');
            } else {
                // Ocultar todos los elementos .projects-item-media
                projectItem.forEach(media => {
                    media.classList.remove('has-media');
                });

                // Mostrar el elemento .projects-item-media correspondiente
                media.classList.add('has-media');

                // Desplazar el elemento .projects-item-info a la parte superior
                item.scrollIntoView({ block: 'start' });
            }
        });
    });
}