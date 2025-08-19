window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";
    setTimeout(() => preloader.style.display = "none", 500);
  }, 1800);
});

// whatsapp contact 

function openWhatsAppChat() {
  // ✅ Replace with your WhatsApp number (with country code, no "+" or spaces)
  const phoneNumber = "+971547049210"; 
  const message = "Hello! I’d like to know more about your services.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}



// contact form 
const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const submitBtn = document.getElementById("submitBtn");
let popupBox = document.querySelector(".popup-box");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  // Show loading state on button
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  const formData = new FormData(form);

  try {
    let response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      popup.style.display = "flex";  // Show popup
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Error submitting form. Please try again.");
  }

  // Reset button after submit
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
});

function closePopup() {
  popupBox.style.animation = "popupOut 0.3s ease forwards";
  setTimeout(() => {
    popup.style.display = "none";
    popupBox.style.animation = "popupIn 0.3s ease forwards"; // reset for next open
  }, 300);
}
// document.getElementById('contactForm').addEventListener('submit', async function (e) {
//   e.preventDefault();

//   let isValid = true;
//   const fieldsToValidate = {
//     first_name: { required: true, name: "First Name" },
//     last_name: { required: true, name: "Last Name" },
//     user_email: { required: true, name: "Email", validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email" },
//     subject: { required: true, name: "Subject" },
//     message: { required: true, name: "Message" },
//   };

//   Object.keys(fieldsToValidate).forEach(id => {
//     const errorEl = document.getElementById(`${id}Error`);
//     if (errorEl) errorEl.textContent = "";
//   });

//   for (const id in fieldsToValidate) {
//     const input = document.getElementsByName(id)[0];
//     const errorEl = document.getElementById(`${id}Error`);
//     const value = input.value.trim();
//     const rules = fieldsToValidate[id];

//     if (rules.required && !value) {
//       errorEl.textContent = `${rules.name} is required`;
//       isValid = false;
//     } else if (rules.validate) {
//       const validationResult = rules.validate(value);
//       if (validationResult !== true) {
//         errorEl.textContent = validationResult;
//         isValid = false;
//       }
//     }
//   }

//   if (!isValid) {
//     return;
//   }

//   const submitBtn = this.querySelector('button[type="submit"]');
//   submitBtn.disabled = true;
//   submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

//   try {
//     const formData = new FormData(this);
//     const formDataObj = Object.fromEntries(formData.entries());

//     const response = await fetch('/api/contact', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formDataObj)
//     });

//     const result = await response.json();

//     if (result.success) {
//       alert('Thank you! Your message has been sent.');
//       this.reset();
//     } else {
//       if (result.errors) {
//         for (const [field, error] of Object.entries(result.errors)) {
//           const errorElement = document.getElementById(`${field}Error`);
//           if (errorElement) errorElement.textContent = error;
//         }
//       } else {
//         alert('Something went wrong on the server. Please try again.');
//       }
//     }
//   } catch (error) {
//     console.error('Fetch Error:', error);
//     alert('An error occurred. Please check your connection and try again.');
//   } finally {
//     submitBtn.disabled = false;
//     submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
//   }
// });

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

