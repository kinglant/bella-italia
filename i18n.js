/* ===================== Bella Italia — translations (EN / IT) =====================
   HTML hooks:
     data-i18n="key"          → element.innerHTML
     data-i18n-ph="key"       → placeholder
     data-i18n-aria="key"     → aria-label
     data-i18n-cap="key"      → gallery caption (data-caption + img alt)
   JS: i18n.t("key", { name: "Maria" })  → replaces {name}
================================================================================= */
window.I18N = {
  en: {
    "meta.title": "Bella Italia — Italian Bistro",
    "meta.desc": "Bella Italia — authentic Italian recipes crafted with the freshest ingredients and true Italian hospitality.",
    "logo.sub": "Italian Bistro",
    "nav.home": "Home", "nav.about": "About", "nav.menu": "Menu", "nav.res": "Reservations",
    "nav.gallery": "Gallery", "nav.contact": "Contact", "nav.reviews": "Reviews", "nav.aboutUs": "About Us",
    "cta.reserve": "Reserve a Table",
    "aria.openMenu": "Open menu", "aria.closeMenu": "Close menu",

    "hero.title": 'Authentic Italian<br /><span class="green">Made with <em>Love</em></span>',
    "hero.lead": "Enjoy timeless Italian recipes crafted with the freshest ingredients and a passion for true Italian hospitality.",
    "hero.explore": "Explore Menu", "hero.story": "Our Story",
    "badge.ring": "TRADITIONAL RECIPES • MADE IN ITALY • ", "badge.since": "SINCE",

    "feat1.h": "Fresh Ingredients", "feat1.p": "We use locally sourced ingredients for the best flavor.",
    "feat2.h": "Expert Chefs", "feat2.p": "Our chefs bring years of experience and Italian tradition.",
    "feat3.h": "Fine Wines", "feat3.p": "Handpicked Italian wines that perfectly pair with every dish.",
    "feat4.h": "Made with Love", "feat4.p": "Every dish is prepared with care, passion, and authenticity.",

    "story.kicker": "Our Story",
    "story.h2": 'A Taste of Italy<br />in <em class="green">Every Bite</em>',
    "story.p": "Bella Italia was born from a love for authentic Italian cuisine and warm hospitality. We bring the spirit of Italy to your table, creating memorable moments with family and friends.",
    "story.more": "Our recipes come from three generations of family kitchens in Tuscany. Every morning we roll fresh pasta by hand, bake our bread in a wood-fired oven, and choose produce from local farmers — just like nonna used to do.",
    "story.readMore": "Read more", "story.less": "Show less",

    "specials.kicker": "Chef's Specials", "specials.h2": "Handcrafted Italian Favorites",
    "dish1.n": "Classic Lasagna", "dish1.d": "Layers of pasta, rich meat sauce, béchamel, and parmesan.",
    "dish2.n": "Truffle Mushroom Risotto", "dish2.d": "Creamy arborio rice with wild mushrooms and truffle oil.",
    "dish3.n": "Lemon Garlic Salmon", "dish3.d": "Grilled salmon with lemon, garlic, and fresh herbs.",
    "dish4.n": "Tiramisu", "dish4.d": "Classic Italian dessert with mascarpone and espresso.",
    "dish5.n": "Tagliatelle Pomodoro", "dish5.d": "Hand-rolled tagliatelle, San Marzano tomato, basil and parmesan.",

    "menu.h2": "From Our Kitchen to Your Table",
    "menu.sub": "Fresh pasta rolled by hand every morning, pizza from our wood-fired oven, and wines from the best Italian vineyards.",
    "legend.v": "Vegetarian", "legend.gf": "Gluten-free", "legend.hot": "Spicy", "legend.chef": "Chef's pick",

    "reviews.h2": "What Our Guests Say", "reviews.based": "Based on 1,280+ reviews",
    "reviews.write": "Write a Review", "r.ordered": "Ordered:", "r.justNow": "Just now", "r.guest": "Guest",
    "rf.title": "Share Your Experience", "rf.name": "Your name", "rf.namePh": "e.g. Maria R.",
    "rf.text": "Your review", "rf.textPh": "What did you enjoy most?", "rf.post": "Post Review",
    "rf.errStars": "Please choose a star rating.", "rf.errName": "Please enter your name.",
    "rf.errText": "Tell us a bit more (at least 10 characters).",
    "toast.review": "Grazie! Your review has been posted.",

    "res.h2": "Reserve Your Table", "res.sub": "We can't wait to welcome you to Bella Italia.",
    "res.date": "Date", "res.time": "Time", "res.guests": "Guests", "res.name": "Your Name", "res.phone": "Phone",
    "res.submit": "Reserve Now", "res.one": "1 Person", "res.many": "{n} People", "res.noTimes": "No times left today",
    "res.errDate": "Please choose a date between today and the next 3 months.",
    "res.errTime": "No tables left on this day — please pick another date.",
    "res.errName": "Please enter your name.", "res.errPhone": "Please enter a valid phone number.",

    "modal.title": "Your table is reserved", "modal.code": "Confirmation",
    "modal.note": "A confirmation SMS will be sent to <b>{phone}</b>.",
    "modal.cal": "Add to Calendar", "modal.ok": "Perfetto",
    "cal.summary": "Dinner at Bella Italia", "toast.cal": "Calendar file downloaded",

    "gallery.h2": "Moments at Bella Italia",
    "cap.rome": "Via del Corso, Rome", "cap.interior": "Our little ristorante",
    "cap.chef": "Pasta rolled by hand every morning", "cap.oven": "Straight from the wood-fired oven",
    "cap.wine": "Long dinners with friends", "cap.road": "Cypress roads of Tuscany",
    "cap.amalfi": "The Amalfi coast", "cap.vineyard": "Where our Chianti comes from", "cap.florence": "Florence at golden hour",

    "contact.h2": "Find Us in Little Italy", "contact.address": "Address", "contact.phone": "Phone",
    "contact.email": "Email", "contact.hours": "Opening Hours",
    "contact.dir": "Get Directions", "contact.call": "Call Us", "contact.today": " · today",
    "days.mt": "Mon – Thu", "days.fs": "Fri – Sat", "days.sun": "Sunday",

    "footer.links": "Quick Links", "footer.hours": "Hours", "footer.location": "Location", "footer.follow": "Follow Us",
    "footer.fiction": "Bella Italia — a fictional restaurant.", "footer.concept": "Concept project",
    "footer.by": "Designed &amp; developed by",
    "status.open": "Open now · until {t}", "status.closed": "Closed now · opens {t}",
  },

  it: {
    "meta.title": "Bella Italia — Bistrot Italiano",
    "meta.desc": "Bella Italia — autentiche ricette italiane preparate con ingredienti freschissimi e vera ospitalità italiana.",
    "logo.sub": "Bistrot Italiano",
    "nav.home": "Home", "nav.about": "Chi Siamo", "nav.menu": "Menu", "nav.res": "Prenotazioni",
    "nav.gallery": "Galleria", "nav.contact": "Contatti", "nav.reviews": "Recensioni", "nav.aboutUs": "Chi Siamo",
    "cta.reserve": "Prenota un Tavolo",
    "aria.openMenu": "Apri menu", "aria.closeMenu": "Chiudi menu",

    "hero.title": 'Autentica Cucina<br /><span class="green">Fatta con <em>Amore</em></span>',
    "hero.lead": "Ricette italiane senza tempo, preparate con gli ingredienti più freschi e la passione per la vera ospitalità italiana.",
    "hero.explore": "Scopri il Menu", "hero.story": "La Nostra Storia",
    "badge.ring": "RICETTE TIPICHE • FATTO IN ITALIA • ", "badge.since": "DAL",

    "feat1.h": "Ingredienti Freschi", "feat1.p": "Usiamo ingredienti locali per il miglior sapore.",
    "feat2.h": "Chef Esperti", "feat2.p": "I nostri chef portano anni di esperienza e tradizione italiana.",
    "feat3.h": "Vini Pregiati", "feat3.p": "Vini italiani selezionati, perfetti con ogni piatto.",
    "feat4.h": "Fatto con Amore", "feat4.p": "Ogni piatto è preparato con cura, passione e autenticità.",

    "story.kicker": "La Nostra Storia",
    "story.h2": 'Il Sapore dell\'Italia<br />in <em class="green">Ogni Boccone</em>',
    "story.p": "Bella Italia nasce dall'amore per l'autentica cucina italiana e per l'ospitalità calorosa. Portiamo lo spirito dell'Italia sulla vostra tavola, creando momenti indimenticabili con famiglia e amici.",
    "story.more": "Le nostre ricette provengono da tre generazioni di cucine di famiglia in Toscana. Ogni mattina tiriamo la pasta fresca a mano, cuociamo il pane nel forno a legna e scegliamo i prodotti dai contadini locali — proprio come faceva la nonna.",
    "story.readMore": "Leggi di più", "story.less": "Mostra meno",

    "specials.kicker": "Specialità dello Chef", "specials.h2": "I Grandi Classici Fatti a Mano",
    "dish1.n": "Lasagna Classica", "dish1.d": "Strati di pasta, ricco ragù di carne, besciamella e parmigiano.",
    "dish2.n": "Risotto Funghi e Tartufo", "dish2.d": "Cremoso riso arborio con funghi selvatici e olio al tartufo.",
    "dish3.n": "Salmone Limone e Aglio", "dish3.d": "Salmone alla griglia con limone, aglio ed erbe fresche.",
    "dish4.n": "Tiramisù", "dish4.d": "Il classico dolce italiano con mascarpone ed espresso.",
    "dish5.n": "Tagliatelle al Pomodoro", "dish5.d": "Tagliatelle tirate a mano, pomodoro San Marzano, basilico e parmigiano.",

    "menu.h2": "Dalla Nostra Cucina alla Vostra Tavola",
    "menu.sub": "Pasta fresca tirata a mano ogni mattina, pizza dal forno a legna e vini dalle migliori cantine italiane.",
    "legend.v": "Vegetariano", "legend.gf": "Senza glutine", "legend.hot": "Piccante", "legend.chef": "Scelta dello chef",

    "reviews.h2": "Cosa Dicono i Nostri Ospiti", "reviews.based": "Su oltre 1.280 recensioni",
    "reviews.write": "Scrivi una Recensione", "r.ordered": "Ha ordinato:", "r.justNow": "Adesso", "r.guest": "Ospite",
    "rf.title": "Racconta la Tua Esperienza", "rf.name": "Il tuo nome", "rf.namePh": "es. Maria R.",
    "rf.text": "La tua recensione", "rf.textPh": "Cosa ti è piaciuto di più?", "rf.post": "Pubblica",
    "rf.errStars": "Scegli una valutazione.", "rf.errName": "Inserisci il tuo nome.",
    "rf.errText": "Raccontaci qualcosa in più (almeno 10 caratteri).",
    "toast.review": "Grazie! La tua recensione è stata pubblicata.",

    "res.h2": "Prenota il Tuo Tavolo", "res.sub": "Non vediamo l'ora di accogliervi da Bella Italia.",
    "res.date": "Data", "res.time": "Ora", "res.guests": "Ospiti", "res.name": "Nome", "res.phone": "Telefono",
    "res.submit": "Prenota Ora", "res.one": "1 Persona", "res.many": "{n} Persone", "res.noTimes": "Nessun orario disponibile",
    "res.errDate": "Scegli una data entro i prossimi 3 mesi.",
    "res.errTime": "Nessun tavolo disponibile in questo giorno — scegli un'altra data.",
    "res.errName": "Inserisci il tuo nome.", "res.errPhone": "Inserisci un numero di telefono valido.",

    "modal.title": "Il tuo tavolo è prenotato", "modal.code": "Codice",
    "modal.note": "Riceverai un SMS di conferma al numero <b>{phone}</b>.",
    "modal.cal": "Aggiungi al Calendario", "modal.ok": "Perfetto",
    "cal.summary": "Cena da Bella Italia", "toast.cal": "File del calendario scaricato",

    "gallery.h2": "Momenti da Bella Italia",
    "cap.rome": "Via del Corso, Roma", "cap.interior": "Il nostro piccolo ristorante",
    "cap.chef": "Pasta tirata a mano ogni mattina", "cap.oven": "Appena sfornata dal forno a legna",
    "cap.wine": "Lunghe cene tra amici", "cap.road": "I viali di cipressi della Toscana",
    "cap.amalfi": "La Costiera Amalfitana", "cap.vineyard": "Dove nasce il nostro Chianti", "cap.florence": "Firenze all'ora d'oro",

    "contact.h2": "Ci Trovi a Little Italy", "contact.address": "Indirizzo", "contact.phone": "Telefono",
    "contact.email": "Email", "contact.hours": "Orari di Apertura",
    "contact.dir": "Indicazioni", "contact.call": "Chiamaci", "contact.today": " · oggi",
    "days.mt": "Lun – Gio", "days.fs": "Ven – Sab", "days.sun": "Domenica",

    "footer.links": "Link Rapidi", "footer.hours": "Orari", "footer.location": "Dove Siamo", "footer.follow": "Seguici",
    "footer.fiction": "Bella Italia — un ristorante immaginario.", "footer.concept": "Progetto concept",
    "footer.by": "Progettato e sviluppato da",
    "status.open": "Aperto ora · fino alle {t}", "status.closed": "Chiuso ora · apre alle {t}",
  },
};

(() => {
  const SUPPORTED = ["en", "it"];
  let saved = null;
  try { saved = localStorage.getItem("bella-lang"); } catch (_) {}
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  let lang = SUPPORTED.includes(saved) ? saved : SUPPORTED.includes(browser) ? browser : "en";

  const t = (key, vars) => {
    let s = (window.I18N[lang] && window.I18N[lang][key]) ?? window.I18N.en[key] ?? key;
    if (vars) for (const k in vars) s = s.split(`{${k}}`).join(vars[k]);
    return s;
  };

  function applyStatic(root = document) {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t("meta.desc");
    root.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    root.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    root.querySelectorAll("[data-i18n-cap]").forEach((el) => {
      const cap = t(el.dataset.i18nCap);
      el.dataset.caption = cap;
      const img = el.querySelector("img");
      if (img) img.alt = cap;
    });
    document.querySelectorAll(".lang__btn").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on);
    });
  }

  function setLang(next) {
    if (!SUPPORTED.includes(next) || next === lang) return;
    lang = next;
    try { localStorage.setItem("bella-lang", lang); } catch (_) {}
    applyStatic();
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }

  window.i18n = { t, setLang, applyStatic, get lang() { return lang; } };
})();
