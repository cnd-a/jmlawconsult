//turn header to sidebar when reaches certain section
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');

  if (!header || !hero) return;

  const heroBottom = hero.offsetTop + hero.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= heroBottom - 100) {
      header.classList.add('is-sidebar');
      document.body.classList.add('has-sidebar');
    } else {
      header.classList.remove('is-sidebar');
      document.body.classList.remove('has-sidebar');
    }
  });
});


// Wait for the header to exist (MutationObserver)
function initHeaderScrollBehavior() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');

  if (!header || !hero) return;

  const heroBottom = hero.offsetTop + hero.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= heroBottom - 50) {
      header.classList.add('is-sidebar');
      document.body.classList.add('has-sidebar');
    } else {
      header.classList.remove('is-sidebar');
      document.body.classList.remove('has-sidebar');
    }
  });
}

/* !!! injected header 
  MutationObserver interface provides the ability to watch for changes being made to the DOM tree */
const observer = new MutationObserver(() => {
  const header = document.querySelector('header');
  if (header) {
    observer.disconnect();
    initHeaderScrollBehavior();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});


// inject partials to main pages. js logic to replace past ejs
async function loadPartials() {
  document.getElementById("header").innerHTML =
    await (await fetch("partials/header.html")).text();

  document.getElementById("footer").innerHTML =
    await (await fetch("partials/footer.html")).text();

  setActiveNav();
  setFooterDate();
}

function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });
}

function setFooterDate() {
  const now = new Date();
  document.getElementById("year").textContent = now.getFullYear();
  document.getElementById("month").textContent =
    now.toLocaleString("en-US", { month: "long" });
}


// 
const quotes = [
  "Justice with Integrity",
  "Your Legal Partner",
  "Guidance You Can Trust","Your legal peace of mind starts here.", "Trusted advice. Proven results.", "You deserve clear answers and confident representation.",
"Guiding clients through complex legal issues—every step of the way.", "Legal strategy backed by results.",
"Every case is personal. Every client matters.", "We listen. We advise. We advocate.",
"You're not just a case number—you’re our priority.", "Don’t wait for your rights to be compromised—get legal help now.",
"Justice. Clarity. Results.", "Law with purpose.", "Your case. Our commitment.", "Where expertise meets integrity—your legal solution starts here.","Trusted legal guidance for permits, licenses, and authorizations.",
"Your roadmap through complex regulatory systems.","Licensing shouldn’t be a legal maze. We’ll guide you through.","Don’t let paperwork delay your progress—book a consultation today.",
"We help you move forward—legally and confidently.","Permits approved. Problems avoided."
];

const quoteEl = document.getElementById("quote");
if (quoteEl) {
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

loadPartials();
AOS.init({
  offset: 120,
  duration: 600,
  easing: "ease",
  once: true
});

