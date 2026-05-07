import { initTheme } from "/scripts/theme.js";

initTheme();

document.querySelectorAll("img[loading='lazy'], video").forEach((el) => {
    const markLoaded = () => el.classList.add("is-loaded");
    if (el.complete || el.readyState >= 2) {
        markLoaded();
    } else {
        el.addEventListener(el.tagName === "VIDEO" ? "canplay" : "load", markLoaded, { once: true });
    }
});

const filterBtns = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll("[data-categories]");

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        const isActive = btn.classList.contains("is-active");

        filterBtns.forEach((b) => b.classList.remove("is-active"));

        if (isActive) {
            projectItems.forEach((item) => item.classList.remove("is-inactive"));
        } else {
            btn.classList.add("is-active");
            projectItems.forEach((item) => {
                const cats = item.dataset.categories.split(",");
                item.classList.toggle("is-inactive", !cats.includes(filter));
            });
        }
    });
});