window.onscroll = function () {
  const btn = document.getElementById("backToTop");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


let chatContext = "";

const intents = [
  {
    tags: ["hi", "hello", "hey", "good morning", "good evening"],
    response: "Hi there! 👋 What can I do for you today?",
  },
  {
    tags: ["product", "products", "medicine", "medicines"],
    response: "We offer a wide variety of pharmaceutical products including tablets, syrups, supplements, and more. Are you looking for something specific or want to explore our categories?",
    context: "products"
  },
  {
    tags: ["best", "top", "popular", "best seller"],
    response: "Our best-selling products include 'Neurovit B-Complex', 'Nutra-D3 60k', and 'Fladecort 6'. These are highly recommended by health professionals.",
    contextTrigger: "products"
  },
  {
    tags: ["category", "categories", "types", "kinds"],
    response: "We have products categorized into: Pain Relief, Diabetes Care, Cardiac Care, Immunity Boosters, Skin & Hair Care, Vitamins & Supplements, and General Health. Which category are you interested in?",
    contextTrigger: "products"
  },
  {
    tags: ["diabetes", "sugar", "blood sugar"],
    response: "For diabetes care, we recommend our GlucoControl range including GlucoTabs, DiabeTone, and SugarCare Capsules. Would you like detailed info on one of these?",
    contextTrigger: "products"
  },
  {
    tags: ["cardiac", "heart", "bp", "blood pressure"],
    response: "Our cardiac care range includes CardioWell, HeartTone, and BPGuard. Let me know if you'd like more information on dosage or usage.",
    contextTrigger: "products"
  },
  {
    tags: ["vitamin", "supplement", "multivitamin"],
    response: "We offer Vitamin C, Vitamin D3, Neurovit B-Complex, and DailyMultis. These help boost immunity, energy, and overall wellness.",
    contextTrigger: "products"
  },
  {
    tags: ["skin", "hair", "beauty"],
    response: "For skin and hair care, we recommend SkinGlow Capsules, HairVital Tonic, and Herbal Dermo Cream. Want to know their benefits?",
    contextTrigger: "products"
  },
  {
    tags: ["general health", "wellness", "overall health"],
    response: "For overall wellness, DailyMultis and NutraMax Forte are great choices. They support daily nutrition and energy.",
    contextTrigger: "products"
  },
  {
    tags: ["buy", "purchase", "order", "available"],
    response: "You can purchase our products through our website or visit our physical store in Dubai. Do you want the purchase link?",
  },
  {
    tags: ["delivery", "shipping", "home delivery"],
    response: "Yes, we offer delivery across UAE and selected international locations. Shipping charges may apply based on your location.",
  },
  {
    tags: ["price", "cost", "rate"],
    response: "Prices vary depending on the product. You can check our full catalog on the website or let me know the product name to get its price.",
  },
  {
    tags: ["bulk order", "wholesale", "distributor"],
    response: "We do accept bulk and wholesale orders. Please contact our sales team at ✉️ sales@nutraconpharma.com for pricing and partnership options.",
  },
  {
    tags: ["about", "company", "who are you"],
    response: "We are Nutracon Pharma, dedicated to health and wellness since 2001. We specialize in nutraceuticals, prescription medicines, and wellness supplements.",
  },
  {
    tags: ["founder", "ceo", "owner"],
    response: "Our company was founded by professionals passionate about making healthcare accessible and affordable. The CEO, Mr. Shadab Ashraf, has over 20 years of experience in pharmaceuticals.",
  },
  {
    tags: ["certification", "gmp", "iso", "quality"],
    response: "Yes, our manufacturing facilities are GMP-certified and ISO-compliant, ensuring high-quality standards in all our products.",
  },
  {
    tags: ["mission", "vision", "goal"],
    response: "Our mission is to promote better living through affordable and effective healthcare solutions. We aim to become a global leader in wellness."
  },
  {
    tags: ["team", "employees", "staff"],
    response: "Our team comprises pharmacists, scientists, researchers, and customer support specialists who are all dedicated to your well-being."
  },
  {
    tags: ["contact", "email", "phone", "call"],
    response: "You can reach us at 📞 +971-123-456 or ✉️ contact@nutraconpharma.com. Our support is available Mon-Fri, 9am-6pm.",
  },
  {
    tags: ["location", "where", "address"],
    response: "We’re based in England Cluster, Warsan First, Deira Dubai. Here’s our Google Maps link: <a href='https://maps.google.com' target='_blank'>View Location</a>",
  },
  {
    tags: ["timing", "open", "hours", "working"],
    response: "We’re open Monday to Friday from 9:00 AM to 6:00 PM and Saturdays from 10:00 AM to 2:00 PM. Closed on Sundays.",
  },
  {
    tags: ["holiday", "closed", "off days"],
    response: "We are closed on Sundays and public holidays. For emergency orders, please email us in advance."
  },
  {
    tags: ["complaint", "issue", "problem", "support"],
    response: "We're here to help. Please share the issue you're facing and our support team will assist you shortly.",
  },
  {
    tags: ["feedback", "suggestion", "review"],
    response: "We value your feedback! Please let us know what you think about our services or how we can improve.",
  },
  {
    tags: ["refund", "return", "money back"],
    response: "Our refund policy allows for returns within 7 days of purchase for unopened items. Please contact support for assistance."
  },
  {
    tags: ["tracking", "order status", "track order"],
    response: "To track your order, use the tracking ID sent to your email or contact our support team."
  },
  {
    tags: ["bye", "goodbye", "see you"],
    response: "Goodbye! 😊 Feel free to chat again if you need any help or information.",
  }
];

function toggleChatbot() {
  const box = document.getElementById("chatbot-box");
  box.style.display = box.style.display === "flex" ? "none" : "flex";
}

function handleKey(e) {
  if (e.key === "Enter") sendMessage();
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  input.value = "";
  simulateBotTyping();

  setTimeout(() => {
    const reply = getSmartReply(msg.toLowerCase());
    appendMessage("bot", reply);
  }, 800);
}

function appendMessage(sender, text) {
  const chat = document.getElementById("chatMessages");
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-msg" : "bot-msg";
  msgDiv.innerHTML = text;
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

function simulateBotTyping() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "bot-msg typing";
  typingDiv.id = "typing";
  typingDiv.innerHTML = "Typing<span>.</span><span>.</span><span>.</span>";
  document.getElementById("chatMessages").appendChild(typingDiv);
  setTimeout(() => {
    typingDiv.remove();
  }, 800);
}

function getSmartReply(message) {
  for (let intent of intents) {
    for (let tag of intent.tags) {
      if (message.includes(tag)) {
        if (intent.context) {
          chatContext = intent.context;
        }
        if (!intent.contextTrigger || intent.contextTrigger === chatContext) {
          return intent.response;
        }
      }
    }
  }
  return `
    I'm not sure I understand that. 🤔<br>
    You can ask about: <b>Products</b>, <b>Categories</b>, <b>Contact</b>, <b>Location</b>, <b>Timings</b>, or <b>Support</b>.
  `;
}