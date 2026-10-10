/* ============================================================
   STRATOSPHERE — shared JS (nav, footer, data, helpers)
   ============================================================ */

/* ---------- Inline SVG icon set (premium line style) ---------- */
const ICONS = {
  pool: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/>',
  snooker: '<circle cx="12" cy="7.5" r="2.3"/><circle cx="8.4" cy="14" r="2.3"/><circle cx="15.6" cy="14" r="2.3"/>',
  ps5: '<rect x="2.5" y="7" width="19" height="10" rx="5"/><path d="M7 10v4M5 12h4"/><circle cx="16.5" cy="10.5" r=".8"/><circle cx="18.5" cy="13.5" r=".8"/>',
  sim: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M3 12h6M12 21v-6M21 12h-6"/>',
  shuffleboard: '<path d="M3 9h18M3 15h18"/><circle cx="7" cy="9" r="1.4"/><circle cx="17" cy="15" r="1.4"/>',
  foosball: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M12 3v18M5 9h14M5 15h14"/><circle cx="8" cy="6" r=".7"/><circle cx="16" cy="6" r=".7"/><circle cx="8" cy="12" r=".7"/><circle cx="16" cy="12" r=".7"/>',
  trophy: '<path d="M8 4h8v5.5a4 4 0 0 1-8 0z"/><path d="M8 5.5H5.5a3 3 0 0 0 3 4M16 5.5h2.5a3 3 0 0 1-3 4"/><path d="M12 13.5V17M8.5 20h7M10 17h4v3"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  ticket: '<path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-6z"/><path d="M14 5v14"/>',
  drink: '<path d="M7 4h10l-1 6a4 4 0 0 1-8 0z"/><path d="M12 14v6M9 20h6"/>',
  group: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15a5 5 0 0 1 6 5"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
};

function ICON(name, cls = "") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

/* ---------- Shared data ---------- */
const STRATOSPHERE = {
  brand: "Stratosphere",
  tagline: "Elevate beyond gaming",
  location: "The Promenade · Level 2",
  phone: "+1 (555) 014-7799",
  email: "hello@stratosphere.lounge",

  activities: [
    { id: "pool", name: "Pool Table", icon: "pool", price: 22, memberPrice: 18, unit: "hr" },
    { id: "snooker", name: "Mini Snooker", icon: "snooker", price: 24, memberPrice: 20, unit: "hr" },
    { id: "ps5", name: "PS5 Arena", icon: "ps5", price: 16, memberPrice: 13, unit: "hr" },
    { id: "sim", name: "Car Simulator", icon: "sim", price: 28, memberPrice: 24, unit: "session" },
    { id: "shuffleboard", name: "Shuffleboard", icon: "shuffleboard", price: 18, memberPrice: 15, unit: "hr" },
    { id: "foosball", name: "Foosball", icon: "foosball", price: 14, memberPrice: 11, unit: "hr" },
  ],

  tiers: [
    { id: "cadet", name: "Cadet", pts: "0 – 999", color: "steel", perks: ["Earn 1 point per $1", "Birthday bonus points", "Member pricing on all games", "Weekly lounge newsletter"] },
    { id: "pilot", name: "Pilot", pts: "1,000 – 4,999", color: "cyan", perks: ["Priority booking windows", "2x points on weekdays", "Free session every 10 visits", "Exclusive pilot-only events"] },
    { id: "astronaut", name: "Astronaut", pts: "5,000+", color: "gold", perks: ["Private tournament invites", "Complimentary VIP lounge access", "Personal game concierge", "4x points on everything"] },
  ],

  testimonials: [
    { name: "Marcus T.", role: "PS5 regular", text: "Booked a bay on my phone in 20 seconds. The vibe is unreal — feels like a members club, not an arcade.", rating: 5 },
    { name: "Lena K.", role: "Car sim league", text: "The sim rigs are the best in the city. We run our whole league night here every Thursday.", rating: 5 },
    { name: "Dev A.", role: "Pool night organiser", text: "Stratosphere is our go-to for crew nights. Tables are immaculate and the staff actually know the games.", rating: 5 },
  ],

  players: [
    { name: "Jae", games: ["FIFA", "PS5"], skill: "Competitive", time: "Weekday evenings", vibe: "competitive" },
    { name: "Nadia", games: ["8-ball", "Snooker"], skill: "Intermediate", time: "Weekends", vibe: "casual" },
    { name: "Riko", games: ["Car Sim", "Gran Turismo"], skill: "Elite", time: "Late nights", vibe: "competitive" },
    { name: "Sam", games: ["Foosball", "Shuffleboard"], skill: "Beginner", time: "Anytime", vibe: "beginner" },
    { name: "Priya", games: ["FIFA", "FC 25"], skill: "Intermediate", time: "Weekday nights", vibe: "casual" },
    { name: "Omar", games: ["8-ball", "Pool"], skill: "Elite", time: "Weekend afternoons", vibe: "competitive" },
  ],

  tournaments: [
    { name: "Friday Night 8-Ball Open", game: "Pool", date: "Oct 16", time: "7:00 PM", prize: "$500", spots: "32", fee: "$25", featured: true },
    { name: "Gran Turismo Time Trial", game: "Car Sim", date: "Oct 18", time: "5:00 PM", prize: "$300", spots: "16", fee: "$20", featured: false },
    { name: "FC 25 2v2 Clash", game: "PS5", date: "Oct 21", time: "6:30 PM", prize: "$400", spots: "24", fee: "$15", featured: false },
    { name: "Snooker Sunday League", game: "Snooker", date: "Oct 25", time: "3:00 PM", prize: "$250", spots: "12", fee: "$18", featured: false },
  ],
};

