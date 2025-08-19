
// preloader
window.addEventListener("load", () => {
    setTimeout(() => {
      const preloader = document.getElementById("preloader");
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";
      setTimeout(() => preloader.style.display = "none", 500);
    }, 1800); // Loader stays visible for 2.5s
  });
 
// back to top button functionality
 // Show/hide button on scroll
  window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  // Scroll to top on click
  document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });



  // chatbot functionality
  // Enhanced chatbot with extensive knowledge base

let chatContext = ""; // To keep track of current topic

const intents = [
  // Greetings
  {
    tags: ["hi", "hello", "hey", "good morning", "good evening"],
    response: "Hi there! 👋 What can I do for you today?",
  },

  // Product Queries
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

  // Purchase & Availability
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

  // Company Details
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

  // Customer Support
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

  // Support & Feedback
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

  // Closing
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




// Product Slider Functionality
class ProductSlider {
  constructor() {
    this.track = document.getElementById('productsTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.currentIndex = 0;
    this.itemsToShow = this.getItemsToShow();
    this.totalItems = document.querySelectorAll('.product-card').length;
    this.maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
    
    this.init();
    this.bindEvents();
  }
  
  init() {
    this.updateButtons();
    this.updateSliderPosition();
  }
  
  bindEvents() {
    this.prevBtn.addEventListener('click', () => this.slidePrev());
    this.nextBtn.addEventListener('click', () => this.slideNext());
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.itemsToShow = this.getItemsToShow();
      this.maxIndex = Math.max(0, this.totalItems - this.itemsToShow);
      
      // Adjust current index if needed
      if (this.currentIndex > this.maxIndex) {
        this.currentIndex = this.maxIndex;
      }
      
      this.updateSliderPosition();
      this.updateButtons();
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.slidePrev();
      } else if (e.key === 'ArrowRight') {
        this.slideNext();
      }
    });
    
    // Touch/swipe support for mobile
    this.addTouchSupport();
  }
  
  getItemsToShow() {
    const containerWidth = document.querySelector('.products-container').offsetWidth;
    const cardWidth = 280; // Base card width
    const gap = 30; // Gap between cards
    
    if (window.innerWidth <= 480) {
      return Math.floor((containerWidth + gap) / (200 + 12)); // Mobile card width + gap
    } else if (window.innerWidth <= 768) {
      return Math.floor((containerWidth + gap) / (220 + 15)); // Tablet card width + gap
    } else if (window.innerWidth <= 1024) {
      return Math.floor((containerWidth + gap) / (250 + 20)); // Small desktop card width + gap
    } else {
      return Math.floor((containerWidth + gap) / (cardWidth + gap)); // Desktop card width + gap
    }
  }
  
  slidePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSliderPosition();
      this.updateButtons();
      this.addSlideAnimation('prev');
    }
  }
  
  slideNext() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateSliderPosition();
      this.updateButtons();
      this.addSlideAnimation('next');
    }
  }
  
  updateSliderPosition() {
    const cardWidth = this.getCardWidth();
    const gap = this.getGap();
    const translateX = this.currentIndex * (cardWidth + gap);
    
    this.track.style.transform = `translateX(-${translateX}px)`;
  }
  
  getCardWidth() {
    if (window.innerWidth <= 480) return 200;
    if (window.innerWidth <= 768) return 220;
    if (window.innerWidth <= 1024) return 250;
    return 280;
  }
  
  getGap() {
    if (window.innerWidth <= 480) return 12;
    if (window.innerWidth <= 768) return 15;
    if (window.innerWidth <= 1024) return 20;
    return 30;
  }
  
  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
  }
  
  addSlideAnimation(direction) {
    // Add visual feedback for slide direction
    this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Reset transition after animation
    setTimeout(() => {
      this.track.style.transition = 'transform 0.5s ease-in-out';
    }, 500);
  }
  
  addTouchSupport() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.track.style.transition = 'none';
    });
    
    this.track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      currentX = e.touches[0].clientX;
      const deltaX = startX - currentX;
      
      // Add some resistance
      if (Math.abs(deltaX) > 20) {
        e.preventDefault();
      }
    });
    
    this.track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      isDragging = false;
      this.track.style.transition = 'transform 0.5s ease-in-out';
      
      const deltaX = startX - currentX;
      const threshold = 50;
      
      if (deltaX > threshold) {
        this.slideNext();
      } else if (deltaX < -threshold) {
        this.slidePrev();
      } else {
        // Snap back to current position
        this.updateSliderPosition();
      }
    });
  }
  
  // Auto-slide functionality (optional)
  startAutoSlide(interval = 5000) {
    this.autoSlideInterval = setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.updateSliderPosition();
      this.updateButtons();
    }, interval);
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
  
  // Method to go to specific slide
  goToSlide(index) {
    if (index >= 0 && index <= this.maxIndex) {
      this.currentIndex = index;
      this.updateSliderPosition();
      this.updateButtons();
    }
  }
}

