# Stratosphere — Build Plan

## 1. Project goal
Premium, mobile-first demo site for the Stratosphere gaming lounge. The primary job is to make it effortless for clients to book tables and seats (pool, PS5 bays, car sim, shuffleboard, foosball, mini snooker), plus sign up, earn rewards, join community matches and enter tournaments.

Visual identity: bold, professional and fun — deep blue + gold brand system with an electric accent for energy. NOT a generic arcade.

## 2. Stack & structure
Static multi-page HTML/CSS/JS. No build step. Shared CSS/JS, mock data and `localStorage` for auth/booking state.

```
index.html         Home / landing
booking.html       Booking + availability
login.html         Login / signup
account.html       Member dashboard
rewards.html       Loyalty / rewards
community.html     Find players + feed
tournaments.html   Events + brackets
admin.html         Light admin demo
assets/css/styles.css
assets/js/main.js      (nav, theme, shared data)
assets/js/booking.js
assets/js/admin.js
media/             (prepared assets)
```

## 3. Brand palette (single source of truth)
- Primary blue `#12407B` (from logo)
- Deep navy / charcoal `#08131E` — page backgrounds
- Bronze gold `#AE8D47` — secondary brand (from logo)
- Bright gold `#E7C76A` — CTA / hover glow (energy)
- Electric cyan `#2EE6D6` — fun accent: live/available status, game tags, glow
- Steel blue `#89A2BC` — muted text / borders
- White `#F5F7FA`

Cyan is used sparingly as the "fun" counterpoint (status, badges, glow), never as a dominant fill.

## 4. Consistency fixes from the original plan
- One palette (was split across §2 and §4).
- Loyalty tiers unified to Cadet / Pilot / Astronaut (space theme; replaces Rookie/Elite/VIP).
- Multi-page structure (original implied a single index.html).
- Admin trimmed to a single light demo screen.

## 5. Media prep
- Rename/convert the `.heic` (actually JPEG) -> `media/community-01.webp`.
- Keep the existing `.webp` as `media/community-02.webp`.
- Two MP4s -> hero/community background video (muted, autoplay).
- `logo.png` (1024x1024) used as-is, masked rounded where shown.

## 6. Pages (mobile-first)
1. **Home** — hero (video bg + wordmark), quick booking panel, experience highlights, why Stratosphere, game grid, community proof, loyalty teaser, tournament teaser, footer.
2. **Booking** — category filter, activity, time-slot grid, availability states (available / partial / full), pricing summary, confirm UI.
3. **Login / signup** — tabs, email/phone, password reset, social placeholders.
4. **Account** — bookings history, rewards balance, favorite games, upcoming tournaments.
5. **Rewards** — points tracker, Cadet/Pilot/Astronaut tiers, benefits, redemptions.
6. **Community** — find-players cards, filters (casual / competitive / beginner), feed with brand images/videos.
7. **Tournaments** — upcoming list, featured card, filters, bracket mock, registration form.
8. **Admin (light demo)** — today-at-a-glance stats + live floor view (station cards: Free / Booked / In use / Offline) + quick actions. Staff phone layout.

## 7. Build order
1. CSS design system + shared nav/footer + media prep
2. Home (hero + booking panel + grids)
3. Booking page
4. Login + account
5. Rewards + community + tournaments
6. Admin demo
7. Motion / responsive polish
