// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const projectsGrid = document.getElementById("projects-grid");
const contactForm = document.querySelector(".contact-form");

// Theme Management
let currentTheme = localStorage.getItem("theme") || "light";

function initTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  if (currentTheme === "dark") {
    icon.className = "fas fa-sun";
  } else {
    icon.className = "fas fa-moon";
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon();
}

// Navigation Management
function toggleNavMenu() {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
}

function closeNavMenu() {
  navMenu.classList.remove("active");
  navToggle.classList.remove("active");
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        closeNavMenu();
      }
    });
  });
}

// Custom Select Component
class CustomSelect {
  constructor(element) {
    this.element = element;
    this.trigger = element.querySelector(".select-trigger");
    this.dropdown = element.querySelector(".select-dropdown");
    this.options = element.querySelectorAll(".select-option");
    this.valueElement = element.querySelector(".select-value");
    this.arrow = element.querySelector(".select-arrow");
    this.isMultiple = element.classList.contains("multi-select");
    this.selectedValues = [];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setInitialValue();
  }

  setupEventListeners() {
    // Toggle dropdown
    this.trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Option selection
    this.options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectOption(option);
      });
    });

    // Close on outside click
    document.addEventListener("click", () => {
      this.close();
    });

    // Prevent dropdown close when clicking inside
    this.dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  toggle() {
    if (this.element.classList.contains("open")) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    // Close other selects
    document.querySelectorAll(".custom-select.open").forEach((select) => {
      if (select !== this.element) {
        select.classList.remove("open");
      }
    });

    this.element.classList.add("open");
  }

  close() {
    this.element.classList.remove("open");
  }

  selectOption(option) {
    const value = option.getAttribute("data-value");

    if (this.isMultiple) {
      this.handleMultipleSelection(option, value);
    } else {
      this.handleSingleSelection(option, value);
      this.close();
    }

    this.updateDisplay();
    this.triggerChange();
  }

  handleSingleSelection(option, value) {
    // Remove active class from all options
    this.options.forEach((opt) => opt.classList.remove("active"));

    // Add active class to selected option
    option.classList.add("active");

    this.selectedValues = [value];
  }

  handleMultipleSelection(option, value) {
    if (value === "all") {
      // Clear all selections and select "all"
      this.options.forEach((opt) => {
        opt.classList.remove("active", "selected");
      });
      option.classList.add("active");
      this.selectedValues = ["all"];
    } else {
      // Toggle selection
      if (option.classList.contains("selected")) {
        option.classList.remove("selected");
        this.selectedValues = this.selectedValues.filter((v) => v !== value);
      } else {
        // Remove "all" if selecting specific item
        const allOption = this.element.querySelector('[data-value="all"]');
        if (allOption) {
          allOption.classList.remove("active");
        }

        option.classList.add("selected");
        this.selectedValues.push(value);
      }

      // If no selections, revert to "all"
      if (this.selectedValues.length === 0) {
        const allOption = this.element.querySelector('[data-value="all"]');
        if (allOption) {
          allOption.classList.add("active");
          this.selectedValues = ["all"];
        }
      }
    }
  }

  updateDisplay() {
    if (this.isMultiple) {
      if (
        this.selectedValues.includes("all") ||
        this.selectedValues.length === 0
      ) {
        this.valueElement.textContent = "All Technologies";
      } else if (this.selectedValues.length === 1) {
        const selectedOption = this.element.querySelector(
          `[data-value="${this.selectedValues[0]}"]`
        );
        this.valueElement.textContent =
          selectedOption.querySelector("span").textContent;
      } else {
        this.valueElement.textContent = `${this.selectedValues.length} selected`;
      }
    } else {
      const activeOption = this.element.querySelector(".select-option.active");
      if (activeOption) {
        this.valueElement.textContent =
          activeOption.querySelector("span").textContent;
      }
    }
  }

  setInitialValue() {
    const activeOption = this.element.querySelector(".select-option.active");
    if (activeOption) {
      const value = activeOption.getAttribute("data-value");
      this.selectedValues = [value];
      this.updateDisplay();
    }
  }

  getValue() {
    return this.selectedValues;
  }

  triggerChange() {
    const event = new CustomEvent("selectChange", {
      detail: { values: this.selectedValues },
    });
    this.element.dispatchEvent(event);
  }
}

