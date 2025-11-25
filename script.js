// script.js
// Mobile menu toggle, smooth scroll, active nav item, and footer year.

document.addEventListener('DOMContentLoaded', function () {

  /* ===========================================================
      HAMBURGER MENU (NAV MOBILE)
  ============================================================ */

  const hamburger = document.getElementById("hamburger");
  const navFloating = document.querySelector(".nav");  // nav yang floating

  if (hamburger && navFloating) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navFloating.classList.toggle("open");
    });
  }

  /* ===========================================================
      EXISTING MENU SCRIPT (tetap utuh)
  ============================================================ */

  const btnMenu = document.getElementById('btn-menu');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // ==== Mobile menu toggle (versi lama — biarkan, tidak dipakai jika tidak ada id="btn-menu") ====
  if (btnMenu && nav) {
    btnMenu.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // ==== Smooth scroll ====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        if (navFloating) navFloating.classList.remove('open'); // tutup hamburger menu
        if (hamburger) hamburger.classList.remove('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', targetId);
      }
    });
  });

  // ==== Highlight nav item on scroll ====
  function onScroll() {
    const scY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      const id = section.getAttribute('id');

      if (scY >= sectionTop && scY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  // ==== Navbar effect on scroll ====
  const navbar = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==== Footer year ====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==== Contact form ====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! (Form ini hanya contoh — hubungkan ke backend untuk mengirim pesan.)');
      contactForm.reset();
    });
  }

  /* ===============================
      CERTIFICATE SLIDER (tetap utuh)
  ================================ */

  const cards = document.querySelectorAll(".cert");
  let pos = 0;

  function updateCards() {
    cards.forEach(card => card.className = "cert");

    cards[pos].classList.add("is-active");
    cards[(pos + 1) % cards.length].classList.add("is-right");
    cards[(pos - 1 + cards.length) % cards.length].classList.add("is-left");

    cards[(pos + 2) % cards.length].classList.add("is-back");
    cards[(pos - 2 + cards.length) % cards.length].classList.add("is-back");
  }

  updateCards();

  document.querySelector(".cert-slider").addEventListener("click", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      pos = (pos - 1 + cards.length) % cards.length;
    } else {
      pos = (pos + 1) % cards.length;
    }

    updateCards();
  });

  let startX = 0;

  document.querySelector(".cert-slider").addEventListener("mousedown", e => {
    startX = e.clientX;
  });
  document.querySelector(".cert-slider").addEventListener("mouseup", e => {
    let dx = e.clientX - startX;
    if (dx < -40) pos = (pos + 1) % cards.length;
    if (dx > 40) pos = (pos - 1 + cards.length) % cards.length;
    updateCards();
  });

  document.querySelector(".cert-slider").addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  document.querySelector(".cert-slider").addEventListener("touchend", e => {
    let dx = e.changedTouches[0].clientX - startX;
    if (dx < -40) pos = (pos + 1) % cards.length;
    if (dx > 40) pos = (pos - 1 + cards.length) % cards.length;
    updateCards();
  });

  document.querySelectorAll(".cert-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
    });
  });

  /* ===============================
      HERO ANIMATION
  ================================ */

  const heroLeft = document.querySelector(".hero-left");

  if (heroLeft) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heroLeft.classList.remove("animate");
            void heroLeft.offsetWidth;
            heroLeft.classList.add("animate");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(heroLeft);
  }

  /* ===============================
      TIMELINE ITEM ANIMATION
  ================================ */

  const timelineItems = document.querySelectorAll(".timeline-item");

  if (timelineItems.length > 0) {

    const observerTimeline = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("animate");
            void entry.target.offsetWidth;
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItems.forEach(item => observerTimeline.observe(item));
  }

  const items = document.querySelectorAll(".fade-in-left, .fade-in-right");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach(item => observer.observe(item));

  /* ===== FORCE RESET ANIMATION SETIAP MASUK MENU CONTACT ===== */

const contactSection = document.querySelector("#contact"); 
const contactElements = document.querySelectorAll(".contact-left, .contact-right");

if (contactSection && contactElements.length > 0) {

  const observerContactFull = new IntersectionObserver(entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        // SECTION CONTACT masuk layar → animasi aktif kembali
        contactElements.forEach(el => {
          el.classList.remove("show");        // reset
          void el.offsetWidth;                // reflow → restart animasi
          el.classList.add("show");           // animasi muncul
        });

      } else {
        // SECTION CONTACT keluar layar → hapus animasi
        contactElements.forEach(el => {
          el.classList.remove("show");
        });
      }

    });
  }, { threshold: 0.3 });

  observerContactFull.observe(contactSection);
}

  /* ===============================
        FORM SUBMIT WITH POPUP SUCCESS
  =============================== */
  const msgForm = document.querySelector("form[action*='formsubmit']");
  if (msgForm) {
    msgForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const formData = new FormData(msgForm);

      await fetch(msgForm.action, {
        method: "POST",
        body: formData
      });

      document.getElementById("successPopup").style.display = "flex";
      msgForm.reset();
    });
  }

  const closePopup = document.getElementById("closePopup");
  if (closePopup) {
    closePopup.addEventListener("click", () => {
      document.getElementById("successPopup").style.display = "none";
    });
  }

    /* ===============================
        PROJECT DETAIL (OPEN / CLOSE)
  =============================== */

  window.openDetail = function(id) {
    document.getElementById(id).style.display = "block";
    document.body.style.overflow = "hidden"; 
  }

  window.closeDetail = function() {
    document.querySelectorAll('.project-detail')
      .forEach(d => d.style.display = "none");
    document.body.style.overflow = "auto";
  }
  
// Alternating left-right photo layout
const boxes = document.querySelectorAll(".detail-box");

boxes.forEach((box, index) => {
  if ((index + 1) % 2 === 1) {
    box.classList.add("from-right");
  } else {
    box.classList.add("from-left");
  }
});

// Observer khusus untuk detail-box (hindari bentrok nama variable)
const observerDetailBox = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.25
});

// Apply observer ke semua box
boxes.forEach(box => observerDetailBox.observe(box));
  
}); // END DOMContentLoaded