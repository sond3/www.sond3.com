export function initPreloader(gsap) {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Mostrar si: recarga, o primera visita a la sesión
    // No mostrar si: navegación entre páginas del sitio
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    const isReload = navType === "reload";
    const isFirstVisit = !sessionStorage.getItem("preloaderShown");

    if (!isReload && !isFirstVisit) {
        preloader.remove();
        return;
    }
    sessionStorage.setItem("preloaderShown", "1");

    const preloaderLogo = preloader.querySelector(".preloader-logo");
    const realLogo = document.querySelector(".logo");
    if (!preloaderLogo || !realLogo) return;

    // Scroll al top para que la posición del logo sea predecible
    window.scrollTo(0, 0);

    // Bloquear scroll durante el preloader
    document.body.style.overflow = "hidden";

    // Copiar estilos computados del logo real
    const cs = getComputedStyle(realLogo);
    preloaderLogo.style.fontSize     = cs.fontSize;
    preloaderLogo.style.letterSpacing = cs.letterSpacing;
    preloaderLogo.style.lineHeight   = cs.lineHeight;

    // Posicionar el logo del preloader encima del real
    const rect = realLogo.getBoundingClientRect();
    gsap.set(preloaderLogo, { top: rect.top, left: rect.left });

    const letters = [...preloaderLogo.querySelectorAll("span")];
    const vh = window.innerHeight;

    letters.forEach((letter, i) => {
        const fromTop = i % 2 === 0;
        gsap.set(letter, {
            y: fromTop ? -vh : vh,
            rotate: gsap.utils.random(-180, 180),
        });
    });

    gsap.timeline({ delay: .25 })
        // Letras vuelan a su posición desde fuera
        .to(letters, {
            y: 0,
            rotate: 0,
            duration: 3.25,
            ease: "elastic.out(0.5, 0.25)",
            stagger: { each: 0.2, from: "start" },
        })
        // Pausa con el logo formado
        .to({}, { duration: 0.125 })
        // Fondo desaparece — logo real visible por debajo sin swap
        .to(preloader, {
            opacity: 0,
            duration: 0.250,
            ease: "power2.inOut",
            onComplete: () => {
                document.body.style.overflow = "";
                preloader.remove();
            },
        });
}