// Project Filtering and Sorting
class ProjectManager {
  constructor() {
    this.projects = Array.from(document.querySelectorAll(".project-card"));
    this.originalOrder = [...this.projects];
    this.selects = {};
    this.init();
  }

  init() {
    this.setupCustomSelects();
    this.setupEventListeners();

    // Initial setup - show all projects with animation
    setTimeout(() => {
      this.filterProjects();
    }, 100);
  }

  setupCustomSelects() {
    // Initialize custom selects
    const categorySelect = document.querySelector(
      '[data-select="category-filter"]'
    );
    const techSelect = document.querySelector('[data-select="tech-filter"]');
    const sortSelect = document.querySelector('[data-select="sort-filter"]');

    this.selects.category = new CustomSelect(categorySelect);
    this.selects.tech = new CustomSelect(techSelect);
    this.selects.sort = new CustomSelect(sortSelect);
  }

  setupEventListeners() {
    // Listen for custom select changes
    this.selects.category.element.addEventListener("selectChange", () =>
      this.filterProjects()
    );
    this.selects.tech.element.addEventListener("selectChange", () =>
      this.filterProjects()
    );
    this.selects.sort.element.addEventListener("selectChange", () =>
      this.sortProjects()
    );
  }

  filterProjects() {
    const selectedCategory = this.selects.category.getValue()[0];
    const selectedTechnologies = this.selects.tech.getValue();

    this.projects.forEach((project, index) => {
      let showProject = true;

      // Filter by category
      if (selectedCategory !== "all") {
        const projectCategory = project.getAttribute("data-category");
        if (projectCategory !== selectedCategory) {
          showProject = false;
        }
      }

      // Filter by technologies
      if (
        selectedTechnologies.length > 0 &&
        !selectedTechnologies.includes("all")
      ) {
        const projectTech = project.getAttribute("data-tech").split(",");
        const hasMatchingTech = selectedTechnologies.some((tech) =>
          projectTech.includes(tech)
        );
        if (!hasMatchingTech) {
          showProject = false;
        }
      }

      // Show/hide project with animation
      if (showProject) {
        project.classList.remove("hidden");
        project.style.display = "block";

        // Add staggered animation delay for visible projects
        setTimeout(() => {
          project.classList.add("animate-in");
        }, index * 100);
      } else {
        project.classList.add("hidden");
        project.classList.remove("animate-in");
        setTimeout(() => {
          if (project.classList.contains("hidden")) {
            project.style.display = "none";
          }
        }, 300);
      }
    });

    // Sort after filtering
    setTimeout(() => {
      this.sortProjects();
    }, 100);
  }

  sortProjects() {
    const sortBy = this.selects.sort.getValue()[0];
    const visibleProjects = this.projects.filter(
      (project) =>
        !project.classList.contains("hidden") &&
        project.style.display !== "none"
    );

    visibleProjects.sort((a, b) => {
      if (sortBy === "name") {
        const nameA = a.getAttribute("data-name").toLowerCase();
        const nameB = b.getAttribute("data-name").toLowerCase();
        return nameA.localeCompare(nameB);
      } else if (sortBy === "date") {
        const dateA = new Date(a.getAttribute("data-date"));
        const dateB = new Date(b.getAttribute("data-date"));
        return dateB - dateA; // Newest first
      }
      return 0;
    });

    // Remove animation classes temporarily
    visibleProjects.forEach((project) => {
      project.classList.remove("animate-in");
    });

    // Reorder projects in the DOM
    visibleProjects.forEach((project, index) => {
      projectsGrid.appendChild(project);

      // Re-add animation with new delay
      setTimeout(() => {
        project.classList.add("animate-in");
        project.style.animationDelay = `${index * 0.1}s`;
      }, 50);
    });
  }
}

