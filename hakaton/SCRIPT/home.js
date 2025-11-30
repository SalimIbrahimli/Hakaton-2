


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});



const chatButton = document.querySelector(".chat-button");
if (chatButton) {
  chatButton.addEventListener("click", () => {
    alert("AI TravelX chat aÃ§Ä±lÄ±r...");
  });
}



const compassButton = document.querySelector(".compass-button");
if (compassButton) {
  compassButton.addEventListener("click", () => {
    alert("Ä°nteraktiv xÉ™ritÉ™ aÃ§Ä±lÄ±r...");
  });
}



const navLinks = document.querySelectorAll(".nav-links a");
if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}



const revealElements = document.querySelectorAll(
  ".hero-left, .hero-right, .feature-card, .destination-card, .tip-card, .cta-section, .footer-brand, .footer-column"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((el, idx) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${(idx % 4) * 0.08}s`;
  revealObserver.observe(el);
});



const trendingSection = document.querySelector(".trending");

if (trendingSection) {
  const popularityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll(".popularity-fill");
          fills.forEach((fill) => {
            const percent = fill.dataset.percent;
            if (!percent) return;

            if (fill.dataset.animated === "true") return;

            fill.dataset.animated = "true";
            requestAnimationFrame(() => {
              fill.style.width = percent + "%";
            });
          });

          popularityObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  popularityObserver.observe(trendingSection);
}



const iconTargets = document.querySelectorAll(
  ".feature-icon, .destination-icon, .tip-icon, .chat-button, .compass-button, .direction-btn, .social-link, .logo"
);

iconTargets.forEach((el) => {
  el.classList.add("icon-click-spin");
});


