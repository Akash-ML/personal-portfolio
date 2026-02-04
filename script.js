const revealElements = document.querySelectorAll(".section, .hero, .footer");
const themeToggle = document.getElementById("themeToggle");

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  document.body.setAttribute("data-theme", storedTheme);
  themeToggle.textContent = storedTheme === "dark" ? "Light mode" : "Dark mode";
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.setAttribute("data-theme", "dark");
  themeToggle.textContent = "Light mode";
}

themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.body.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "Light mode" : "Dark mode";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
