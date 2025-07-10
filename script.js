

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