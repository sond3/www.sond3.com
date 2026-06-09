const STORAGE_KEY = "project-layout";

// Always remove the attribute set by the inline script in <head>
// (on detail pages there's no main list, but it still needs to be cleaned up)
delete document.documentElement.dataset.layoutAsImg;

const list = document.querySelector(".project-list:not(.related-projects)");
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
