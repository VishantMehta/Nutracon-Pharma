
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




  const counters = document.querySelectorAll('.counter');
  let triggered = false;

  function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const duration = 2000; // total duration of animation in ms
    const stepTime = Math.max(30, duration / target); // calculate time per increment

    const increment = () => {
      if (count < target) {
        count++;
        counter.innerText = count;
        setTimeout(increment, stepTime);
      } else {
        counter.innerText = target;
      }
    };

    increment();
  }

  function handleScroll() {
    const section = document.getElementById('impact');
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100 && !triggered) {
      triggered = true;
      counters.forEach(animateCounter);
    }
  }

  window.addEventListener('scroll', handleScroll);



//   for therapeutic hover 
// Fade-in animation on scroll
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });