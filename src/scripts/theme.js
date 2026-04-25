const STORAGE_KEY = "theme";
const DARK = "dark";
const LIGHT = "light";

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}

function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || (matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT);
}

export function initTheme() {
    applyTheme(getPreferred());

    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === DARK ? LIGHT : DARK;
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
    });
}