/* ---------- Auth (localStorage) ---------- */
const Auth = {
  key: "stratosphere_user",
  getUser() {
    try { return JSON.parse(localStorage.getItem(this.key)); } catch (e) { return null; }
  },
  setUser(u) { localStorage.setItem(this.key, JSON.stringify(u)); },
  clear() { localStorage.removeItem(this.key); },
  isLoggedIn() { return !!this.getUser(); },
};

/* ---------- Header / footer templates ---------- */
function navLink(href, label, active) {
  return `<a href="${href}"${active ? ' class="is-active"' : ""}>${label}</a>`;
}

function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const path = location.pathname.split("/").pop() || "index.html";
  const user = Auth.getUser();
  const authBtn = user
    ? `<a class="btn btn--gold btn--sm" href="account.html">${user.firstName || "Account"}</a>`
    : `<a class="btn btn--outline btn--sm" href="login.html">Login</a>
       <a class="btn btn--gold btn--sm" href="booking.html">Book Now</a>`;

  header.innerHTML = `
    <div class="container">
      <a class="brand" href="index.html">
        <span class="brand__logo"><img src="media/logo-512.png" alt="Stratosphere logo"></span>
        <span>Strato<span class="brand__mark">sphere</span></span>
      </a>
      <nav class="main-nav">
        ${navLink("index.html", "Home", path === "index.html")}
        ${navLink("booking.html", "Book", path === "booking.html")}
        ${navLink("rewards.html", "Rewards", path === "rewards.html")}
        ${navLink("community.html", "Community", path === "community.html")}
        ${navLink("tournaments.html", "Tournaments", path === "tournaments.html")}
      </nav>
      <div class="nav-cta">${authBtn}</div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu">☰</button>
    </div>`;

  const toggle = document.getElementById("nav-toggle");
  const drawer = document.getElementById("mobile-nav");
  toggle.addEventListener("click", () => {
    drawer.classList.toggle("open");
    toggle.textContent = drawer.classList.contains("open") ? "✕" : "☰";
  });
}

function renderMobileNav() {
  const drawer = document.getElementById("mobile-nav");
  if (!drawer) return;
  const path = location.pathname.split("/").pop() || "index.html";
  const user = Auth.getUser();
  drawer.innerHTML = `
    ${navLink("index.html", "Home", path === "index.html")}
    ${navLink("booking.html", "Book", path === "booking.html")}
    ${navLink("rewards.html", "Rewards", path === "rewards.html")}
    ${navLink("community.html", "Community", path === "community.html")}
    ${navLink("tournaments.html", "Tournaments", path === "tournaments.html")}
    ${user ? navLink("account.html", "Account", path === "account.html") : ""}
    ${user ? "" : '<a class="btn btn--gold btn--block" href="login.html">Login / Sign up</a>'}
    <a class="btn btn--outline btn--block" href="booking.html">Book a Session</a>
  `;
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  const d = STRATOSPHERE;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a class="brand" href="index.html">
            <span class="brand__logo"><img src="media/logo-512.png" alt=""></span>
            <span>Strato<span class="brand__mark">sphere</span></span>
          </a>
          <p class="footer-blurb mt-2">A premium social gaming lounge. Play harder. Connect deeper. Win bigger.</p>
          <div class="social-row">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="TikTok">TT</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Play</h4>
          <ul>
            <li><a href="booking.html">Book a session</a></li>
            <li><a href="booking.html">Pool tables</a></li>
            <li><a href="booking.html">PS5 arena</a></li>
            <li><a href="booking.html">Car simulator</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Community</h4>
          <ul>
            <li><a href="community.html">Find players</a></li>
            <li><a href="tournaments.html">Tournaments</a></li>
            <li><a href="rewards.html">Rewards</a></li>
            <li><a href="account.html">My account</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Visit</h4>
          <ul>
            <li>${d.location}</li>
            <li><a href="tel:${d.phone.replace(/[^+\d]/g, "")}">${d.phone}</a></li>
            <li><a href="mailto:${d.email}">${d.email}</a></li>
            <li>Open daily · 12:00 – 1:00 AM</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Stratosphere Lounge. All rights reserved.</span>
        <span>Demo concept · Elevate beyond gaming</span>
      </div>
    </div>`;
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderMobileNav();
  renderFooter();
  initReveal();
});

/* Expose for page scripts */
window.STRATOSPHERE = STRATOSPHERE;
window.Auth = Auth;
window.ICON = ICON;
