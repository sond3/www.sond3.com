const STORAGE_KEY = "project-layout";

const list = document.querySelector(".project-list");
const btnImg = document.querySelector(".change-layout-as-img");
const btnList = document.querySelector(".change-layout-as-list");

// Asignar un view-transition-name único a cada item
document.querySelectorAll(".project-item").forEach((item, i) => {
    item.style.viewTransitionName = `project-item-${i}`;
});

function setLayout(isImg) {
    list.classList.toggle("as-img", isImg);
    btnImg?.classList.toggle("is-active", isImg);
    btnList?.classList.toggle("is-active", !isImg);
    localStorage.setItem(STORAGE_KEY, isImg ? "as-img" : "as-list");
}

function setLayoutWithTransition(isImg) {
    if (document.startViewTransition) {
        document.startViewTransition(() => setLayout(isImg));
    } else {
        setLayout(isImg);
    }
}

if (list) {
    delete document.documentElement.dataset.layoutAsImg;
    setLayout(localStorage.getItem(STORAGE_KEY) !== "as-list");

    btnImg?.addEventListener("click", () => setLayoutWithTransition(true));
    btnList?.addEventListener("click", () => setLayoutWithTransition(false));
}

// Hover preview a nivel de body para evitar problemas de stacking context
if (list) {
    const previewEl = document.createElement('div');
    previewEl.className = 'project-hover-preview';
    document.body.appendChild(previewEl);

    list.querySelectorAll('.project-item').forEach(item => {
        const media = item.querySelector('img, video');
        if (!media) return;

        item.addEventListener('mouseenter', () => {
            if (list.classList.contains('as-img')) return;
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

// Envolver texto entre paréntesis en project-item-title con un <span>
document.querySelectorAll(".project-item-title").forEach((el) => {
    el.innerHTML = el.innerHTML.replace(
        /(\([^)]+\))/g,
        '<span class="project-item-title-colab">$1</span>'
    );
});
