const { animate, stagger } = Motion;

document.addEventListener("DOMContentLoaded", function () {
  const animationConfig = {
    fadeUp: {
      initial: { opacity: 0, transform: "translateY(30px)" },
      animate: { opacity: 1, transform: "translateY(0px)" },
      options: { duration: 0.6, easing: "ease-out" },
    },

    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      options: { duration: 0.8, easing: "ease-out" },
    },

    scaleUp: {
      initial: { opacity: 0, transform: "scale(0.8)" },
      animate: { opacity: 1, transform: "scale(1)" },
      options: { duration: 0.5, easing: [0.25, 0.46, 0.45, 0.94] },
    },

    slideLeft: {
      initial: { opacity: 0, transform: "translateX(-50px)" },
      animate: { opacity: 1, transform: "translateX(0px)" },
      options: { duration: 0.7, easing: "ease-out" },
    },

    slideRight: {
      initial: { opacity: 0, transform: "translateX(50px)" },
      animate: { opacity: 1, transform: "translateX(0px)" },
      options: { duration: 0.7, easing: "ease-out" },
    },
  };

  function setInitialState(element, animationType) {
    const config = animationConfig[animationType];
    if (config) {
      element.style.opacity = "0";
      if (config.initial.transform) {
        element.style.transform = config.initial.transform;
      }
    }
  }

  function animateElement(element, animationType, delay = 0) {
    const config = animationConfig[animationType];
    if (!config) return;

    const options = { ...config.options };
    if (delay > 0) {
      options.delay = delay;
    }

    animate(element, config.animate, options);
  }

  function animateGroup(elements, animationType, staggerDelay = 0.1) {
    const config = animationConfig[animationType];
    if (!config) return;

    elements.forEach((element, index) => {
      animateElement(element, animationType, index * staggerDelay);
    });
  }

  const elementsToAnimate = [
    // Hero section
    { selector: "#hero h1", type: "fadeUp", delay: 0.2 },
    { selector: "#hero h2", type: "fadeUp", delay: 0.4 },
    { selector: "#hero h3", type: "fadeUp", delay: 0.6 },
    { selector: "#hero-image", type: "fadeIn", delay: 0.3 },

    // About section
    { selector: "#about p", type: "fadeUp" },

    // Passion section
    { selector: "#passionate-about h2", type: "fadeIn" },
    {
      selector: ".passion-item",
      type: "scaleUp",
      stagger: true,
      staggerDelay: 0.15,
    },

    // Experience section
    { selector: "#experience h2", type: "fadeIn" },
    { selector: "#verticode-logo", type: "slideLeft" },
    { selector: "#verticode-description", type: "slideRight" },
    { selector: "#products-heading", type: "fadeIn" },
    {
      selector: ".sector-row",
      type: "fadeUp",
      stagger: true,
      staggerDelay: 0.1,
    },
    { selector: "#work-heading", type: "fadeIn" },
    {
      selector: ".other-experience-container",
      type: "fadeUp",
      stagger: true,
      staggerDelay: 0.2,
    },
    {
      selector: ".metric-card",
      type: "scaleUp",
      stagger: true,
      staggerDelay: 0.15,
    },

    // Tech stack section
    { selector: "#stack h2", type: "fadeIn" },
    {
      selector: ".stack-logo",
      type: "scaleUp",
      stagger: true,
      staggerDelay: 0.1,
    },
  ];

  elementsToAnimate.forEach(({ selector, type }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => setInitialState(element, type));
  });

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const animationType = entry.target.dataset.animationType;
        const delay = parseFloat(entry.target.dataset.delay) || 0;
        const isStagger = entry.target.dataset.stagger === "true";
        const staggerDelay =
          parseFloat(entry.target.dataset.staggerDelay) || 0.1;

        if (isStagger) {
          const selector = entry.target.dataset.selector;
          const siblingElements = document.querySelectorAll(selector);
          const elementsArray = Array.from(siblingElements);

          const isFirstElement = elementsArray[0] === entry.target;
          if (isFirstElement) {
            animateGroup(elementsArray, animationType, staggerDelay);
            elementsArray.forEach((el) => (el.dataset.animated = "true"));
          }
        } else {
          animateElement(entry.target, animationType, delay);
          entry.target.dataset.animated = "true";
        }
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(
    ({ selector, type, delay = 0, stagger = false, staggerDelay = 0.1 }) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        element.dataset.animationType = type;
        element.dataset.delay = delay.toString();
        element.dataset.stagger = stagger.toString();
        element.dataset.staggerDelay = staggerDelay.toString();
        element.dataset.selector = selector;

        observer.observe(element);
      });
    }
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion.matches) {
    // If user prefers reduced motion, show all elements immediately
    elementsToAnimate.forEach(({ selector }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
    });
  }

  const immediateElements = document.querySelectorAll(
    "#hero h1, #hero h2, #hero h3, #hero-image"
  );
  if (!prefersReducedMotion.matches) {
    setTimeout(() => {
      immediateElements.forEach((element, index) => {
        if (!element.dataset.animated) {
          const animationType = element.dataset.animationType;
          const delay = parseFloat(element.dataset.delay) || index * 0.2;
          animateElement(element, animationType, delay);
          element.dataset.animated = "true";
        }
      });
    }, 100);
  }
});
