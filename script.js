// Hamburger menu toggle with keyboard accessibility
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

function openSidebar() {
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    const contentContainer = document.querySelector('.content-container');
    if (contentContainer) {
        contentContainer.classList.add('sidebar-open');
    }
    const landingPage = document.querySelector('.landing-page');
    if (landingPage) {
        landingPage.classList.add('sidebar-open');
    }
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    menuBtn.focus();
    const contentContainer = document.querySelector('.content-container');
    if (contentContainer) {
        contentContainer.classList.remove('sidebar-open');
    }
    const landingPage = document.querySelector('.landing-page');
    if (landingPage) {
        landingPage.classList.remove('sidebar-open');
    }
}

menuBtn.addEventListener('click', openSidebar);
menuBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSidebar();
    }
});

closeBtn.addEventListener('click', closeSidebar);
closeBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeSidebar();
    }
});

// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Close sidebar when clicking a sidebar link
document.querySelectorAll('.sidebar-menu a, .sidebar-menu-form a').forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});

// Carousel functionality with smooth transitions and keyboard support
document.querySelectorAll('.carousel').forEach(carousel => {
    const imagesContainer = carousel.querySelector('.carousel-images');
    const images = imagesContainer.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;

    function updateCarousel() {
        const width = images[0].clientWidth;
        imagesContainer.style.transform = `translateX(-${currentIndex * width}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    // Keyboard navigation for carousel buttons
    prevBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevBtn.click();
        }
    });

    nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextBtn.click();
        }
    });

    // Wait for all images to load before initializing carousel position
    let imagesLoaded = 0;
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    updateCarousel();
                }
            });
            img.addEventListener('error', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    updateCarousel();
                }
            });
        }
    });
    if (imagesLoaded === images.length) {
        updateCarousel();
    }

    // Update carousel position on window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});



// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Close sidebar when clicking a sidebar link
document.querySelectorAll('.sidebar-menu a, .sidebar-menu-form a').forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});



// Carousel functionality with smooth transitions and keyboard support
document.querySelectorAll('.carousel').forEach(carousel => {
    const imagesContainer = carousel.querySelector('.carousel-images');
    const images = imagesContainer.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;

    function updateCarousel() {
        const width = images[0].clientWidth;
        imagesContainer.style.transform = `translateX(-${currentIndex * width}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    // Keyboard navigation for carousel buttons
    prevBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevBtn.click();
        }
    });

    nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextBtn.click();
        }
    });

    // Wait for all images to load before initializing carousel position
    let imagesLoaded = 0;
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    updateCarousel();
                }
            });
            img.addEventListener('error', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    updateCarousel();
                }
            });
        }
    });
    if (imagesLoaded === images.length) {
        updateCarousel();
    }

    // Update carousel position on window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});



document.querySelectorAll('.project-code').forEach(projectCode => {
    const tabs = projectCode.querySelectorAll('.code-tab');
    const contents = projectCode.querySelectorAll('.code-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('aria-controls');

            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            contents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });

        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });
});


/* Dark mode toggle functionality using SVG click */

const themeToggleSvg = document.querySelector('.theme-toggle svg');

function setTheme(active) {
  if (active) {
    document.body.classList.add("dark-mode");
    themeToggleSvg.classList.add("active");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    themeToggleSvg.classList.remove("active");
    localStorage.setItem("theme", "light");
  }
}

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
  setTheme(true);
} else {
  setTheme(false);
}

// Toggle theme on SVG click
themeToggleSvg.addEventListener("click", () => {
  const isActive = themeToggleSvg.classList.contains("active");
  setTheme(!isActive);
});

document.querySelectorAll('.copy-btn').forEach(copyBtn => {
  copyBtn.addEventListener('click', () => {
    console.log('Copy button clicked');
    // Find the closest ancestor that contains the code tabs and code content
    const projectCode = copyBtn.closest('.project-code, .project-code-container, section, main') || document;
    console.log('Project code container:', projectCode);

    // Find the visible code content inside that container
    const visibleCodeContainer = projectCode.querySelector('.code-content:not(.hidden)');
    if (!visibleCodeContainer) {
      console.warn('No visible code content container found');
      return;
    }
    // Try to find a <code> child inside visibleCodeContainer
    let visibleCode = visibleCodeContainer.querySelector('code');
    if (!visibleCode) {
      // If no <code> child, use the container itself
      visibleCode = visibleCodeContainer;
    }
    console.log('Visible code element:', visibleCode);

    const codeText = visibleCode.textContent.trim();
    console.log('Code text to copy:', codeText);

    navigator.clipboard.writeText(codeText).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.disabled = true;
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.disabled = false;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  });
});


/* 3D Boxes */

const boxes = document.querySelectorAll(".box");

let current = 1;

let interval = setInterval(() => {
  boxes.forEach((box) => {
    if (current > boxes.length) current = 1;

    if (box.classList[1].split("-")[1] * 1 === current) {
      box.classList.add("active");
    } else {
      box.classList.remove("active");
    }
  });
  current++;
}, 5000);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    boxes.forEach((cube) => {
      cube.classList.remove("active");
    });
    box.classList.add("active");

    current = box.classList[1].split("-")[1] * 1;

  });
});

// Image popup modal with carousel navigation

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = modal.querySelector('.modal-close');
const modalPrev = modal.querySelector('.modal-prev');
const modalNext = modal.querySelector('.modal-next');

let modalImages = [];
let currentModalIndex = 0;

// Helper to update modal image src and alt
function updateModalImage() {
  if (modalImages.length === 0) return;
  const img = modalImages[currentModalIndex];
  modalImage.src = img.src;
  modalImage.alt = img.alt || 'Image preview';
}

// Open modal with given image index
function openModal(index) {
  currentModalIndex = index;
  updateModalImage();
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'flex';
  modalClose.focus();
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

// Close modal
function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  document.body.style.overflow = ''; // restore scroll
}

// Show previous image
function showPrevImage() {
  if (modalImages.length === 0) return;
  currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
  updateModalImage();
}

// Show next image
function showNextImage() {
  if (modalImages.length === 0) return;
  currentModalIndex = (currentModalIndex + 1) % modalImages.length;
  updateModalImage();
}

// Click event on images to open modal
document.querySelectorAll('.project-section img, .carousel-images img').forEach((img, index, nodeList) => {
  img.addEventListener('click', () => {
    // Collect all images in the same container (project-section or carousel-images)
    let container = img.closest('.carousel-images') || img.closest('.project-section');
    if (!container) {
      container = document.body;
    }
    modalImages = Array.from(container.querySelectorAll('img'));
    currentModalIndex = modalImages.indexOf(img);
    openModal(currentModalIndex);
  });
});

// Close modal on close button click
modalClose.addEventListener('click', closeModal);
modalClose.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
    e.preventDefault();
    closeModal();
  }
});

// Close modal on clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
  if (modal.getAttribute('aria-hidden') === 'false') {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showNextImage();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
  }
});

// Next and Prev buttons click handlers
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

modalPrev.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    showPrevImage();
  }
});

modalNext.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    showNextImage();
  }
});