// Quick View Modal Functionality
class QuickViewModal {
  constructor() {
    this.modal = null;
    this.init();
  }
  
  init() {
    this.createModal();
    this.bindEvents();
  }
  
  createModal() {
    const modalHTML = `
      <div id="quickViewModal" class="quick-view-modal" style="display: none;">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <div class="modal-body">
            <div class="modal-image">
              <img id="modalImage" src="" alt="Product Image">
            </div>
            <div class="modal-info">
              <h3 id="modalTitle">Product Name</h3>
              <p id="modalDescription">Product Description</p>
              <span id="modalCategory" class="product-category">Category</span>
              <div class="modal-actions">
                <button class="btn btn-solid">
                  <i class="fas fa-info-circle"></i> Learn More
                </button>
                <button class="btn btn-outline">
                  <i class="fas fa-envelope"></i> Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('quickViewModal');
  }
  
  bindEvents() {
    // Open modal on quick view button click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-view-btn') || e.target.closest('.quick-view-btn')) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        this.openModal(productCard);
      }
    });
    
    // Close modal events
    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close')) {
        this.closeModal();
      }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'flex') {
        this.closeModal();
      }
    });
  }
  
  openModal(productCard) {
    const img = productCard.querySelector('.product-image img');
    const title = productCard.querySelector('.product-info h3');
    const description = productCard.querySelector('.product-info p');
    const category = productCard.querySelector('.product-category');
    
    document.getElementById('modalImage').src = img.src;
    document.getElementById('modalImage').alt = img.alt;
    document.getElementById('modalTitle').textContent = title.textContent;
    document.getElementById('modalDescription').textContent = description.textContent;
    document.getElementById('modalCategory').textContent = category.textContent;
    
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
      this.modal.classList.add('active');
    }, 10);
  }
  
  closeModal() {
    this.modal.classList.remove('active');
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize product slider
  const productSlider = new ProductSlider();
  
  // Initialize quick view modal
  const quickViewModal = new QuickViewModal();
  
  // Optional: Start auto-slide (uncomment to enable)
  // productSlider.startAutoSlide(4000);
  
  // Pause auto-slide on hover (if auto-slide is enabled)
  const productsWrapper = document.querySelector('.products-wrapper');
  if (productsWrapper) {
    productsWrapper.addEventListener('mouseenter', () => {
      // productSlider.stopAutoSlide();
    });
    
    productsWrapper.addEventListener('mouseleave', () => {
      // productSlider.startAutoSlide(4000);
    });
  }
});


// Products Page JavaScript

// Product Data
const productsData = [
  {
    id: 1,
    name: 'MediCore Advanced',
    description: 'Revolutionary pharmaceutical solution for enhanced therapeutic outcomes with cutting-edge biotechnology.',
    image: 'assets/med5.png',
    category: 'advanced',
    rating: 4.9,
    featured: true
  },
  {
    id: 2,
    name: 'VitalGuard Pro',
    description: 'Comprehensive health management system designed for optimal patient care and treatment efficiency.',
    image: 'assets/med6.png',
    category: 'professional',
    rating: 4.8,
    featured: true
  },
  {
    id: 3,
    name: 'TherapyMax Elite',
    description: 'Premium therapeutic formulation delivering superior clinical results with proven effectiveness.',
    image: 'assets/med3.jpg',
    category: 'premium',
    rating: 4.7,
    featured: false
  },
  {
    id: 4,
    name: 'BioSafe Complete',
    description: 'Innovative biosafety solution ensuring maximum protection and compliance with healthcare standards.',
    image: 'assets/med4.png',
    category: 'safety',
    rating: 4.9,
    featured: true
  },
  {
    id: 5,
    name: 'PharmaCore Plus',
    description: 'Advanced pharmaceutical compound engineered for superior bioavailability and patient comfort.',
    image: 'assets/med1.webp',
    category: 'advanced',
    rating: 4.6,
    featured: false
  },
  {
    id: 6,
    name: 'MedFlow System',
    description: 'Streamlined medical delivery system optimizing treatment protocols for healthcare providers.',
    image: 'assets/product2.png',
    category: 'professional',
    rating: 4.8,
    featured: true
  },
  
  {
    id: 8,
    name: 'MedFlow System',
    description: 'Streamlined medical delivery system optimizing treatment protocols for healthcare providers.',
    image: 'assets/med8.jpg',
    category: 'professional',
    rating: 4.8,
    featured: true
  }
  
];

// Products Manager Class
class ProductsManager {
  constructor() {
    this.filteredProducts = [...productsData];
    this.currentSlide = 0;
    this.itemsPerSlide = this.getItemsPerSlide();
    this.isAutoSliding = true;
    this.autoSlideInterval = null;
    
    this.init();
  }
  
  init() {
    this.renderProducts();
    this.bindEvents();
    this.startStatsAnimation();
    this.updateCarouselControls();
    this.startAutoSlide();
  }
  
  // Event Binding
  bindEvents() {
    // Search functionality
    const searchInput = document.getElementById('productSearch');
    searchInput.addEventListener('input', this.debounce(() => {
      this.filterProducts();
    }, 300));
    
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', () => {
      this.filterProducts();
    });
    
    // Carousel controls
    document.getElementById('prevProductBtn').addEventListener('click', () => {
      this.prevSlide();
    });
    
    document.getElementById('nextProductBtn').addEventListener('click', () => {
      this.nextSlide();
    });
    
    // Modal events
    document.getElementById('modalClose').addEventListener('click', () => {
      this.closeModal();
    });
    
    document.getElementById('productModal').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        this.closeModal();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      } else if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
    
    // Window resize
    window.addEventListener('resize', this.debounce(() => {
      this.itemsPerSlide = this.getItemsPerSlide();
      this.currentSlide = 0;
      this.updateCarouselControls();
      this.updateCarouselPosition();
    }, 250));
    
    // Pause auto-slide on hover
    const carousel = document.querySelector('.products-carousel');
    carousel.addEventListener('mouseenter', () => {
      this.stopAutoSlide();
    });
    
    carousel.addEventListener('mouseleave', () => {
      this.startAutoSlide();
    });
  }
  
  // Get items per slide based on screen size
  getItemsPerSlide() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 4;
  }
  
  // Debounce utility
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Filter products based on search and category
  filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    this.filteredProducts = productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                           product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    this.currentSlide = 0;
    this.renderProducts();
    this.updateCarouselControls();
  }
  
  // Render products
  renderProducts() {
    const track = document.getElementById('productsTrack');
    const noResults = document.getElementById('noResults');
    
    if (this.filteredProducts.length === 0) {
      track.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }
    
    noResults.style.display = 'none';
    
    track.innerHTML = this.filteredProducts.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.featured ? `
            <div class="featured-badge">
              <i class="fas fa-star"></i>
              Featured
            </div>
          ` : ''}
        </div>
        <div class="product-info">
          <div class="product-header">
            <h3>${product.name}</h3>
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <span>${product.rating}</span>
            </div>
          </div>
          <p>${product.description}</p>
          <div class="product-category">${product.category}</div>
          <button class="learn-more-btn" onclick="productsManager.openModal(${product.id})">
            Learn More <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `).join('');
    
