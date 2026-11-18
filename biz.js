/* Универсальный шаблон сайта для малого бизнеса. Всё содержимое берётся из window.BIZ (см. index.html папки).
   Строки вида ["по-русски","қазақша"] переключаются кнопкой RU/ҚАЗ. Номер WhatsApp: BIZ.wa (только цифры).
   Раскладка первого экрана: layout = "full" | "split" | "center". Тема: BIZ.theme (цвета и шрифты). */
(function () {
  var B = window.BIZ, th = B.theme || {};
  var root = document.documentElement.style;
  ["bg", "bg2", "ink", "mut", "accent", "accent2", "line", "onaccent", "card", "radius"].forEach(function (k) { if (th[k]) root.setProperty("--" + k, th[k]); });
  if (th.fh) root.setProperty("--fh", th.fh);
  if (th.fb) root.setProperty("--fb", th.fb);
  if (th.fonts) { var l = document.createElement("link"); l.rel = "stylesheet"; l.href = th.fonts; document.head.appendChild(l); }
  document.title = B.title;
  document.body.className = "L-" + (B.layout || "full") + (th.dark ? " dark" : "");

  function e(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function T(tag, cls, p, extra) { return "<" + tag + (cls ? ' class="' + cls + '"' : "") + (extra || "") + ' data-kk="' + e(p[1]) + '">' + p[0] + "</" + tag + ">"; }
  function wa(t) { return "https://wa.me/" + B.wa + (t ? "?text=" + encodeURIComponent(t) : ""); }

  var U = {
    nav: [["Услуги", "Қызметтер"], ["Галерея", "Галерея"], ["Отзывы", "Пікірлер"], ["Контакты", "Байланыс"]],
    book: ["Записаться", "Жазылу"], call: ["Позвонить", "Қоңырау шалу"], write: ["Написать в WhatsApp", "WhatsApp-қа жазу"],
    svc: ["Услуги и цены", "Қызметтер және бағалар"], gal: ["Галерея", "Галерея"], steps: ["Как это работает", "Қалай жұмыс істейді"],
    rev: ["Отзывы", "Пікірлер"], form: ["Запись онлайн", "Онлайн жазылу"], formText: ["Оставьте имя и телефон, ответим в WhatsApp в течение 10 минут.", "Аты мен телефонын қалдырыңыз, 10 минут ішінде WhatsApp-та жауап береміз."],
    send: ["Отправить в WhatsApp", "WhatsApp-қа жіберу"], ct: ["Контакты", "Байланыс"], addr: ["Адрес", "Мекенжай"], hrs: ["Часы", "Уақыты"], tel: ["Телефон", "Телефон"],
    demo: ["Демо-сайт, сделано для примера", "Демо-сайт, мысал ретінде жасалған"]
  };

  var h = "";
  /* шапка */
  h += '<header id="hd"><div class="wrap"><a class="logo" href="#top">' + e(B.name) + "</a><nav>";
  U.nav.forEach(function (n, i) { h += '<a class="lk" href="#' + ["svc", "gal", "rev", "ct"][i] + '" data-kk="' + n[1] + '">' + n[0] + "</a>"; });
  h += '<span class="lang"><button data-l="ru" class="on">RU</button><button data-l="kk">ҚАЗ</button></span>' + T("a", "btn sm", U.book, ' href="#book"') + "</nav></div></header>";

  /* первый экран */
  var hero = B.hero;
  h += '<main id="top"><div class="hero"><img class="bg" src="img/hero.jpg" alt="' + e(B.name) + '" fetchpriority="high"><div class="wrap"><div class="in">';
  h += T("div", "kick", hero.kick) + T("h1", "", hero.title) + T("p", "lead", hero.sub);
  h += '<div class="btns">' + T("a", "btn f", hero.cta || U.book, ' href="#book"') + T("a", "btn o", U.call, ' href="tel:' + e(B.phoneRaw) + '"') + "</div>";
  h += '<div class="facts">' + hero.facts.map(function (f) { return "<div>" + T("b", "", f[0]) + T("span", "", f[1]) + "</div>"; }).join("") + "</div>";
  h += "</div></div></div>";

  /* услуги */
  h += '<section id="svc"><div class="wrap rv">' + T("div", "eyebrow", U.svc) + T("h2", "", B.svcTitle) + '<div class="cards">';
  B.services.forEach(function (s) {
    h += '<div class="card">' + T("h3", "", s.name) + (s.desc ? T("p", "", s.desc) : "") + '<div class="pr">' + e(s.price) + "</div></div>";
  });
  h += "</div></div></section>";

  /* как это работает */
  if (B.steps) {
    h += '<section class="alt"><div class="wrap rv">' + T("div", "eyebrow", U.steps) + '<div class="steps">';
    B.steps.forEach(function (s, i) { h += '<div class="step"><i>' + (i + 1) + "</i>" + T("h3", "", s[0]) + T("p", "", s[1]) + "</div>"; });
    h += "</div></div></section>";
  }

  /* галерея */
  h += '<section id="gal"><div class="wrap rv">' + T("div", "eyebrow", U.gal) + '<div class="snap gal">';
  ["g1", "g2", "g3"].forEach(function (g, i) { h += "<figure><img src=\"img/" + g + '.jpg" alt="' + e(B.name) + " " + (i + 1) + '" loading="lazy"></figure>'; });
  h += '</div></div></section>';

  /* отзывы */
  h += '<section id="rev" class="alt"><div class="wrap rv">' + T("div", "eyebrow", U.rev) + '<div class="snap revs">';
  B.reviews.forEach(function (r) { h += "<blockquote>" + T("p", "", r.text) + "<cite>" + e(r.name) + "</cite></blockquote>"; });
  h += "</div></div></section>";

  /* запись */
  h += '<section id="book"><div class="wrap rv"><div class="bk"><div>' + T("div", "eyebrow", U.form) + T("h2", "", B.bookTitle) + T("p", "muted", U.formText) + "</div>";
  h += '<form id="bf" novalidate><div class="f2"><input name="n" required autocomplete="name" placeholder="Имя" data-ph-kk="Аты"><input name="p" required type="tel" inputmode="tel" autocomplete="tel" placeholder="Телефон" data-ph-kk="Телефон"></div>';
  h += '<div class="f2"><select name="s" aria-label="Услуга">' + B.services.map(function (s) { return "<option>" + e(s.name[0]) + "</option>"; }).join("") + '</select>';
  h += '<input name="w" placeholder="Когда удобно: завтра в 18:00" data-ph-kk="Қашан ыңғайлы: ертең 18:00"></div>';
  h += T("button", "btn f", U.send, ' type="submit"') + "</form></div></div></section>";

  /* контакты */
  var c = B.contacts;
  h += '<section id="ct" class="alt"><div class="wrap rv">' + T("div", "eyebrow", U.ct) + '<div class="ctg"><div><dl>';
  h += "<div>" + T("dt", "", U.addr) + T("dd", "", c.address) + "</div><div>" + T("dt", "", U.hrs) + T("dd", "", c.hours) + "</div>";
  h += "<div>" + T("dt", "", U.tel) + '<dd><a href="tel:' + e(B.phoneRaw) + '">' + e(B.phone) + "</a></dd></div>";
  if (c.insta) h += '<div><dt>Instagram</dt><dd><a href="https://instagram.com/' + e(c.insta) + '" target="_blank" rel="noopener">@' + e(c.insta) + "</a></dd></div>";
  h += '</dl><div class="btns" style="margin-top:22px">' + T("a", "btn f", U.write, ' href="' + wa() + '" target="_blank" rel="noopener"') + "</div></div>";
  h += '<div class="map"><iframe title="Карта" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=71.40%2C51.12%2C71.46%2C51.15&layer=mapnik"></iframe></div></div></div></section></main>';
  h += '<footer><div class="wrap">© 2026 ' + e(B.name) + " · " + T("span", "", U.demo) + "</div></footer>";
  h += '<div class="bar">' + T("a", "", U.book, ' href="#book"') + '<a href="' + wa() + '" target="_blank" rel="noopener">WhatsApp</a>' + T("a", "", ["Звонок", "Қоңырау"], ' href="tel:' + e(B.phoneRaw) + '"') + "</div>";

  document.getElementById("app").innerHTML = h;
  window.WA_PHONE = B.wa;
  var s = document.createElement("script"); s.src = "../barber-common.js"; document.body.appendChild(s);
})();
