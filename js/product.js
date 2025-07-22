// preloader
// Replace your existing preloader JS with this:
window.addEventListener("load", () => {
    setTimeout(() => {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          preloader.remove(); // ✅ REMOVE instead of display: none
        }, 500);
      }
    }, 2500);
});



// for hamburger toggling 
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const icon = document.getElementById("hamburger").querySelector("i");

  nav.classList.toggle("active");

  if (nav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}
    

function filterProducts() {
  const searchInput = document.getElementById('productSearch').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    const desc = card.querySelector('p').innerText.toLowerCase();
    const matchSearch = title.includes(searchInput) || desc.includes(searchInput);

    // Custom dataset can be added to match category if available
    const cardCategory = card.dataset.category || 'all';
    const matchCategory = category === 'all' || cardCategory === category;

    if (matchSearch && matchCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}