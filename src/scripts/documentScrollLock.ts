const owners = new Set<string>();

let scrollPosition = { x: 0, y: 0 };
let originalBodyPaddingRight = "";
let originalHtmlOverflow = "";

export const lockDocumentScroll = (owner: string) => {
  if (owners.has(owner)) return;

  if (owners.size === 0) {
    scrollPosition = { x: window.scrollX, y: window.scrollY };
    originalBodyPaddingRight = document.body.style.paddingRight;
    originalHtmlOverflow = document.documentElement.style.overflow;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      const currentPadding = Number.parseFloat(
        getComputedStyle(document.body).paddingRight,
      );
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("is-scroll-locked");
  }

  owners.add(owner);
};

export const unlockDocumentScroll = (owner: string) => {
  if (!owners.delete(owner) || owners.size > 0) return;

  document.body.classList.remove("is-scroll-locked");
  document.body.style.paddingRight = originalBodyPaddingRight;
  document.documentElement.style.overflow = originalHtmlOverflow;
  window.scrollTo(scrollPosition.x, scrollPosition.y);
};
