export function imageNavigation() {
    const projectInfo = document.querySelectorAll('.projects-item-info');
    const projectItem = document.querySelectorAll('.projects-item');

    // Agregar la clase has-media al primer elemento por defecto
    if (projectItem.length > 0) {
        projectItem[0].classList.add('has-media');
    }

    projectInfo.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            const media = projectItem[index];

            // Verificar si el clic se realizó en una etiqueta <a>
            if (event.target.tagName.toLowerCase() === 'a') {
                // Si el elemento no tiene la clase has-media, permitir el despliegue
                if (!media.classList.contains('has-media')) {
                    projectItem.forEach(media => {
                        media.classList.remove('has-media');
                    });
                    media.classList.add('has-media');
                    item.scrollIntoView({ block: 'start' });
                }
                return;
            }

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