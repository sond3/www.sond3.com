import gsap from "npm:gsap";

const STORAGE_KEY = "project-layout";

const list = document.querySelector(".project-list:not(.related-projects)");
const btnImg = document.querySelector(".change-layout-as-img");
const btnList = document.querySelector(".change-layout-as-list");

// En páginas de detalle no hay lista — limpiar el atributo del inline script
if (!list) {
    delete document.documentElement.dataset.layoutAsImg;
}

// Asignar un view-transition-name único a cada item
document.querySelectorAll(".project-item").forEach((item, i) => {
    item.style.viewTransitionName = `project-item-${i}`;
});

// ─── Parallax de velocidad de scroll (solo modo imagen) ─────────────────────
let parallaxItems = [];
let parallaxFactors = [];
let scrollVelocity = 0;
let lastScrollY = 0;
let parallaxRafId = null;
let scrollHandler = null;

function parallaxTick() {
    scrollVelocity *= 0.84; // decaimiento → los items vuelven a 0
    parallaxItems.forEach((item, i) => {
        gsap.set(item, { y: scrollVelocity * parallaxFactors[i] });
    });
    if (Math.abs(scrollVelocity) > 0.25) {
        parallaxRafId = requestAnimationFrame(parallaxTick);
    } else {
        // Volver suavemente a su posición original
        parallaxItems.forEach(item =>
            gsap.to(item, { y: 0, duration: 0.7, ease: "power3.out" })
        );
        parallaxRafId = null;
    }
}

function initParallax() {
    if (!list) return;
    parallaxItems = [...list.querySelectorAll(".project-item")];

    // Detectar columnas reales por posición X en el DOM
    const xs = parallaxItems.map(item => Math.round(item.getBoundingClientRect().left));
    const uniqueX = [...new Set(xs)].sort((a, b) => a - b); // orden izq → der
    const colCount = uniqueX.length;

    // Factor por columna: izquierda → negativo (sube), derecha → positivo (baja)
        // Rango total: -0.8 … +0.8, más pequeño jitter por item dentro de su columna
        parallaxFactors = parallaxItems.map(item => {
            const x = Math.round(item.getBoundingClientRect().left);
            const colIdx = uniqueX.indexOf(x);
            const base = colCount > 1 ? (colIdx / (colCount - 1)) * 1.2 - 0.6 : 0;
            const jitter = (Math.random() - 0.5) * 0.08;
            return base + jitter;
        });

    lastScrollY = window.scrollY;

    scrollHandler = () => {
        const newY = window.scrollY;
        const delta = newY - lastScrollY;
        lastScrollY = newY;
        // Acumular velocidad con la dirección real del scroll
        scrollVelocity += delta * 1.7;
        scrollVelocity = Math.max(-65, Math.min(65, scrollVelocity)); // clamp
        if (!parallaxRafId) {
            parallaxRafId = requestAnimationFrame(parallaxTick);
        }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });
}

function destroyParallax() {
    cancelAnimationFrame(parallaxRafId);
    parallaxRafId = null;
    if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
        scrollHandler = null;
    }
    parallaxItems.forEach(item => gsap.set(item, { y: 0 }));
    parallaxItems = [];
    parallaxFactors = [];
    scrollVelocity = 0;
}
// ─────────────────────────────────────────────────────────────────────────────

function setLayout(isImg) {
    if (isImg) {
        document.documentElement.dataset.layoutAsImg = '';
    } else {
        delete document.documentElement.dataset.layoutAsImg;
    }
    list.classList.toggle("as-img", isImg);
    btnImg?.classList.toggle("is-active", isImg);
    btnList?.classList.toggle("is-active", !isImg);
    localStorage.setItem(STORAGE_KEY, isImg ? "as-img" : "as-list");
    destroyParallax();
    if (isImg) {
        // Esperar un frame para que el grid ya esté renderizado antes de calcular posiciones
        requestAnimationFrame(() => { requestAnimationFrame(initParallax); });
    }
}

function setLayoutWithTransition(isImg) {
    if (document.startViewTransition) {
        document.startViewTransition(() => setLayout(isImg));
    } else {
        setLayout(isImg);
    }
}

if (list) {
    setLayout(localStorage.getItem(STORAGE_KEY) !== "as-list");

    btnImg?.addEventListener("click", () => setLayoutWithTransition(true));
    btnList?.addEventListener("click", () => setLayoutWithTransition(false));
}

// Hover preview a nivel de body para evitar problemas de stacking context
const previewEl = document.createElement('div');
previewEl.className = 'project-hover-preview';
document.body.appendChild(previewEl);

function attachHoverPreview(container, alwaysShow = false) {
    container.querySelectorAll('.project-item').forEach(item => {
        const media = item.querySelector('img, video');
        if (!media) return;

        item.addEventListener('mouseenter', () => {
            if (!alwaysShow && container.classList.contains('as-img')) return;
            previewEl.innerHTML = '';
            const clone = media.cloneNode(true);
            if (clone.tagName === 'VIDEO') {
                clone.autoplay = true;
                clone.loop = true;
                clone.muted = true;
                clone.playsInline = true;
            }
            previewEl.appendChild(clone);
            previewEl.classList.add('is-visible');
        });

        item.addEventListener('mouseleave', () => {
            previewEl.classList.remove('is-visible');
        });
    });
}

if (list) {
    attachHoverPreview(list);
}

const relatedList = document.querySelector('.project-list.related-projects');
if (relatedList) {
    attachHoverPreview(relatedList, true);
}

// Envolver texto entre paréntesis en project-item-title con un <span>
document.querySelectorAll(".project-item-title").forEach((el) => {
    el.innerHTML = el.innerHTML.replace(
        /(\([^)]+\))/g,
        '<span class="project-item-title-colab">$1</span>'
    );
});
