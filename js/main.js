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
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  const isMobile = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth <= 768
    );
  };

  const contactButton = document.querySelector(".contact-button");
  const confirmation = document.getElementById("copy-confirmation");

  if (contactButton) {
    const copyEmail = async () => {
      const email = "hello@tiahhind.com";
      try {
        await navigator.clipboard.writeText(email);
        if (confirmation) {
          const emailWrapper = confirmation.parentElement;
          emailWrapper.classList.add("show-confirmation");

          setTimeout(() => {
            emailWrapper.classList.remove("show-confirmation");
          }, 1500);
        }
      } catch (err) {
        console.error("Failed to copy email: ", err);
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    };

    if (isMobile()) {
      contactButton.addEventListener("touchstart", function (e) {
        e.preventDefault();
        this.classList.add("active");
      });

      contactButton.addEventListener("touchend", function (e) {
        e.preventDefault();
        copyEmail();

        setTimeout(() => {
          this.classList.remove("active");
        }, 300);
      });

      contactButton.addEventListener("click", function (e) {
        e.preventDefault();
      });
    } else {
      contactButton.addEventListener("click", function (e) {
        e.preventDefault();
        copyEmail();
      });

      contactButton.addEventListener("mouseenter", function () {
        this.classList.add("hover");
      });

      contactButton.addEventListener("mouseleave", function () {
        this.classList.remove("hover");
      });
    }
  }

  const addMobileHoverSupport = (selector) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      if (isMobile()) {
        element.addEventListener("touchstart", function () {
          this.classList.add("mobile-hover");
        });

        element.addEventListener("touchend", function () {
          setTimeout(() => {
            this.classList.remove("mobile-hover");
          }, 150);
        });

        element.addEventListener("touchcancel", function () {
          this.classList.remove("mobile-hover");
        });
      }
    });
  };

  addMobileHoverSupport(
    "button, .button, .btn, a[href], .clickable, .interactive"
  );
  if (isMobile()) {
    document.querySelectorAll(".passion-item").forEach((item) => {
      item.addEventListener("touchstart", function (e) {
        document.querySelectorAll(".passion-item").forEach((el) => {
          if (el !== this) el.classList.remove("mobile-reveal");
        });

        this.classList.toggle("mobile-reveal");
      });
    });

    document.addEventListener("touchstart", function (e) {
      if (!e.target.closest(".passion-item")) {
        document
          .querySelectorAll(".passion-item")
          .forEach((el) => el.classList.remove("mobile-reveal"));
      }
    });
  }
});
