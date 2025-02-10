export function copyImageToInfo() {
    document.querySelectorAll(".projects-item").forEach((item) => {
        let mediaDiv = item.querySelector(".projects-item-media");
        let infoDiv = item.querySelector(".projects-item-info");

        if (!mediaDiv || !infoDiv) return;

        let firstSource = mediaDiv.querySelector("source[srcset$='-s.webp']");

        if (firstSource) {
            let imgTag = firstSource.parentElement.querySelector("img");
            if (!imgTag) return;

            let newImg = document.createElement("img");
            newImg.src = firstSource.getAttribute("srcset");
            newImg.alt = imgTag.alt;
            newImg.classList.add("project-media-preview");

            // Agregar la imagen al infoDiv
            infoDiv.appendChild(newImg);

            // Movimiento fluido con easing
            let targetX = 0;
            let currentX = 0;
            const easeFactor = 0.05; // Factor de suavizado

            const onMouseMove = (e) => {
                targetX = e.clientX;
            };

            const animate = () => {
                const diff = targetX - currentX;
                currentX += diff * easeFactor;

                newImg.style.setProperty("--x", `${currentX}px`);
                requestAnimationFrame(animate);
            };

            document.addEventListener("mousemove", onMouseMove);
            animate(); // Iniciar la animación
        }
    });
}