// Contact Form Management
class ContactFormManager {
  constructor() {
    this.init();
  }

  init() {
    contactForm.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      // Simulate API call (replace with actual endpoint)
      await this.simulateFormSubmission(data);

      // Show success message
      this.showMessage(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      contactForm.reset();
    } catch (error) {
      // Show error message
      this.showMessage("Failed to send message. Please try again.", "error");
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }

  async simulateFormSubmission(data) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log form data (in real app, send to server)
    console.log("Form submission:", data);

    // Simulate success (replace with actual API call)
    return { success: true };
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = contactForm.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement("div");
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            ${
              type === "success"
                ? "background-color: #dcfce7; color: #166534; border: 1px solid #bbf7d0;"
                : "background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;"
            }
        `;

    // Insert message at the top of the form
    contactForm.insertBefore(messageElement, contactForm.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}

// Intersection Observer for Animations
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupProgressBars();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");

          // Special handling for stats counter
          if (entry.target.classList.contains("stat")) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".tech-category, .project-card, .stat, .contact-item"
    );

    animateElements.forEach((el) => {
      observer.observe(el);
    });
  }

  animateCounter(statElement) {
    const counter = statElement.querySelector("h3");
    const target = parseInt(counter.textContent.replace("+", ""));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCounter();
  }

  setupProgressBars() {
    // Add subtle progress indication for scroll position
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
            z-index: 10000;
            transition: width 0.1s ease;
        `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const scrolled =
        (window.pageYOffset /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      progressBar.style.width = scrolled + "%";
    });
  }
}

// Header Scroll Effect
class HeaderManager {
  constructor() {
    this.header = document.querySelector(".header");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.header.style.backgroundColor =
        currentTheme === "dark"
          ? "rgba(15, 23, 42, 0.98)"
          : "rgba(248, 250, 252, 0.98)";
      this.header.style.boxShadow = "var(--shadow-md)";
    } else {
      this.header.style.backgroundColor =
        currentTheme === "dark"
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(248, 250, 252, 0.95)";
      this.header.style.boxShadow = "none";
    }
  }
}

// Keyboard Navigation
class KeyboardManager {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  handleKeydown(e) {
    // ESC to close mobile menu
    if (e.key === "Escape") {
      closeNavMenu();
    }

    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      // Focus on tech filter for quick project search
      techFilter.focus();
    }
  }
}

// Performance Monitoring
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    // Log performance metrics
    window.addEventListener("load", () => {
      if (window.performance && window.performance.timing) {
        const loadTime =
          window.performance.timing.loadEventEnd -
          window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
      }
    });

    // Lazy load images
    this.setupLazyLoading();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src || img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    }
  }
}

// Error Handling
class ErrorManager {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("error", (e) => {
      console.error("Global error:", e.error);
      // In production, send to error reporting service
    });

    window.addEventListener("unhandledrejection", (e) => {
      console.error("Unhandled promise rejection:", e.reason);
      // In production, send to error reporting service
    });
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize theme
    initTheme();

    // Initialize managers
    new ProjectManager();
    new ContactFormManager();
    new AnimationManager();
    new HeaderManager();
    new KeyboardManager();
    new PerformanceManager();
    new ErrorManager();

    // Setup event listeners
    themeToggle.addEventListener("click", toggleTheme);
    navToggle.addEventListener("click", toggleNavMenu);

    // Setup smooth scrolling
    setupSmoothScrolling();

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeNavMenu();
      }
    });

    // Close mobile menu when window is resized to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        closeNavMenu();
      }
    });

    console.log("Portfolio application initialized successfully");
  } catch (error) {
    console.error("Error initializing application:", error);
  }
});

// Export for potential use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ProjectManager,
    ContactFormManager,
    AnimationManager,
    HeaderManager,
    toggleTheme,
    initTheme,
  };
}
