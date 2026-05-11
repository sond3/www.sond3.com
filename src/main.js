import { initTheme } from "/scripts/theme.js";
import "/scripts/layout.js";

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

const activeFilters = new Set();

function applyFilters() {
    projectItems.forEach((item) => {
        if (activeFilters.size === 0) {
            item.classList.remove("is-inactive");
        } else {
            const cats = item.dataset.categories.split(",");
            const matches = [...activeFilters].some((f) => cats.includes(f));
            item.classList.toggle("is-inactive", !matches);
        }
    });
}

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        if (activeFilters.has(filter)) {
            activeFilters.delete(filter);
            btn.classList.remove("is-active");
        } else {
            activeFilters.add(filter);
            btn.classList.add("is-active");
        }

        applyFilters();
    });
});

