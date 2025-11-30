document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("selectedTour");
  if (!data) return; // heÃ§ nÉ™ seÃ§ilmÉ™yibsÉ™, boÅŸ qoy

  const tour = JSON.parse(data);

  document.querySelector(".order-tour-title").textContent = tour.title;
  document.querySelector(".order-tour-location").textContent = tour.location;
  document.querySelector(".order-tour-date").textContent = tour.date;
  document.querySelector(".order-tour-days").textContent = tour.days;
  document.querySelector(".order-tour-group").textContent = tour.group;

  const priceText = tour.price.toFixed(0) + " â‚¼";
  document.querySelector(".order-price").textContent = priceText;
  document.querySelector(".order-total").textContent = priceText; // istÉ™sÉ™n vergilÉ™r É™lavÉ™ edÉ™rsÉ™n
});


