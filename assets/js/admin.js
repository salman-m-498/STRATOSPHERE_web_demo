/* ============================================================
   STRATOSPHERE — admin demo (light)
   ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("admin-root");
    if (!root) return;

    const stations = [
      { id: 1, name: "Pool Table 1", type: "Pool", cap: "2–4 players", status: "inuse", cust: "M. Turner" },
      { id: 2, name: "Pool Table 2", type: "Pool", cap: "2–4 players", status: "free" },
      { id: 3, name: "Pool Table 3", type: "Pool", cap: "2–4 players", status: "booked", cust: "7:30 PM" },
      { id: 4, name: "Pool Table 4", type: "Pool", cap: "2–4 players", status: "free" },
      { id: 5, name: "PS5 Couch 1", type: "PS5", cap: "Up to 4", status: "inuse", cust: "L. Kim" },
      { id: 6, name: "PS5 Couch 2", type: "PS5", cap: "Up to 4", status: "free" },
      { id: 7, name: "PS5 Couch 3", type: "PS5", cap: "Up to 4", status: "free" },
      { id: 8, name: "Sim Rig 1", type: "Car Sim", cap: "1 driver", status: "offline", cust: "Maintenance" },
      { id: 9, name: "Sim Rig 2", type: "Car Sim", cap: "1 driver", status: "booked", cust: "8:00 PM" },
      { id: 10, name: "Shuffleboard", type: "Shuffleboard", cap: "2–4 players", status: "free" },
      { id: 11, name: "Foosball", type: "Foosball", cap: "2–4 players", status: "free" },
      { id: 12, name: "Mini Snooker", type: "Snooker", cap: "2 players", status: "inuse", cust: "O. Reed" },
    ];

    const statusMeta = {
      free: { label: "Free", cls: "dot--available", text: "chip--green" },
      booked: { label: "Booked", cls: "dot--partial", text: "chip--amber" },
      inuse: { label: "In use", cls: "dot--full", text: "chip--cyan" },
      offline: { label: "Offline", cls: "", text: "chip--red" },
    };

    let floor = stations.map(s => ({ ...s }));

    function render() {
      root.innerHTML = `
        <div class="admin-toolbar">
          <div>
            <span class="eyebrow">Admin demo</span>
            <h1>Live floor view</h1>
            <p class="muted" style="font-size:.9rem;margin:0;">${new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })} · Front desk</p>
          </div>
          <div class="flex gap-1 wrap">
            <button class="btn btn--gold btn--sm" id="qa-booking">+ New booking</button>
            <button class="btn btn--outline btn--sm" id="qa-announce">Announcement</button>
          </div>
        </div>

        <div class="dash-stats mb-3">
          <div class="card dash-stat"><div class="num">18</div><div class="lbl">Bookings today</div></div>
          <div class="card dash-stat"><div class="num">$1,240</div><div class="lbl">Revenue</div></div>
          <div class="card dash-stat"><div class="num">62%</div><div class="lbl">Occupancy</div></div>
        </div>

        <h3 class="mb-2">Stations</h3>
        <div class="floor-grid">
          ${floor.map(s => {
            const m = statusMeta[s.status];
            const dot = s.status === "offline" ? '<span class="dot" style="background:var(--red);width:10px;height:10px;"></span>' : `<span class="dot ${m.cls}"></span>`;
            return `
            <div class="card station-card">
              <div class="status">${dot}<span class="chip ${m.text}">${m.label}</span></div>
              <h3>${s.name}</h3>
              <div class="station__meta">${s.type} · ${s.cap}</div>
              ${s.cust ? `<div class="station__meta mt-1">${s.status === "booked" ? "Next: " : ""}${s.cust}</div>` : ""}
              <div class="station__actions">
                ${s.status === "inuse" ? `<button class="btn btn--ghost btn--sm" data-act="end" data-id="${s.id}">End session</button>` : ""}
                ${s.status === "free" ? `<button class="btn btn--gold btn--sm" data-act="checkin" data-id="${s.id}">Check in</button>` : ""}
                ${s.status === "booked" ? `<button class="btn btn--cyan btn--sm" data-act="checkin" data-id="${s.id}">Check in</button>` : ""}
                ${s.status === "offline" ? `<button class="btn btn--ghost btn--sm" data-act="online" data-id="${s.id}">Bring online</button>` : ""}
                ${s.status === "free" ? `<button class="btn btn--ghost btn--sm" data-act="block" data-id="${s.id}">Block</button>` : ""}
              </div>
            </div>`;
          }).join("")}
        </div>
      `;

      root.querySelectorAll("[data-act]").forEach(btn => {
        btn.addEventListener("click", () => {
          const s = floor.find(x => x.id === +btn.dataset.id);
          if (!s) return;
          if (btn.dataset.act === "end") { s.status = "free"; s.cust = ""; }
          if (btn.dataset.act === "checkin") { s.status = "inuse"; s.cust = "Walk-in"; }
          if (btn.dataset.act === "online") { s.status = "free"; s.cust = ""; }
          if (btn.dataset.act === "block") { s.status = "offline"; s.cust = "Blocked"; }
          render();
        });
      });

      document.getElementById("qa-booking").addEventListener("click", () => alert("New booking flow (demo): tap a station, pick a time, add customer."));
      document.getElementById("qa-announce").addEventListener("click", () => alert("Announcement builder (demo): publish a banner to the site."));
    }

    render();
  });
})();
