const motion = matchMedia("(prefers-reduced-motion: reduce)");
const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
const showAll = () =>
  elements.forEach((element) => element.classList.add("is-visible"));

if (motion.matches || !("IntersectionObserver" in window)) {
  showAll();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((element) => observer.observe(element));
  motion.addEventListener("change", () => {
    if (motion.matches) {
      observer.disconnect();
      showAll();
    }
  });
}