    this.updateCarouselPosition();
    this.createIndicators();
  }
  
  // Carousel navigation
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarouselPosition();
      this.updateCarouselControls();
    }
  }
  
  nextSlide() {
    const maxSlides = Math.ceil(this.filteredProducts.length / this.itemsPerSlide) - 1;
    if (this.currentSlide < maxSlides) {
      this.currentSlide++;
      this.updateCarouselPosition();
      this.updateCarouselControls();
    }
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarouselPosition();
    this.updateCarouselControls();
  }
  
  // Update carousel position
  updateCarouselPosition() {
    const track = document.getElementById('productsTrack');
    const cardWidth = this.getCardWidth();
    const gap = this.getGap();
    const translateX = this.currentSlide * this.itemsPerSlide * (cardWidth + gap);
    
    track.style.transform = `translateX(-${translateX}px)`;
  }
  
  // Get card width based on screen size
  getCardWidth() {
    const width = window.innerWidth;
    if (width <= 480) return 220;
    if (width <= 768) return 250;
    if (width <= 1024) return 280;
    return 300;
  }
  
  // Get gap between cards
  getGap() {
    const width = window.innerWidth;
    if (width <= 768) return 20;
    return 30;
  }
  
  // Update carousel controls
  updateCarouselControls() {
    const maxSlides = Math.ceil(this.filteredProducts.length / this.itemsPerSlide) - 1;
    
    document.getElementById('prevProductBtn').disabled = this.currentSlide === 0;
    document.getElementById('nextProductBtn').disabled = this.currentSlide >= maxSlides;
    
    this.updateIndicators();
  }
  
  // Create carousel indicators
  createIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const totalSlides = Math.ceil(this.filteredProducts.length / this.itemsPerSlide);
    
    if (totalSlides <= 1) {
      indicatorsContainer.innerHTML = '';
      return;
    }
    
    indicatorsContainer.innerHTML = Array.from({ length: totalSlides }, (_, index) => `
      <button class="indicator ${index === this.currentSlide ? 'active' : ''}" 
              onclick="productsManager.goToSlide(${index})">
      </button>
    `).join('');
  }
  
  // Update indicators
  updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }
  
  // Auto-slide functionality
  startAutoSlide() {
    if (this.autoSlideInterval) return;
    
    this.autoSlideInterval = setInterval(() => {
      const maxSlides = Math.ceil(this.filteredProducts.length / this.itemsPerSlide) - 1;
      if (this.currentSlide >= maxSlides) {
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
      this.updateCarouselPosition();
      this.updateCarouselControls();
    }, 4000);
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
  
  // Modal functionality
  openModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductImage').alt = product.name;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalRating').textContent = product.rating;
    document.getElementById('modalCategory').textContent = product.category;
    
    const badge = document.getElementById('modalBadge');
    badge.style.display = product.featured ? 'flex' : 'none';
    
    // Update stars based on rating
    const stars = document.querySelectorAll('.modal-rating .stars i');
    const rating = Math.floor(product.rating);
    stars.forEach((star, index) => {
      star.style.opacity = index < rating ? '1' : '0.3';
    });
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
  }
  
  closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  // Statistics animation
  startStatsAnimation() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.classList.add('visible');
          
          // Animate the number
          const numberElement = element.querySelector('.stat-number');
