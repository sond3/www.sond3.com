const STORAGE_KEY = "project-layout";

const btn = document.querySelector(".change-layout");
const list = document.querySelector(".project-list");

if (btn && list) {
    if (localStorage.getItem(STORAGE_KEY) === "as-img") {
        list.classList.add("as-img");
    }

    btn.addEventListener("click", () => {
        list.classList.toggle("as-img");
        localStorage.setItem(STORAGE_KEY, list.classList.contains("as-img") ? "as-img" : "");
    });
}
