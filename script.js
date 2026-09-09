/* ==================================================
   LILISCEND
   DIGITAL FRONTIER
   JAVASCRIPT
================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     REDUCED MOTION CHECK
  ================================================== */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ==================================================
     SCROLL REVEAL
  ================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (reduceMotion) {

    revealElements.forEach((element) => {
      element.classList.add("active");
    });

  } else {

    const observer =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add("active");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -60px 0px"
        }
      );


    revealElements.forEach((element, index) => {

      /*
        同じ場所にあるカードが
        ほんの少し時間差で出現する
      */

      if (
        element.closest(".cards") ||
        element.closest(".stats") ||
        element.closest(".work-grid") ||
        element.closest(".flow")
      ) {

        element.style.transitionDelay =
          `${Math.min(index * 0.08, 0.4)}s`;

      }

      observer.observe(element);

    });

  }


  /* ==================================================
     PARTICLES
  ================================================== */

  const particleContainer =
    document.getElementById("particles");


  function createParticles() {

    if (!particleContainer) return;

    const isMobile =
      window.innerWidth <= 600;

    const particleCount =
      isMobile ? 22 : 45;


    for (let i = 0; i < particleCount; i++) {

      const particle =
        document.createElement("span");

      particle.className = "particle";


      const left =
        Math.random() * 100;

      const top =
        Math.random() * 100;

      const duration =
        5 + Math.random() * 9;

      const delay =
        Math.random() * 8;

      const moveX =
        (Math.random() * 160) - 80;


      particle.style.left =
        `${left}%`;

      particle.style.top =
        `${top}%`;

      particle.style.animationDuration =
        `${duration}s`;

      particle.style.animationDelay =
        `${delay}s`;

      particle.style.setProperty(
        "--move-x",
        `${moveX}px`
      );


      /*
        粒子の大きさをランダム化
      */

      const size =
        1 + Math.random() * 2;

      particle.style.width =
        `${size}px`;

      particle.style.height =
        `${size}px`;


      particleContainer.appendChild(
        particle
      );

    }

  }


  if (!reduceMotion) {
    createParticles();
  }


  /* ==================================================
     CURSOR GLOW
  ================================================== */

  const cursorGlow =
    document.getElementById("cursorGlow");


  if (
    cursorGlow &&
    !reduceMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    window.addEventListener(
      "mousemove",
      (event) => {

        cursorGlow.style.left =
          `${event.clientX}px`;

        cursorGlow.style.top =
          `${event.clientY}px`;

      },
      {
        passive: true
      }
    );

  }


  /* ==================================================
     NUMBER COUNTER
  ================================================== */

  const counters =
    document.querySelectorAll(
      "[data-count]"
    );


  function animateCounter(element) {

    const target =
      parseFloat(
        element.dataset.count
      );

    const decimal =
      element.dataset.decimal === "true";

    const suffix =
      element.dataset.suffix || "";


    const duration = 1400;

    const startTime =
      performance.now();


    function updateCounter(currentTime) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /*
        easeOutCubic
      */

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const current =
        target * eased;


      if (decimal) {

        element.textContent =
          current.toFixed(1) + suffix;

      } else {

        element.textContent =
          Math.floor(current) + suffix;

      }


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        if (decimal) {

          element.textContent =
            target.toFixed(1) + suffix;

        } else {

          element.textContent =
            target + suffix;

        }

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  }


  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting
          ) {

            animateCounter(
              entry.target
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.5
      }
    );


  counters.forEach((counter) => {

    if (reduceMotion) {

      const target =
        parseFloat(
          counter.dataset.count
        );

      const decimal =
        counter.dataset.decimal === "true";

      const suffix =
        counter.dataset.suffix || "";

      counter.textContent =
        decimal
          ? target.toFixed(1) + suffix
          : target + suffix;

    } else {

      counterObserver.observe(
        counter
      );

    }

  });


  /* ==================================================
     CARD TILT
     PC ONLY
  ================================================== */

  const cards =
    document.querySelectorAll(
      ".card"
    );


  if (
    !reduceMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    cards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;


          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;


          const rotateX =
            (y - centerY) /
            35;

          const rotateY =
            (centerX - x) /
            35;


          card.style.transform =
            `
              translateY(-8px)
              perspective(900px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

  }


  /* ==================================================
     SMOOTH ANCHOR
  ================================================== */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior:
            reduceMotion
              ? "auto"
              : "smooth"
        });

      }
    );

  });


  /* ==================================================
     HEADER SCROLL EFFECT
  ================================================== */

  const header =
    document.querySelector(
      ".site-header"
    );


  window.addEventListener(
    "scroll",
    () => {

      if (!header) return;


      if (window.scrollY > 30) {

        header.style.background =
          "rgba(5, 8, 20, 0.88)";

      } else {

        header.style.background =
          "rgba(5, 8, 20, 0.65)";

      }

    },
    {
      passive: true
    }
  );

});