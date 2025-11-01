// Smooth page transitions or highlight active nav links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
    e.target.classList.add("active");
  });
});
