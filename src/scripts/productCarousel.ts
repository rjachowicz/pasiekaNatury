export {};

document
  .querySelectorAll<HTMLElement>("[data-product-carousel]")
  .forEach((carousel) => {
    const viewport = carousel.querySelector<HTMLElement>(
      "[data-carousel-viewport]",
    );
    const track = carousel.querySelector<HTMLElement>("[data-carousel-track]");
    const previous = carousel.querySelector<HTMLButtonElement>(
      "[data-carousel-previous]",
    );
    const next = carousel.querySelector<HTMLButtonElement>(
      "[data-carousel-next]",
    );
    if (!viewport || !track || !previous || !next) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let step = 0;
    let moving = false;
    const queue: Array<-1 | 1> = [];
    let direction: -1 | 1 = 1;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let pointerStart: { id: number; x: number; y: number } | undefined;
    const cards = () => [
      ...track.querySelectorAll<HTMLElement>("[data-carousel-card]"),
    ];
    const updateFocusableCards = () => {
      const viewportBounds = viewport.getBoundingClientRect();
      cards().forEach((card) => {
        const link = card.querySelector<HTMLAnchorElement>("a[href]");
        if (!link) return;
        const cardBounds = card.getBoundingClientRect();
        const isOutsideViewport =
          cardBounds.right <= viewportBounds.left ||
          cardBounds.left >= viewportBounds.right;
        link.tabIndex = isOutsideViewport ? -1 : 0;
      });
    };
    const measure = () => {
      const first = cards()[0];
      if (!first) return;
      step =
        first.getBoundingClientRect().width +
        Number.parseFloat(getComputedStyle(track).gap || "0");
      if (!moving) {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        requestAnimationFrame(updateFocusableCards);
      }
    };
    const finish = () => {
      if (!moving) return;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      fallbackTimer = undefined;
      track.style.transition = "none";
      if (direction === 1) track.append(cards()[0]);
      track.style.transform = "translateX(0)";
      track.getBoundingClientRect();
      moving = false;
      requestAnimationFrame(updateFocusableCards);
      runNext();
    };
    const runNext = () => {
      const nextDirection = queue.shift();
      if (nextDirection !== undefined) move(nextDirection);
    };
    const move = (nextDirection: -1 | 1) => {
      if (cards().length < 2 || step === 0) return;
      direction = nextDirection;
      moving = true;
      if (direction === -1) {
        track.style.transition = "none";
        track.prepend(cards().at(-1)!);
        track.style.transform = `translateX(${-step}px)`;
        track.getBoundingClientRect();
      }
      if (motion.matches) {
        track.style.transition = "none";
        track.style.transform = `translateX(${direction === 1 ? -step : 0}px)`;
        finish();
        return;
      }
      track.style.transition = "transform 360ms ease";
      track.style.transform = `translateX(${direction === 1 ? -step : 0}px)`;
      fallbackTimer = setTimeout(finish, 460);
    };
    const enqueue = (nextDirection: -1 | 1) => {
      queue.push(nextDirection);
      if (!moving) runNext();
    };
    track.addEventListener("transitionend", (event) => {
      if (event.target === track && event.propertyName === "transform")
        finish();
    });
    previous.addEventListener("click", () => enqueue(-1));
    next.addEventListener("click", () => enqueue(1));
    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        enqueue(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
    viewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse") {
        pointerStart = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
        };
      }
    });
    viewport.addEventListener("pointerup", (event) => {
      if (!pointerStart || event.pointerId !== pointerStart.id) return;
      const distanceX = event.clientX - pointerStart.x;
      const distanceY = event.clientY - pointerStart.y;
      pointerStart = undefined;
      if (
        Math.abs(distanceX) >= 36 &&
        Math.abs(distanceX) > Math.abs(distanceY)
      ) {
        enqueue(distanceX < 0 ? 1 : -1);
      }
    });
    viewport.addEventListener(
      "pointercancel",
      () => (pointerStart = undefined),
    );
    new ResizeObserver(measure).observe(viewport);
    measure();
  });
