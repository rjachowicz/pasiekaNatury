export {};

const dialog = document.querySelector<HTMLDialogElement>(
  "[data-image-lightbox]",
);
const image = dialog?.querySelector<HTMLImageElement>("[data-lightbox-image]");
const caption = dialog?.querySelector<HTMLElement>("[data-lightbox-caption]");
const closeButton = dialog?.querySelector<HTMLButtonElement>(
  "[data-lightbox-close]",
);
const previous = dialog?.querySelector<HTMLButtonElement>(
  "[data-lightbox-previous]",
);
const next = dialog?.querySelector<HTMLButtonElement>("[data-lightbox-next]");

if (dialog && image && caption && closeButton && previous && next) {
  let activeIndex = 0;
  let activeGroup = "";
  let opener: HTMLElement | null = null;
  let originalBodyPadding = "";

  const getItems = () =>
    [...document.querySelectorAll<HTMLElement>("[data-lightbox-src]")].filter(
      (item) => (item.dataset.lightboxGroup ?? "default") === activeGroup,
    );

  const lockScroll = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    originalBodyPadding = document.body.style.paddingRight;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.classList.add("is-scroll-locked");
  };

  const unlockScroll = () => {
    document.body.classList.remove("is-scroll-locked");
    document.body.style.paddingRight = originalBodyPadding;
  };

  const render = (index: number) => {
    const items = getItems();
    if (items.length === 0) return;

    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    const src = item.dataset.lightboxSrc;
    if (!src) return;
    const alt = item.dataset.lightboxAlt ?? "";
    image.src = src;
    image.alt = alt;
    caption.textContent = alt;
  };

  const closeDialog = () => dialog.close();

  const openDialog = (trigger: HTMLElement) => {
    activeGroup = trigger.dataset.lightboxGroup ?? "default";
    const items = getItems();
    const index = items.indexOf(trigger);
    if (index === -1) return;

    opener = trigger;
    render(index);
    lockScroll();
    dialog.showModal();
    closeButton.focus();
  };

  document
    .querySelectorAll<HTMLElement>("[data-lightbox-src]")
    .forEach((trigger) => {
      trigger.addEventListener("click", () => openDialog(trigger));
    });

  previous.addEventListener("click", () => render(activeIndex - 1));
  next.addEventListener("click", () => render(activeIndex + 1));
  closeButton.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      render(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      render(activeIndex + 1);
    }
  });

  dialog.addEventListener("close", () => {
    unlockScroll();
    opener?.focus();
    opener = null;
  });
}
