function createStars() {
  const container = document.querySelector("body");
  for (let i = 0; i < 1000; i++) {
    // Increase the number of stars to 1000
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = ".1px";
    star.style.height = ".1px";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    container.appendChild(star);
  }
}
createStars();

// Planet info data
const planetInfo = {
  sun: {
    description: "The Sun is the massive, glowing star at the center of our Solar System, providing the energy that sustains life on Earth.",
    image: "./images/sun.png"
  },
  mercury: {
    description: "Mercury is the smallest and fastest planet, orbiting closest to the Sun with a rocky, cratered surface.",
    image: "./images/mercury.png"
  },
  venus: {
    description: "Venus is a hot, toxic world with thick clouds of sulfuric acid, known as Earth's 'sister planet' due to its similar size.",
    image: "./images/venus.png"
  },
  earth: {
    description: "Earth is our home planet also known as the blue planet, rich in water and life, with a protective atmosphere and diverse ecosystems.",
    image: "./images/earth.png"
  },
  moon: {
    description: "The Moon is Earth's only natural satellite, influencing tides and providing a unique view of our planet.",
    image: "./images/moon.png"
  },
  mars: {
    description: "Mars, also known as the Red Planet, features the tallest volcano and deepest canyon in the Solar System, with signs of ancient water.",
    image: "./images/mars.png"
  },
  jupiter: {
    description: "Jupiter is the gas giant king of the Solar System, famous for its Great Red Spot and many moons. It is also called a failed star",
    image: "./images/jupiter.png"
  },
  saturn: {
    description: "Saturn is renowned for its stunning rings made of ice and rock, orbiting a gas giant with numerous moons.",
    image: "./images/saturn.jpg"
  },
  uranus: {
    description: "Uranus is an ice giant with a unique sideways rotation, surrounded by faint rings and moons.",
    image: "./images/uranus.png"
  },
  neptune: {
    description: "Neptune is a distant, cold ice giant with strong winds and storms, the farthest known planet from the Sun.",
    image: "./images/neptune.png"
  },
  pluto: {
    description: "Pluto is a small, icy dwarf planet in the Kuiper belt, known for its complex surface and thin atmosphere.",
    image: "./images/pluto.png"
  }
};

// Sidebar elements
const sidebar = document.getElementById("sidebar");
const sidebarContent = document.getElementById("sidebar-content");
const closeBtn = document.getElementById("close-sidebar");

// Function to open sidebar with planet info
function openSidebar(planet) {
  const info = planetInfo[planet];
  if (info) {
    sidebarContent.innerHTML = `
      <img src="${info.image}" alt="${planet}" style="width: 100%; height: auto; margin-bottom: 1em;" />
      <p>${info.description}</p>
    `;
  } else {
    sidebarContent.textContent = "No information available.";
  }
  sidebar.classList.add("open");
}

// Function to close sidebar
function closeSidebar() {
  sidebar.classList.remove("open");
}

// Add event listeners to planet buttons and moon button
document.querySelectorAll(".planet-btn, .moon-btn").forEach(button => {
  button.addEventListener("click", () => {
    const planet = button.getAttribute("data-planet");
    openSidebar(planet);
  });
  button.addEventListener("mouseenter", () => {
    const planet = button.getAttribute("data-planet");
    const planetElement = document.querySelector(`.${planet}`);
    if (planetElement) {
      planetElement.classList.add(`glow-${planet}`);
    }
  });
  button.addEventListener("mouseleave", () => {
    const planet = button.getAttribute("data-planet");
    const planetElement = document.querySelector(`.${planet}`);
    if (planetElement) {
      planetElement.classList.remove(`glow-${planet}`);
    }
  });
});

// Close button event listener
if (closeBtn) {
  closeBtn.addEventListener("click", closeSidebar);
}
