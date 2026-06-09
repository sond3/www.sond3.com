// Dominant color extract — sond3
// En modo as-img: muestra el color dominante de cada foto.
// Hover: revela la foto en color.

export function initColorExtract() {
    const list = document.querySelector(".project-list");
    if (!list) return;

    new MutationObserver(() => {
        if (list.classList.contains("as-img")) {
            requestAnimationFrame(() => extractAll(list));
        }
    }).observe(list, { attributes: true, attributeFilter: ["class"] });

    if (list.classList.contains("as-img")) extractAll(list);
}

function extractAll(list) {
    list.querySelectorAll(".project-item").forEach((item) => {
        if (item.dataset.colorDone) return;
        const img = item.querySelector("img");
        if (!img) return;
        item.dataset.colorDone = "1";
        extractColor(item, img);
    });
}

async function extractColor(item, img) {
    const SIZE = 60;

    try {
        // Espera a que la imagen esté lista
        if (!img.complete || !img.naturalWidth) {
            await new Promise((res, rej) => {
                img.addEventListener("load", res, { once: true });
                img.addEventListener("error", rej, { once: true });
                setTimeout(rej, 5000);
            });
        }

        const bmp = await createImageBitmap(img, {
            resizeWidth: SIZE,
            resizeHeight: SIZE,
            resizeQuality: "low",
        });

        const canvas = new OffscreenCanvas(SIZE, SIZE);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bmp, 0, 0);
        bmp.close();

        const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
        const bins = {};
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const brightness = (r + g + b) / 3;
            if (brightness < 15 || brightness > 240) continue;
            const qr = Math.round(r / 24) * 24;
            const qg = Math.round(g / 24) * 24;
            const qb = Math.round(b / 24) * 24;
            const key = `${qr},${qg},${qb}`;
            bins[key] = (bins[key] || 0) + 1;
        }

        let dominant = null;
        let max = 0;
        for (const [key, count] of Object.entries(bins)) {
            if (count > max) { max = count; dominant = key; }
        }

        if (dominant) {
            item.style.setProperty("--item-color", `rgb(${dominant})`);
        }
    } catch (e) {
        console.warn("[colorExtract] error:", img.src, e);
    }
}
