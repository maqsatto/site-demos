/* Универсальный конструктор сайта для малого бизнеса. Всё содержимое берётся из window.BIZ (см. index.html папки).
   Строки вида ["по-русски","қазақша"] переключаются кнопкой RU/ҚАЗ. Номер WhatsApp: BIZ.wa (только цифры).
   Раскладка первого экрана: layout = "full" | "split" | "center". Тема: BIZ.theme (цвета и шрифты).
   Порядок и состав блоков: BIZ.sections = ["stats","svc","tabs","pricing","schedule","team","steps","faq","gal","rev","book","ct"]. */
(function () {
  var B = window.BIZ, th = B.theme || {};
  var root = document.documentElement.style;
  ["bg", "bg2", "ink", "mut", "accent", "accent2", "line", "onaccent", "card", "radius"].forEach(function (k) { if (th[k]) root.setProperty("--" + k, th[k]); });
  if (th.fh) root.setProperty("--fh", th.fh);
  if (th.fb) root.setProperty("--fb", th.fb);
  if (th.fonts) { var l = document.createElement("link"); l.rel = "stylesheet"; l.href = th.fonts; document.head.appendChild(l); }
  document.title = B.title;
  document.body.className = "L-" + (B.layout || "full") + (th.dark ? " dark" : "") + " C-" + (th.cards || "outline") + " H-" + (th.head || "plain");

  function e(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function T(tag, cls, p, extra) { return "<" + tag + (cls ? ' class="' + cls + '"' : "") + (extra || "") + ' data-kk="' + e(p[1]) + '">' + p[0] + "</" + tag + ">"; }
  function wa(t) { return "https://wa.me/" + B.wa + (t ? "?text=" + encodeURIComponent(t) : ""); }

  var U = {
    nav: [["Услуги", "Қызметтер"], ["Галерея", "Галерея"], ["Отзывы", "Пікірлер"], ["Контакты", "Байланыс"]],
    book: ["Записаться", "Жазылу"], call: ["Позвонить", "Қоңырау шалу"], write: ["Написать в WhatsApp", "WhatsApp-қа жазу"],
    svc: ["Услуги и цены", "Қызметтер және бағалар"], gal: ["Галерея", "Галерея"], steps: ["Как это работает", "Қалай жұмыс істейді"],
    rev: ["Отзывы", "Пікірлер"], form: ["Запись онлайн", "Онлайн жазылу"], formText: ["Оставьте имя и телефон, ответим в WhatsApp в течение 10 минут.", "Аты мен телефонын қалдырыңыз, 10 минут ішінде WhatsApp-та жауап береміз."],
    send: ["Отправить в WhatsApp", "WhatsApp-қа жіберу"], ct: ["Контакты", "Байланыс"], addr: ["Адрес", "Мекенжай"], hrs: ["Часы", "Уақыты"], tel: ["Телефон", "Телефон"],
    team: ["Команда", "Команда"], faq: ["Частые вопросы", "Жиі қойылатын сұрақтар"], sched: ["Расписание занятий", "Сабақ кестесі"], pack: ["Тарифы и цены", "Тарифтер және бағалар"],
    demo: ["Демо-сайт, сделано для примера", "Демо-сайт, мысал ретінде жасалған"]
  };

  var all = [];
  var S = {};

  S.stats = function () {
    return '<section class="strip"><div class="wrap"><div class="stats">' + B.stats.map(function (s) { return "<div>" + T("b", "", s[0]) + T("span", "", s[1]) + "</div>"; }).join("") + "</div></div></section>";
  };
  S.svc = function () {
    var h = '<section id="svc"><div class="wrap rv">' + T("div", "eyebrow", U.svc) + T("h2", "", B.svcTitle) + '<div class="cards">';
    B.services.forEach(function (s) { h += '<div class="card">' + T("h3", "", s.name) + (s.desc ? T("p", "", s.desc) : "") + '<div class="pr">' + e(s.price) + "</div></div>"; });
    return h + "</div></div></section>";
  };
  S.tabs = function () {
    var h = '<section id="svc"><div class="wrap rv">' + T("div", "eyebrow", U.svc) + T("h2", "", B.svcTitle) + '<div class="tabs" role="tablist">';
    B.tabs.forEach(function (t, i) { h += '<button type="button" class="tab' + (i ? "" : " on") + '" data-tab="' + i + '" data-kk="' + e(t.name[1]) + '">' + t.name[0] + "</button>"; });
    h += '</div><div class="panels">';
    B.tabs.forEach(function (t, i) {
      h += '<div class="panel' + (i ? "" : " on") + '" data-panel="' + i + '">';
      t.items.forEach(function (s) { h += '<div class="li"><div class="top">' + T("span", "nm", s.name) + '<span class="dots"></span><b>' + e(s.price) + "</b></div>" + (s.desc ? T("p", "", s.desc) : "") + "</div>"; });
      h += "</div>";
    });
    return h + "</div></div></section>";
  };
  S.pricing = function () {
    var h = '<section id="svc"><div class="wrap rv">' + T("div", "eyebrow", U.pack) + T("h2", "", B.svcTitle) + '<div class="packs">';
    B.packages.forEach(function (p) {
      h += '<div class="pack' + (p.hot ? " hot" : "") + '">' + (p.badge ? T("span", "badge", p.badge) : "") + T("h3", "", p.name) + '<div class="pp">' + e(p.price) + "</div>" + (p.note ? T("p", "muted", p.note) : "") + "<ul>" + p.items.map(function (i) { return "<li" + ' data-kk="' + e(i[1]) + '">' + i[0] + "</li>"; }).join("") + "</ul>" + T("a", "btn" + (p.hot ? " f" : ""), U.book, ' href="#book"') + "</div>";
    });
    return h + "</div></div></section>";
  };
  S.schedule = function () {
    var sc = B.schedule, h = '<section id="sched" class="alt"><div class="wrap rv">' + T("div", "eyebrow", U.sched) + T("h2", "", B.schedTitle || ["Занимайтесь в удобное время", "Ыңғайлы уақытта жаттығыңыз"]) + '<div class="tw"><table><thead><tr><th></th>';
    sc.days.forEach(function (d) { h += T("th", "", d); });
    h += "</tr></thead><tbody>";
    sc.rows.forEach(function (r) { h += "<tr><th>" + e(r[0]) + "</th>" + r[1].map(function (c) { return "<td>" + (c ? '<span class="cl">' + e(c) + "</span>" : "") + "</td>"; }).join("") + "</tr>"; });
    return h + "</tbody></table></div></div></section>";
  };
  S.team = function () {
    var h = '<section id="team"><div class="wrap rv">' + T("div", "eyebrow", B.teamLabel || U.team) + T("h2", "", B.teamTitle) + '<div class="team">';
    B.team.forEach(function (m) { h += '<div class="mem"><div class="av">' + e(m.name.charAt(0)) + "</div><h3>" + e(m.name) + "</h3>" + T("p", "", m.role) + (m.exp ? T("small", "", m.exp) : "") + "</div>"; });
    return h + "</div></div></section>";
  };
  S.steps = function () {
    var h = '<section class="alt"><div class="wrap rv">' + T("div", "eyebrow", U.steps) + '<div class="steps">';
    B.steps.forEach(function (s, i) { h += '<div class="step"><i>' + (i + 1) + "</i>" + T("h3", "", s[0]) + T("p", "", s[1]) + "</div>"; });
    return h + "</div></div></section>";
  };
  S.faq = function () {
    var h = '<section id="faq"><div class="wrap rv">' + T("div", "eyebrow", U.faq) + '<div class="faq">';
    B.faq.forEach(function (q) { h += "<details><summary" + ' data-kk="' + e(q[0][1]) + '">' + q[0][0] + "</summary>" + T("p", "", q[1]) + "</details>"; });
    return h + "</div></div></section>";
  };
  S.gal = function () {
    var h = '<section id="gal"><div class="wrap rv">' + T("div", "eyebrow", U.gal) + '<div class="' + (B.galStyle === "mosaic" ? "mos" : "snap gal") + '">';
    ["g1", "g2", "g3"].forEach(function (g, i) { h += '<figure class="' + g + '"><img src="img/' + g + '.jpg" alt="' + e(B.name) + " " + (i + 1) + '" loading="lazy"></figure>'; });
    return h + "</div></div></section>";
  };
  S.rev = function () {
    var h = '<section id="rev" class="alt"><div class="wrap rv">' + T("div", "eyebrow", U.rev) + '<div class="snap revs">';
    B.reviews.forEach(function (r) { h += "<blockquote>" + T("p", "", r.text) + "<cite>" + e(r.name) + "</cite></blockquote>"; });
    return h + "</div></div></section>";
  };
  S.book = function () {
    var h = '<section id="book"><div class="wrap rv"><div class="bk"><div>' + T("div", "eyebrow", U.form) + T("h2", "", B.bookTitle) + T("p", "muted", U.formText) + "</div>";
    h += '<form id="bf" novalidate><div class="f2"><input name="n" required autocomplete="name" placeholder="Имя" data-ph-kk="Аты"><input name="p" required type="tel" inputmode="tel" autocomplete="tel" placeholder="Телефон" data-ph-kk="Телефон"></div>';
    var opts = B.services || [].concat.apply([], (B.tabs || []).map(function (t) { return t.items; })).concat(B.packages || []);
    h += '<div class="f2"><select name="s" aria-label="Услуга">' + opts.map(function (s) { return "<option>" + e(s.name[0]) + "</option>"; }).join("") + '</select>';
    h += '<input name="w" placeholder="Когда удобно: завтра в 18:00" data-ph-kk="Қашан ыңғайлы: ертең 18:00"></div>';
    return h + T("button", "btn f", U.send, ' type="submit"') + "</form></div></div></section>";
  };
  S.ct = function () {
    var c = B.contacts, h = '<section id="ct" class="alt"><div class="wrap rv">' + T("div", "eyebrow", U.ct) + '<div class="ctg"><div><dl>';
    h += "<div>" + T("dt", "", U.addr) + T("dd", "", c.address) + "</div><div>" + T("dt", "", U.hrs) + T("dd", "", c.hours) + "</div>";
    h += "<div>" + T("dt", "", U.tel) + '<dd><a href="tel:' + e(B.phoneRaw) + '">' + e(B.phone) + "</a></dd></div>";
    if (c.insta) h += '<div><dt>Instagram</dt><dd><a href="https://instagram.com/' + e(c.insta) + '" target="_blank" rel="noopener">@' + e(c.insta) + "</a></dd></div>";
    h += '</dl><div class="btns" style="margin-top:22px">' + T("a", "btn f", U.write, ' href="' + wa() + '" target="_blank" rel="noopener"') + "</div></div>";
    return h + '<div class="map"><iframe title="Карта" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=71.40%2C51.12%2C71.46%2C51.15&layer=mapnik"></iframe></div></div></div></section>';
  };

  var h = '<header id="hd"><div class="wrap"><a class="logo" href="#top">' + e(B.name) + "</a><nav>";
  U.nav.forEach(function (n, i) { h += '<a class="lk" href="#' + ["svc", "gal", "rev", "ct"][i] + '" data-kk="' + n[1] + '">' + n[0] + "</a>"; });
  h += '<span class="lang"><button data-l="ru" class="on">RU</button><button data-l="kk">ҚАЗ</button></span>' + T("a", "btn sm", U.book, ' href="#book"') + "</nav></div></header>";

  var hero = B.hero;
  h += '<main id="top"><div class="hero"><img class="bg" src="img/hero.jpg" alt="' + e(B.name) + '" fetchpriority="high"><div class="wrap"><div class="in">';
  h += T("div", "kick", hero.kick) + T("h1", "", hero.title) + T("p", "lead", hero.sub);
  h += '<div class="btns">' + T("a", "btn f", hero.cta || U.book, ' href="#book"') + T("a", "btn o", U.call, ' href="tel:' + e(B.phoneRaw) + '"') + "</div>";
  h += '<div class="facts">' + hero.facts.map(function (f) { return "<div>" + T("b", "", f[0]) + T("span", "", f[1]) + "</div>"; }).join("") + "</div>";
  h += "</div></div></div>";

  (B.sections || ["svc", "steps", "gal", "rev", "book", "ct"]).forEach(function (k) { if (S[k]) h += S[k](); });
  h += "</main>";
  h += '<footer><div class="wrap">© 2026 ' + e(B.name) + " · " + T("span", "", U.demo) + "</div></footer>";
  h += '<div class="bar">' + T("a", "", U.book, ' href="#book"') + '<a href="' + wa() + '" target="_blank" rel="noopener">WhatsApp</a>' + T("a", "", ["Звонок", "Қоңырау"], ' href="tel:' + e(B.phoneRaw) + '"') + "</div>";

  document.getElementById("app").innerHTML = h;
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest && ev.target.closest("[data-tab]"); if (!t) return;
    var i = t.getAttribute("data-tab");
    [].forEach.call(document.querySelectorAll(".tab"), function (x) { x.classList.toggle("on", x === t); });
    [].forEach.call(document.querySelectorAll(".panel"), function (x) { x.classList.toggle("on", x.getAttribute("data-panel") === i); });
  });
  window.WA_PHONE = B.wa;
  var s = document.createElement("script"); s.src = "../barber-common.js"; document.body.appendChild(s);
})();
