// preloader
window.addEventListener("load", () => {
    setTimeout(() => {
      const preloader = document.getElementById("preloader");
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";
      setTimeout(() => preloader.style.display = "none", 500);
    }, 2500); // Loader stays visible for 2.5s
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

  const form = document.getElementById("contactForm");

  const fields = {
    firstName: { required: true, name: "First Name" },
    lastName: { required: true, name: "Last Name" },
    email: {
      required: true,
      name: "Email",
      validate: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email",
    },
    subject: {
      required: true,
      name: "Subject",
      validate: (value) => value !== "" || "Please select a subject",
    },
    message: { required: true, name: "Message" },
  };

  Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(`${id}Error`);
    const rules = fields[id];

    input.addEventListener("blur", () => {
      const value = input.value.trim();
      if (rules.required && !value) {
        errorEl.textContent = `${rules.name} is required`;
      } else if (rules.validate && typeof rules.validate === "function") {
        const validation = rules.validate(value);
        errorEl.textContent = validation === true ? "" : validation;
      } else {
        errorEl.textContent = "";
      }
    });

    input.addEventListener("input", () => {
      errorEl.textContent = "";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    Object.keys(fields).forEach((id) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(`${id}Error`);
      const value = input.value.trim();
      const rules = fields[id];

      if (rules.required && !value) {
        errorEl.textContent = `${rules.name} is required`;
        valid = false;
      } else if (rules.validate) {
        const validation = rules.validate(value);
        if (validation !== true) {
          errorEl.textContent = validation;
          valid = false;
        } else {
          errorEl.textContent = "";
        }
      } else {
        errorEl.textContent = "";
      }
    });

    if (valid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });
    