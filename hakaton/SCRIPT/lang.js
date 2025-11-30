



const translations = {
  az: {
    nav_home: "Ana SÉ™hifÉ™",
    nav_map: "XÉ™ritÉ™",
    nav_faq: "FAQ",
    nav_about: "HaqqÄ±mÄ±zda",
    nav_contact: "ÆlaqÉ™",
    nav_prices: "QiymÉ™tlÉ™r",
    nav_login: "GiriÅŸ",
    nav_profile: "Profil",
    nav_logout: "Ã‡Ä±xÄ±ÅŸ",
    footer_rights: "Â© 2024 AZ Land. BÃ¼tÃ¼n hÃ¼quqlar qorunur.",
  },
  en: {
    nav_home: "Home",
    nav_map: "Map",
    nav_faq: "FAQ",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_prices: "Prices",
    nav_login: "Login",
    nav_profile: "Profile",
    nav_logout: "Logout",
    footer_rights: "Â© 2024 AZ Land. All rights reserved.",
  },
  ru: {
    nav_home: "Ð“Ð»Ð°Ð²Ð½Ð°Ñ",
    nav_map: "ÐšÐ°Ñ€Ñ‚Ð°",
    nav_faq: "FAQ",
    nav_about: "Ðž Ð½Ð°Ñ",
    nav_contact: "ÐšÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ñ‹",
    nav_prices: "Ð¦ÐµÐ½Ñ‹",
    nav_login: "Ð’Ð¾Ð¹Ñ‚Ð¸",
    nav_profile: "ÐŸÑ€Ð¾Ñ„Ð¸Ð»ÑŒ",
    nav_logout: "Ð’Ñ‹Ð¹Ñ‚Ð¸",
    footer_rights: "Â© 2024 AZ Land. Ð’ÑÐµ Ð¿Ñ€Ð°Ð²Ð° Ð·Ð°Ñ‰Ð¸Ñ‰ÐµÐ½Ñ‹.",
  },
};

let currentLang = "az";

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("azland_lang", lang);
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  applyTranslations(lang);

  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-lang") === lang
      );
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("azland_lang") || "az";
  currentLang = savedLang;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

  applyTranslations(currentLang);
});


