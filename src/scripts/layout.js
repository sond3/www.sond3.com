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
    localStorage.setItem(STORAGE_KEY, isImg ? "as-img" : "");
}

function setLayoutWithTransition(isImg) {
    if (document.startViewTransition) {
        document.startViewTransition(() => setLayout(isImg));
    } else {
        setLayout(isImg);
    }
}

if (list) {
    setLayout(localStorage.getItem(STORAGE_KEY) === "as-img");

    btnImg?.addEventListener("click", () => setLayoutWithTransition(true));
    btnList?.addEventListener("click", () => setLayoutWithTransition(false));
}
