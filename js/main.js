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
  const emailText = document.getElementById("email");
  const linkedinLink = document.querySelector(
    ".contact-button a[href*='linkedin']"
  );

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
      let isContentVisible = false;

      contactButton.addEventListener("touchstart", function (e) {
        if (!isContentVisible) {
          e.preventDefault();
          this.classList.add("active");
          isContentVisible = true;
        }
      });

      if (emailText) {
        emailText.addEventListener("touchstart", function (e) {
          e.preventDefault();
          e.stopPropagation();
        });

        emailText.addEventListener("touchend", function (e) {
          e.preventDefault();
          e.stopPropagation();
          copyEmail();
        });
      }

      document.addEventListener("touchstart", function (e) {
        if (!contactButton.contains(e.target)) {
          contactButton.classList.remove("active");
          isContentVisible = false;
        }
      });
    } else {
      let isHovered = false;

      contactButton.addEventListener("mouseenter", function () {
        this.classList.add("hover");
        isHovered = true;
      });

      contactButton.addEventListener("mouseleave", function () {
        this.classList.remove("hover");
        isHovered = false;
      });

      if (emailText) {
        emailText.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (isHovered) {
            copyEmail();
          }
        });
      }

      contactButton.addEventListener("click", function (e) {
        if (e.target === this || e.target.closest(".default-text")) {
          e.preventDefault();
        }
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
    "button:not(.contact-button), .button, .btn, a[href]:not(.contact-button a), .clickable, .interactive"
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
  function setInitialVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setInitialVh();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const currentVh = parseFloat(
        document.documentElement.style.getPropertyValue("--vh")
      );
      const newVh = window.innerHeight * 0.01;

      if (Math.abs(newVh - currentVh) > 5) {
        setInitialVh();
      }
    }, 100);
  });

  window.addEventListener("orientationchange", () => {
    setTimeout(() => {
      setInitialVh();
    }, 500);
  });
});
