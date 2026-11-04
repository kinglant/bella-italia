/* ===================== Bella Italia — interactions ===================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const t = (key, vars) => window.i18n.t(key, vars);
  const isIT = () => window.i18n.lang === "it";
  window.i18n.applyStatic();

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  /* ---------- Header: shadow on scroll + back-to-top ---------- */
  const header = $("#header");
  const toTop = $("#toTop");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 20);
    toTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile menu ---------- */
  const burger = $("#burger");
  const nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", t(open ? "aria.closeMenu" : "aria.openMenu"));
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !header.contains(e.target)) setMenu(false);
  });

  /* ---------- Scrollspy: highlight active nav link ---------- */
  const links = $$(".nav__link");
  const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
  const spy = () => {
    const mark = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0];
    sections.forEach((s) => { if (s.offsetTop <= mark) current = s; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current.id));
  };
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 80 + "ms";
    io.observe(el);
  });

  /* ---------- Our story: read more ---------- */
  const storyBtn = $("#storyToggle");
  const storyMore = $("#storyMore");
  storyBtn.addEventListener("click", () => {
    const open = storyMore.hidden;
    storyMore.hidden = !open;
    setStoryLabel();
    storyBtn.setAttribute("aria-expanded", open);
  });
  const setStoryLabel = () => { storyBtn.textContent = t(storyMore.hidden ? "story.readMore" : "story.less"); };
  setStoryLabel();

  /* ---------- Reusable slider (specials + reviews) ---------- */
  function makeSlider({ wrap, track, prev, next, dots, interval = 5000 }) {
    const step = () => {
      const card = track.firstElementChild;
      return card ? card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0) : 1;
    };
    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const updateDots = () => {
      const idx = Math.round(track.scrollLeft / step());
      $$("span", dots).forEach((d, i) => d.classList.toggle("active", i === idx));
    };
    const build = () => {
      const pages = Math.max(1, Math.round(maxScroll() / step()) + 1);
      dots.innerHTML = "";
      for (let i = 0; i < pages; i++) dots.appendChild(document.createElement("span"));
      updateDots();
    };
    const slide = (dir) => {
      const max = maxScroll();
      if (max <= 2) return;
      let target = track.scrollLeft + dir * step();
      if (dir > 0 && track.scrollLeft >= max - 2) target = 0;   // wrap to start
      if (dir < 0 && track.scrollLeft <= 2) target = max;       // wrap to end
      track.scrollTo({ left: target, behavior: "smooth" });
    };
    next.addEventListener("click", () => slide(1));
    prev.addEventListener("click", () => slide(-1));
    track.addEventListener("scroll", updateDots, { passive: true });
    window.addEventListener("resize", build);
    window.addEventListener("load", build);
    build();

    // Auto-play, paused on hover / touch
    let auto;
    const start = () => { clearInterval(auto); auto = setInterval(() => slide(1), interval); };
    wrap.addEventListener("mouseenter", () => clearInterval(auto));
    wrap.addEventListener("mouseleave", start);
    wrap.addEventListener("touchstart", () => clearInterval(auto), { passive: true });
    start();
    return { build, toStart: () => track.scrollTo({ left: 0, behavior: "smooth" }) };
  }

  makeSlider({ wrap: $(".carousel"), track: $("#track"), prev: $("#prevBtn"), next: $("#nextBtn"), dots: $("#dots") });

  /* ---------- Guest reviews ---------- */
  const rTrack = $("#rTrack");
  const esc = (t) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (n) => n.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const reviewHTML = (r) => `
    <article class="r-card${r.mine ? " r-card--new" : ""}">
      <svg class="r-card__quote" viewBox="0 0 48 36" aria-hidden="true"><path d="M0 36V20C0 8 7 1 19 0l2 5c-7 2-10 6-10 12h9v19zm27 0V20C27 8 34 1 46 0l2 5c-7 2-10 6-10 12h9v19z"/></svg>
      <div class="stars" aria-label="${r.rating} out of 5 stars">${"★".repeat(r.rating)}<span class="stars__off">${"★".repeat(5 - r.rating)}</span></div>
      <p class="r-card__text">${esc(r.text)}</p>
      ${r.dish ? `<p class="r-card__dish">${t("r.ordered")} <b>${esc(r.dish)}</b></p>` : ""}
      <footer class="r-card__foot">
        <span class="avatar" style="--h:${r.hue}">${esc(initials(r.name))}</span>
        <div><strong>${esc(r.name)}</strong><small>${esc(r.mine ? t("r.guest") : r.city)}</small></div>
        <span class="r-card__src">${esc(r.source)}<br><small>${esc(r.mine ? t("r.justNow") : r.date)}</small></span>
      </footer>
    </article>`;

  let myReviews = [];
  try { myReviews = JSON.parse(localStorage.getItem("bella-reviews") || "[]"); } catch (_) { myReviews = []; }
  const renderReviews = () => { rTrack.innerHTML = [...myReviews, ...window.REVIEWS].map(reviewHTML).join(""); };
  renderReviews();
  const reviewSlider = makeSlider({ wrap: $(".r-slider"), track: rTrack, prev: $("#rPrev"), next: $("#rNext"), dots: $("#rDots"), interval: 6500 });

  // Write-a-review modal
  const rModal = $("#reviewModal");
  const rForm = $("#reviewForm");
  const rfErr = $("#rfError");
  const starBtns = $$(".star-input button", rForm);
  let rating = 0;
  const paintStars = (v) => starBtns.forEach((b) => b.classList.toggle("on", +b.dataset.v <= v));
  starBtns.forEach((b) => {
    b.addEventListener("mouseenter", () => paintStars(+b.dataset.v));
    b.addEventListener("click", () => { rating = +b.dataset.v; paintStars(rating); rfErr.textContent = ""; });
  });
  $(".star-input", rForm).addEventListener("mouseleave", () => paintStars(rating));

  const openReview = () => { rModal.hidden = false; rating = 0; paintStars(0); rfErr.textContent = ""; rForm.reset(); $("#rfName").focus(); };
  const closeReview = () => { rModal.hidden = true; $("#writeReviewBtn").focus(); };
  $("#writeReviewBtn").addEventListener("click", openReview);
  $$("[data-close]", rModal).forEach((b) => b.addEventListener("click", closeReview));
  rModal.addEventListener("click", (e) => { if (e.target === rModal) closeReview(); });

  rForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#rfName").value.trim();
    const text = $("#rfText").value.trim();
    if (!rating) return (rfErr.textContent = t("rf.errStars"));
    if (name.length < 2) return (rfErr.textContent = t("rf.errName"));
    if (text.length < 10) return (rfErr.textContent = t("rf.errText"));
    myReviews.unshift({ name, city: "Guest", source: "Bella Italia", date: "Just now", rating, text, hue: Math.floor(Math.random() * 360), mine: true });
    try { localStorage.setItem("bella-reviews", JSON.stringify(myReviews.slice(0, 5))); } catch (_) {}
    renderReviews();
    reviewSlider.build();
    reviewSlider.toStart();
    closeReview();
    showToast(t("toast.review"));
  });

  /* ---------- Full menu ---------- */
  const menuTabs = $("#menuTabs");
  const menuList = $("#menuList");
  const menuHead = $("#menuHead");
  const money = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
  const tagHTML = (tag) => ({
    v: `<span class="tag tag--v" title="${t("legend.v")}">V</span>`,
    gf: `<span class="tag tag--gf" title="${t("legend.gf")}">GF</span>`,
    hot: `<span class="tag tag--hot" title="${t("legend.hot")}"><svg viewBox="0 0 24 24"><path d="M14 4c0 2 2 2 2 4M8 9c5-2 9 0 10 5 1 5-4 8-9 7S2 16 4 12c1-2 2-3 4-3z"/></svg></span>`,
    chef: `<span class="tag tag--chef" title="${t("legend.chef")}">★</span>`,
  })[tag];
  const L = (obj, field) => (isIT() && obj[field + "It"]) || obj[field];
  let currentCat = window.MENU ? window.MENU[0].id : null;
  function renderMenu(id) {
    const cat = window.MENU.find((c) => c.id === id) || window.MENU[0];
    currentCat = cat.id;
    $$(".menu-tab", menuTabs).forEach((tab) => {
      const on = tab.dataset.id === cat.id;
      tab.classList.toggle("active", on);
      tab.setAttribute("aria-selected", on);
    });
    menuHead.innerHTML = `<h3>${L(cat, "name")}</h3><p>${L(cat, "sub")}</p>`;
    menuList.innerHTML = cat.items.map((it) => {
      const price = Array.isArray(it.price) ? it.price.map(money).join(" / ") : money(it.price);
      return `<article class="m-item">
        <div class="m-item__top">
          <h4 class="m-item__name">${L(it, "name")} ${it.tags.map(tagHTML).join("")}</h4>
          <span class="m-item__dots"></span>
          <span class="m-item__price">${price}</span>
        </div>
        <p class="m-item__desc">${L(it, "desc")}</p>
      </article>`;
    }).join("");
    menuList.classList.remove("switching");
    void menuList.offsetWidth; // restart animation
    menuList.classList.add("switching");
  }
  if (window.MENU && menuTabs) {
    const renderTabs = () => {
      menuTabs.innerHTML = window.MENU.map((c) =>
        `<button class="menu-tab" role="tab" data-id="${c.id}">${L(c, "name")}</button>`).join("");
    };
    renderTabs();
    document.addEventListener("langchange", () => { renderTabs(); renderMenu(currentCat); });
    menuTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".menu-tab");
      if (btn) renderMenu(btn.dataset.id);
    });
    renderMenu(window.MENU[0].id);
  }

  /* ---------- Reservation form ---------- */
  const form = $("#reserveForm");
  const dateIn = $("#resDate");
  const timeSel = $("#resTime");
  const guestsSel = $("#resGuests");
  const errorEl = $("#formError");

  const pad = (n) => String(n).padStart(2, "0");
  const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = new Date();
  dateIn.value = toISO(today);
  dateIn.min = toISO(today);
  const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 3);
  dateIn.max = toISO(maxDate);

  // Opening hours per weekday (0 = Sunday): [open, close] in 24h
  const hours = { 0: [11, 21], 1: [11, 22], 2: [11, 22], 3: [11, 22], 4: [11, 22], 5: [11, 23], 6: [11, 23] };
  // EN: 7:00 PM · IT: 19:00
  const fmt12 = (h, m) => isIT() ? `${pad(h)}:${pad(m)}` : `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? "AM" : "PM"}`;

  function fillTimes() {
    const prev = timeSel.value || "19:00";
    const d = new Date(dateIn.value + "T00:00");
    const [open, close] = hours[isNaN(d) ? 1 : d.getDay()];
    const isToday = dateIn.value === toISO(new Date());
    const now = new Date();
    timeSel.innerHTML = "";
    for (let h = open; h < close; h++) {
      for (const m of [0, 30]) {
        if (h === close - 1 && m === 30) continue; // last seating 1h before close
        if (isToday && (h < now.getHours() + 1 || (h === now.getHours() + 1 && m < now.getMinutes()))) continue;
        const opt = new Option(fmt12(h, m), `${pad(h)}:${pad(m)}`);
        timeSel.add(opt);
      }
    }
    if (!timeSel.options.length) timeSel.add(new Option(t("res.noTimes"), ""));
    timeSel.value = [...timeSel.options].some((o) => o.value === prev) ? prev : timeSel.options[0].value;
  }
  dateIn.addEventListener("change", () => { fillTimes(); clearError(); });
  timeSel.addEventListener("change", clearError);
  fillTimes();
  // If today's last seating has passed, start from tomorrow
  if (!timeSel.value) {
    const tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
    dateIn.value = dateIn.min = toISO(tmr);
    fillTimes();
  }

  const labelGuests = () => $$("option[data-n]", guestsSel).forEach((o) => { o.textContent = t("res.many", { n: o.dataset.n }); });
  labelGuests();

  const nameIn = $("#resName");
  const phoneIn = $("#resPhone");
  const submitBtn = $("#resSubmit");
  [nameIn, phoneIn, guestsSel].forEach((el) => el.addEventListener("input", clearError));

  function clearError() {
    errorEl.textContent = "";
    $$(".field", form).forEach((f) => f.classList.remove("invalid"));
  }
  function fail(el, msg) {
    el.closest(".field").classList.add("invalid");
    errorEl.textContent = msg;
    el.focus();
  }

  // Light phone formatting for US numbers: (619) 555-0123
  phoneIn.addEventListener("input", () => {
    const v = phoneIn.value;
    if (v.trim().startsWith("+")) return; // leave international numbers alone
    const d = v.replace(/\D/g, "").slice(0, 10);
    phoneIn.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
      : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d;
  });

  const modal = $("#modal");
  let lastFocus, lastBooking;
  function openModal(b) {
    lastBooking = b;
    $("#modalHello").textContent = `Grazie, ${b.first}!`;
    $("#modalNote").innerHTML = t("modal.note", { phone: esc(b.phone) });
    $("#booking").innerHTML = [
      [t("res.date"), b.dateText], [t("res.time"), b.timeText], [t("res.guests"), b.guestText],
      [t("modal.code"), `<b class="code">${b.code}</b>`],
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    lastFocus = document.activeElement;
    modal.hidden = false;
    $("[data-close].btn", modal).focus();
  }
  function closeModal() { modal.hidden = true; lastFocus && lastFocus.focus(); }
  $$("[data-close]", modal).forEach((b) => b.addEventListener("click", closeModal));
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // Download an .ics file so the booking can be added to any calendar app
  $("#addCal").addEventListener("click", () => {
    const b = lastBooking;
    if (!b) return;
    const [hh, mm] = b.time.split(":").map(Number);
    const start = new Date(`${b.date}T${pad(hh)}:${pad(mm)}:00`);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Bella Italia//Reservation//EN", "BEGIN:VEVENT",
      `UID:${b.code}@bellaitalia.example`, `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`,
      `SUMMARY:${t("cal.summary")} (${b.guestText})`,
      "LOCATION:1234 Little Italy Way\\, San Diego\\, CA 92101",
      `DESCRIPTION:Confirmation ${b.code}`, "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const link = Object.assign(document.createElement("a"), { href: url, download: `bella-italia-${b.code}.ics` });
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(t("toast.cal"));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn.classList.contains("loading")) return;
    clearError();
    if (!dateIn.value || dateIn.value < dateIn.min || dateIn.value > dateIn.max)
      return fail(dateIn, t("res.errDate"));
    if (!timeSel.value) return fail(timeSel, t("res.errTime"));
    const name = nameIn.value.trim().replace(/\s+/g, " ");
    if (name.length < 2 || !/^[\p{L}\s.'-]+$/u.test(name)) return fail(nameIn, t("res.errName"));
    const digits = phoneIn.value.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) return fail(phoneIn, t("res.errPhone"));

    const d = new Date(dateIn.value + "T00:00");
    const booking = {
      first: name.split(" ")[0],
      phone: phoneIn.value.trim(),
      date: dateIn.value,
      time: timeSel.value,
      dateText: d.toLocaleDateString(isIT() ? "it-IT" : "en-US", { weekday: "long", month: "long", day: "numeric" }),
      timeText: timeSel.options[timeSel.selectedIndex].text,
      guestText: guestsSel.options[guestsSel.selectedIndex].text,
      code: "BI-" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    };

    // Simulated request (demo — nothing is sent anywhere)
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
      form.reset();
      dateIn.value = booking.date;
      labelGuests();
      fillTimes();
      openModal(booking);
    }, 1200);
  });

  /* ---------- Gallery lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lightboxImg");
  const lbCap = $("#lightboxCap");
  $$(".gallery__item").forEach((item) => {
    item.addEventListener("click", () => {
      lbImg.src = item.dataset.src;
      lbImg.alt = item.dataset.caption;
      lbCap.textContent = item.dataset.caption;
      lb.hidden = false;
    });
  });
  const closeLb = () => { lb.hidden = true; };
  lb.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal.hidden) closeModal();
    if (!rModal.hidden) closeReview();
    if (!lb.hidden) closeLb();
    if (nav.classList.contains("open")) setMenu(false);
  });

  /* ---------- Footer: year + open/closed status ---------- */
  $("#year").textContent = new Date().getFullYear();
  const status = $("#openStatus");
  const n = new Date();
  const [o, c] = hours[n.getDay()];
  const isOpen = n.getHours() >= o && n.getHours() < c;
  status.classList.add(isOpen ? "open" : "closed");

  // Highlight today's row in the contact hours table
  $$("#hoursTable tr").forEach((tr) => {
    if (tr.dataset.days.split(",").map(Number).includes(n.getDay())) tr.classList.add("today");
  });

  // Texts that depend on the language (hours, open status, "today" tag)
  function renderLocalized() {
    status.textContent = isOpen ? t("status.open", { t: fmt12(c, 0) }) : t("status.closed", { t: fmt12(o, 0) });
    $$("[data-open]").forEach((row) => {
      const cell = $(".hrs", row);
      if (cell) cell.textContent = `${fmt12(+row.dataset.open, 0)} – ${fmt12(+row.dataset.close, 0)}`;
    });
    $$("#hoursTable td:first-child").forEach((td) => { td.dataset.today = t("contact.today"); });
  }
  renderLocalized();

  /* ---------- Language switcher ---------- */
  $$(".lang__btn").forEach((b) => b.addEventListener("click", () => window.i18n.setLang(b.dataset.lang)));
  document.addEventListener("langchange", () => {
    renderLocalized();
    setStoryLabel();
    labelGuests();
    fillTimes();
    renderReviews();
    reviewSlider.build();
    burger.setAttribute("aria-label", t(nav.classList.contains("open") ? "aria.closeMenu" : "aria.openMenu"));
    clearError();
    rfErr.textContent = "";
  });
})();
