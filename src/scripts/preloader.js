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
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const edges = [
        { x: 0,   y: -vh },  // arriba
        { x: vw,  y: 0   },  // derecha
        { x: 0,   y: vh  },  // abajo
        { x: -vw, y: 0   },  // izquierda
    ];

    letters.forEach((letter, i) => {
        // Las primeras 4 letras cubren un lado cada una, las restantes son aleatorias
        const edgeIndex = i < edges.length ? i : Math.floor(Math.random() * edges.length);
        const edge = edges[edgeIndex];
        const jitter = gsap.utils.random(-0.3, 0.3);
        gsap.set(letter, {
            x: edge.x + (edge.y === 0 ? 0 : vw * jitter),
            y: edge.y + (edge.x === 0 ? 0 : vh * jitter),
        });
    });

    gsap.timeline({ delay: 1 })
        // Letras vuelan a su posición desde fuera
        .to(letters, {
            x: 0, y: 0,
            duration: 3,
            ease: "elastic.out(1, 0.4)",
            stagger: { each: 0.20, from: "random" },
        })
        // Pausa con el logo formado
        .to({}, { duration: 0.4 })
        // Fondo desaparece — logo real visible por debajo sin swap
        .to(preloader, {
            opacity: 0,
            duration: 0.55,
            ease: "power2.inOut",
            onComplete: () => {
                document.body.style.overflow = "";
                preloader.remove();
            },
        });
}
