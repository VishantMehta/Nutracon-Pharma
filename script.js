

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
    image: 'assets/med7.png',
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
