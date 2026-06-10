const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll(".reveal");

if (prefersReduced || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  // Stagger the hero elements slightly on load
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    el.style.transitionDelay = `${i * 110}ms`;
  });

  targets.forEach((el) => observer.observe(el));
}