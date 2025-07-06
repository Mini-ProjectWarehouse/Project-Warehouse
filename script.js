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

