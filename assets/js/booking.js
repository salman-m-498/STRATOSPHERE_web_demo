/* ============================================================
   STRATOSPHERE — booking page logic
   ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const A = window.STRATOSPHERE;
    const q = new URLSearchParams(location.search);
    const params = {
      activity: q.get("activity") || "pool",
      date: q.get("date") || new Date().toISOString().split("T")[0],
      time: q.get("time") || "19:00",
      duration: q.get("duration") || "1 hour",
    };

    const state = {
      activity: params.activity,
      date: params.date,
      time: null,
      duration: params.duration,
      member: false,
    };

    const activity = () => A.activities.find(a => a.id === state.activity);
    const durationHours = () => ({ "1 hour": 1, "1.5 hours": 1.5, "2 hours": 2, "3 hours": 3 })[state.duration] || 1;

    // Seeded pseudo-random for stable availability
    function seed(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
      return Math.abs(h);
    }
    function slotStatus(slot) {
      const r = seed(state.activity + state.date + slot) % 10;
      if (r < 4) return "available";
      if (r < 7) return "partial";
      return "full";
    }

    function renderFilters() {
      const el = document.getElementById("category-filters");
      if (!el) return;
      el.innerHTML = `<button class="chip" data-f="all">All</button>` +
        A.activities.map(a => `<button class="chip ${a.id === state.activity ? "chip--gold" : ""}" data-f="${a.id}">${window.ICON(a.icon, "icon")} ${a.name}</button>`).join("");
      el.querySelectorAll("[data-f]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.activity = btn.dataset.f === "all" ? "pool" : btn.dataset.f;
          state.time = null;
          renderAll();
        });
      });
    }

    function renderActivity() {
      const el = document.getElementById("activity-select");
      if (!el) return;
      el.innerHTML = A.activities.map(a => `
        <option value="${a.id}" ${a.id === state.activity ? "selected" : ""}>${a.name} — ₹${a.price}/hr</option>`).join("");
      el.addEventListener("change", (e) => { state.activity = e.target.value; state.time = null; renderAll(); });
    }

    function renderSlots() {
      const el = document.getElementById("slot-grid");
      const legend = document.getElementById("slot-legend");
      if (!el) return;
      const isPs5 = state.activity === "ps5";
      const step = isPs5 ? 30 : 60;
      const slots = [];
      for (let h = 12; h < 24; h++) {
        for (let m = 0; m < 60; m += step) {
          slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
        }
      }
      const a = activity();
      el.innerHTML = slots.map(s => {
        const st = slotStatus(s);
        const price = state.member ? a.memberPrice : a.price;
        const cls = st === "available" ? "slot--available" : st === "partial" ? "slot--partial" : "slot--full";
        const sel = state.time === s ? " slot--selected" : "";
        const label = st === "full" ? "Full" : st === "partial" ? "Few left" : "Open";
        return `<button type="button" class="slot ${cls}${sel}" data-slot="${s}" ${st === "full" ? "disabled" : ""}>
          ${s}<span class="slot__price">${st === "full" ? label : "₹" + price}</span>
        </button>`;
      }).join("");

      el.querySelectorAll("[data-slot]").forEach(btn => {
        btn.addEventListener("click", () => {
          state.time = btn.dataset.slot;
          renderSlots();
          renderSummary();
        });
      });

      if (legend) {
        legend.innerHTML = `
          <span><i class="dot dot--available"></i> Open</span>
          <span><i class="dot dot--partial"></i> Few left</span>
          <span><i class="dot dot--full"></i> Full</span>`;
      }
    }

    function renderSummary() {
      const el = document.getElementById("summary");
      if (!el) return;
      const a = activity();
      const unit = a.unit;
      const hours = durationHours();
      const base = state.member ? a.memberPrice : a.price;
      const total = (base * hours).toFixed(2);
      const savings = ((a.price - a.memberPrice) * hours).toFixed(2);

      el.innerHTML = `
        <h3>Your session</h3>
        <div class="flex-between mt-1"><span class="muted">Activity</span><strong>${window.ICON(a.icon, "icon")} ${a.name}</strong></div>
        <div class="flex-between mt-1"><span class="muted">Date</span><strong>${state.date}</strong></div>
        <div class="flex-between mt-1"><span class="muted">Time</span><strong>${state.time || "—"}</strong></div>
        <div class="flex-between mt-1"><span class="muted">Duration</span><strong>${state.duration}</strong></div>
        <div class="flex-between mt-2">
          <span class="muted">Rate</span>
          <label class="switch-label">${state.member ? "Member" : "Guest"}
            <input type="checkbox" id="member-toggle" ${state.member ? "checked" : ""}>
          </label>
        </div>
        <hr style="border-color:var(--border);margin:18px 0;">
        <div class="flex-between"><span class="muted">Total</span><span class="tier__pts" style="font-size:1.6rem;">₹${total}</span></div>
        ${state.member ? `<p class="gold-text" style="font-size:0.85rem;">You save ₹${savings} with member pricing</p>` : `<p style="font-size:0.82rem;">Join to save ₹${savings} on this session</p>`}
        <button id="confirm-btn" class="btn btn--gold btn--block mt-2" ${state.time ? "" : "disabled style='opacity:.5;cursor:not-allowed'"}>Confirm booking</button>
        ${state.time ? "" : '<p class="center muted mt-1" style="font-size:.8rem;">Select a time slot to continue</p>'}
      `;

      const toggle = el.querySelector("#member-toggle");
      if (toggle) toggle.addEventListener("change", (e) => { state.member = e.target.checked; renderSlots(); renderSummary(); });

      const confirm = el.querySelector("#confirm-btn");
      if (confirm) confirm.addEventListener("click", () => showConfirmation());
    }

    function showConfirmation() {
      const a = activity();
      const hours = durationHours();
      const base = state.member ? a.memberPrice : a.price;
      const total = (base * hours).toFixed(2);
      const main = document.getElementById("booking-main");
      main.innerHTML = `
        <div class="card center" style="padding:48px 24px;">
          <div style="display:flex;justify-content:center;color:var(--green);margin-bottom:8px;">${window.ICON("check", "icon-xl")}</div>
          <h2 class="mt-2">Booking confirmed</h2>
          <p>${window.ICON(a.icon, "icon")} ${a.name} · ${state.date} at ${state.time} · ${state.duration}</p>
          <div class="chip chip--gold mb-3">${state.member ? "Member rate" : "Guest rate"} · ₹${total}</div>
          <p class="muted">A confirmation has been sent to your email. See you in the lounge.</p>
          <div class="flex gap-2 wrap center mt-3" style="justify-content:center;">
            <a href="index.html" class="btn btn--ghost">Back home</a>
            <a href="account.html" class="btn btn--gold">View my bookings</a>
          </div>
        </div>`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function renderAll() {
      renderFilters();
      renderActivity();
      renderSlots();
      renderSummary();
      document.getElementById("date-input").value = state.date;
      document.getElementById("duration-input").value = state.duration;
    }

    // Wire date + duration controls
    const dateInput = document.getElementById("date-input");
    const durationInput = document.getElementById("duration-input");
    if (dateInput) dateInput.addEventListener("change", (e) => { state.date = e.target.value; state.time = null; renderAll(); });
    if (durationInput) durationInput.addEventListener("change", (e) => { state.duration = e.target.value; renderAll(); });

    renderAll();
  });
})();
