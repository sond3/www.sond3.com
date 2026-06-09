export function initCredits(gsap) {
    const credits = document.querySelector(".credits");
    const sentinel = document.querySelector(".credits-sentinel");
    if (!credits || !sentinel) return;

    const inner = credits.querySelector(".credits-inner");
    let currentTl = null;

    const playCredits = () => {
        if (currentTl) currentTl.kill();

        const scrollDist = inner.offsetHeight + window.innerHeight;
        const duration = scrollDist / 60;

        currentTl = gsap.timeline()
            .to(credits, {
                opacity: 1, duration: 0.8, ease: "power2.out",
                onStart: () => { credits.style.pointerEvents = "auto"; },
            })
            .fromTo(inner,
                { y: window.innerHeight * 0.9 },
                { y: -inner.offsetHeight, ease: "none", duration },
                0  // empieza al mismo tiempo que el fade in
            )
            .to(credits, {
                opacity: 0, duration: 0.8, ease: "power2.in",
                onComplete: () => {
                    credits.style.pointerEvents = "none";
                    currentTl = null;
                },
            }, ">-1.5");  // fade out arranca 1.5s antes de que acabe el scroll
    };

    const hideCredits = () => {
        if (currentTl) { currentTl.kill(); currentTl = null; }
        gsap.to(credits, {
            opacity: 0, duration: 0.4, ease: "power2.in",
            onComplete: () => { credits.style.pointerEvents = "none"; },
        });
    };

    const isAtBottom = () =>
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

    let atBottom = false;

    window.addEventListener("scroll", () => {
        if (isAtBottom() && !atBottom) {
            atBottom = true;
            playCredits();
        } else if (!isAtBottom() && atBottom) {
            atBottom = false;
            hideCredits();
        }
    }, { passive: true });
}