const targetCount = parseInt(numberElement.dataset.count);

          this.animateNumber(numberElement, targetCount);
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.stat-item').forEach(item => {
      observer.observe(item);
    });
  }
  
  // Animate numbers
  animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 30);
  }
}

// Touch/Swipe Support
class TouchHandler {
  constructor(element, callback) {
    this.element = element;
    this.callback = callback;
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.element.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
    this.element.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleEnd.bind(this), { passive: false });
    
    // Mouse events for desktop
    this.element.addEventListener('mousedown', this.handleStart.bind(this));
    this.element.addEventListener('mousemove', this.handleMove.bind(this));
    this.element.addEventListener('mouseup', this.handleEnd.bind(this));
    this.element.addEventListener('mouseleave', this.handleEnd.bind(this));
  }
  
  handleStart(e) {
    this.isDragging = true;
    this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  }
  
  handleMove(e) {
    if (!this.isDragging) return;
    
    this.currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const deltaX = this.startX - this.currentX;
    
    if (Math.abs(deltaX) > 20) {
      e.preventDefault();
    }
  }
  
  handleEnd(e) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    const deltaX = this.startX - this.currentX;
    const threshold = 50;
    
    if (Math.abs(deltaX) > threshold) {
      this.callback(deltaX > 0 ? 'next' : 'prev');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize products manager
  window.productsManager = new ProductsManager();
  
  // Add touch support to carousel
  const carousel = document.querySelector('.products-container');
  new TouchHandler(carousel, (direction) => {
    if (direction === 'next') {
      productsManager.nextSlide();
    } else {
      productsManager.prevSlide();
    }
  });
  
  // Smooth scroll to products when coming from external links
  const hash = window.location.hash;
  if (hash === '#products') {
    setTimeout(() => {
      document.querySelector('.products-main').scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  }
});

// Add to existing window resize handler
window.addEventListener('resize', () => {
  if (window.productsManager) {
    window.productsManager.itemsPerSlide = window.productsManager.getItemsPerSlide();
    window.productsManager.currentSlide = 0;
    window.productsManager.updateCarouselControls();
    window.productsManager.updateCarouselPosition();
  }
});

// Export for global access
window.ProductsManager = ProductsManager;


//about us section 
window.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.company-about-wrapper');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('visible');
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
});


