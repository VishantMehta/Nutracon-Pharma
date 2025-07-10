

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

//typewriter effect
  const mottos = [
    "Delivering Innovative Health Solutions",
    "Backed by Science and Inspired by Nature",
    "Empowering Lives with Trusted Wellness",
    "Science Meets Nature at Nutracon",
    "Your Health, Our Commitment"
  ];

  const element = document.getElementById("typewriter");
  let mottoIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = mottos[mottoIndex];
    const displayed = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    element.innerHTML = displayed;

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length + 1) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      mottoIndex = (mottoIndex + 1) % mottos.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }

  document.addEventListener("DOMContentLoaded", typeEffect);



// Slide-in on scroll animation
function revealOnScroll() {
  const labels = document.querySelectorAll('.product-label');
  const triggerBottom = window.innerHeight * 0.85;

  labels.forEach(label => {
    const boxTop = label.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      label.classList.add('visible');
    } else {
      label.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// Scroll Zoom-Out Effect for Product Images
function handleScrollZoomOut() {
  const boxes = document.querySelectorAll('.product-box.scroll-effect');

  boxes.forEach(box => {
    const rect = box.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollPercent = 1 - (rect.top / windowHeight);
      const scale = Math.max(0.9, 1 - scrollPercent * 0.1); // Adjust scale range here
      const img = box.querySelector('img');
      img.style.transform = `scale(${scale})`;
    }
  });
}

window.addEventListener('scroll', handleScrollZoomOut);
window.addEventListener('load', handleScrollZoomOut);
