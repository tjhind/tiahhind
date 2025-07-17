document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Set the current year
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Email copy & mobile hover support
  const contactButton = document.querySelector(".contact-button");
  const confirmation = document.getElementById("copy-confirmation");

  if (contactButton) {
    let isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    contactButton.addEventListener("click", function (e) {
      const email = "hello@tiahhind.com";
      navigator.clipboard.writeText(email).then(() => {
        if (confirmation) {
          const emailWrapper = confirmation.parentElement;
          emailWrapper.classList.add("show-confirmation");

          setTimeout(() => {
            emailWrapper.classList.remove("show-confirmation");
          }, 1500);
        }
      });

      // Simulate hover effect on mobile
      if (isTouchDevice) {
        e.preventDefault();
        contactButton.classList.toggle("active");

        setTimeout(() => {
          contactButton.classList.remove("active");
        }, 3000);
      }
    });
  }
});