// last section 
 // Enhanced JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
            
            // Create floating particles
            function createFloatingParticles(card) {
                const particlesContainer = card.querySelector('.principles-floating-particles');
                if (!particlesContainer) return;

                // Clear existing particles
                particlesContainer.innerHTML = '';

                // Create random floating particles
                for (let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'principles-particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.top = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 6 + 's';
                    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
                    particle.style.animation = `floatParticle ${particle.style.animationDuration} infinite ease-in-out ${particle.style.animationDelay}`;
                    particlesContainer.appendChild(particle);
                }
            }

            // Enhanced 3D hover effect
            function setupCardInteractions() {
                const cards = document.querySelectorAll('.principles-hero-card');
                
                cards.forEach((card) => {
                    // Create initial particles
                    createFloatingParticles(card);

                    // Mouse move for 3D effect
                    card.addEventListener('mousemove', function(e) {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const rotateX = (y - centerY) / 15;
                        const rotateY = (centerX - x) / 15;
                        
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(0.93)`;
                    });

                    // Reset transform on mouse leave
                    card.addEventListener('mouseleave', function() {
                        card.style.transform = '';
                    });

                    // Refresh particles on hover
                    card.addEventListener('mouseenter', function() {
                        createFloatingParticles(card);
                    });

                    // Add click effect
                    card.addEventListener('click', function() {
                        card.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            card.style.transform = '';
                        }, 150);
                    });
                });
            }

            // Scroll animations using Intersection Observer
            function setupScrollAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry, index) => {
                        if (entry.isIntersecting) {
                            const target = entry.target;
                            target.style.opacity = '1';
                            target.style.transform = 'translateY(0)';
                            target.style.transitionDelay = `${index * 200}ms`;
                        }
                    });
                }, observerOptions);

                // Observe cards for scroll animation
                const cards = document.querySelectorAll('.principles-hero-card');
                cards.forEach((card) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(40px)';
                    card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                    observer.observe(card);
                });
            }

            // Add smooth scroll behavior
            function setupSmoothScroll() {
                const discoverMore = document.querySelector('.discover-more');
                discoverMore.addEventListener('click', function() {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                });
            }

            // Add keyboard navigation
            function setupKeyboardNavigation() {
                const cards = document.querySelectorAll('.principles-hero-card');
                cards.forEach((card, index) => {
                    card.setAttribute('tabindex', '0');
                    card.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            card.click();
                        }
                    });
                });
            }

            // Initialize all functionality
            setupCardInteractions();
            setupScrollAnimations();
            setupSmoothScroll();
            setupKeyboardNavigation();

            // Add dynamic background effect
            function createBackgroundEffect() {
                const container = document.querySelector('.principles-hero-section-container');
                
                document.addEventListener('mousemove', function(e) {
                    const x = e.clientX / window.innerWidth;
                    const y = e.clientY / window.innerHeight;
                    
                    container.style.background = `
                        radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.02) 0%, transparent 50%),
                        linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)
                    `;
                });
            }

            createBackgroundEffect();

            console.log('Core Principles - Enhanced version loaded successfully!');
        });
