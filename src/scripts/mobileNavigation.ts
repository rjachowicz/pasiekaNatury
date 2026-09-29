export {};

document
  .querySelectorAll<HTMLElement>("[data-site-header]")
  .forEach((header) => {
    const toggle = header.querySelector<HTMLButtonElement>(
      "[data-navigation-toggle]",
    );
    const nav = header.querySelector<HTMLElement>("[data-navigation]");
    if (!toggle || !nav) return;

    header.classList.add("header--enhanced");
    toggle.hidden = false;

    const closeMenu = (restoreFocus = false) => {
      const wasOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Otwórz menu");
      header.classList.remove("header--open");
      if (wasOpen && !document.querySelector("dialog[open]")) {
        document.body.classList.remove("is-scroll-locked");
      }
      if (restoreFocus) toggle.focus();
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
      header.classList.toggle("header--open", open);
      document.body.classList.toggle("is-scroll-locked", open);
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target instanceof Node && !header.contains(event.target)) {
        closeMenu();
      }
    });

    header.addEventListener("focusout", (event) => {
      if (
        event.relatedTarget instanceof Node &&
        !header.contains(event.relatedTarget)
      ) {
        closeMenu();
      }
    });

    matchMedia("(min-width: 900px)").addEventListener("change", () =>
      closeMenu(),
    );
  });
