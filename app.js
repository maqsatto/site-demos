/* Шаблон лендинга. Всё содержимое берётся из window.SITE (см. index.html в папке демо).
   Чтобы сделать сайт клиенту: скопируй папку демо, поменяй SITE, положи фото, залей на хостинг.
   Необязательные блоки (since, gallery, masters, reviews, mapEmbed, bookUrl, instagram) не показываются, если их нет в SITE. */
(function () {
  var S = window.SITE;
  var UI = {
    ru: { services: "Услуги", gallery: "Работы", masters: "Мастера", reviews: "Отзывы", contacts: "Контакты",
          book: "Записаться", write: "Написать в WhatsApp", call: "Позвонить", addr: "Адрес", hours: "Часы", phone: "Телефон",
          from: "от", demo: "Демо-сайт, сделано для примера", formTitle: "Запись", formText: "Оставьте имя и телефон, ответим в WhatsApp в течение 10 минут.",
          name: "Имя", tel: "Телефон", when: "Когда удобно", whenPh: "завтра в 18:00", send: "Отправить в WhatsApp", any: "Любой мастер",
          photo: "Фото", bookExt: "Выбрать время онлайн", orForm: "Или оставьте заявку:" },
    kk: { services: "Қызметтер", gallery: "Жұмыстар", masters: "Шеберлер", reviews: "Пікірлер", contacts: "Байланыс",
          book: "Жазылу", write: "WhatsApp-қа жазу", call: "Қоңырау шалу", addr: "Мекенжай", hours: "Уақыты", phone: "Телефон",
          from: "бастап", demo: "Демо-сайт, мысал ретінде жасалған", formTitle: "Жазылу", formText: "Атыңыз бен телефоныңызды қалдырыңыз, 10 минут ішінде WhatsApp-та жауап береміз.",
          name: "Аты", tel: "Телефон", when: "Қашан ыңғайлы", whenPh: "ертең 18:00", send: "WhatsApp-қа жіберу", any: "Кез келген шебер",
          photo: "Сурет", bookExt: "Уақытты онлайн таңдау", orForm: "Немесе өтінім қалдырыңыз:" }
  };
  var lang = "ru";
  try { lang = localStorage.getItem("lang") || ((navigator.language || "").slice(0, 2) === "kk" ? "kk" : "ru"); } catch (e) {}
  if (S.defaultLang) lang = S.defaultLang;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function wa(text) { return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(text || ""); }
  function bookHref() { return S.bookUrl || "#book"; }
  function ext() { return S.bookUrl ? ' target="_blank" rel="noopener"' : ""; }
  function num(i) { return (i < 9 ? "0" : "") + (i + 1); }
  function head(n, title) { return '<div class="sh"><i>' + n + "</i><h2>" + title + "</h2></div>"; }

  function render() {
    var t = UI[lang];
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty("--accent", S.accent || "#c8372d");
    document.title = S.name + " — " + S.tagline[lang];
    var h = "", sec = 0;

    h += '<header><div class="wrap"><div class="logo">' + esc(S.logoA) + "<b>" + esc(S.logoB) + "</b></div><nav>" +
      '<a class="hide" href="#services">' + t.services + "</a>" +
      (S.gallery ? '<a class="hide" href="#gallery">' + t.gallery + "</a>" : "") +
      (S.masters ? '<a class="hide" href="#masters">' + t.masters + "</a>" : "") +
      '<a class="hide" href="#contacts">' + t.contacts + "</a>" +
      '<div class="lang"><button data-l="ru" class="' + (lang === "ru" ? "on" : "") + '">RU</button><button data-l="kk" class="' + (lang === "kk" ? "on" : "") + '">ҚАЗ</button></div>' +
      '<a class="btn p sm" href="' + bookHref() + '"' + ext() + ">" + t.book + "</a></nav></div></header>";

    var hl = S.headline[lang], parts = hl.split("|");
    h += '<div class="hero"><div class="wrap"><div class="meta"><span>' + esc(S.tagline[lang]) + "</span><span>" + (S.since ? esc(S.since[lang]) : "") + "</span></div>" +
      "<h1>" + esc(parts[0]) + (parts[1] ? " <span>" + esc(parts[1]) + "</span>" : "") + "</h1>" +
      '<div class="hrow"><p>' + esc(S.sub[lang]) + '</p><div class="btns"><a class="btn a" href="' + bookHref() + '"' + ext() + ">" + t.book + "</a>" +
      '<a class="btn" href="tel:' + esc(S.phoneRaw) + '">' + t.call + "</a></div></div></div></div>";
    h += '<div class="stripe"></div>';
    var tick = S.services.map(function (s) { return esc(s.name[lang]); }).join(" &nbsp;/&nbsp; ");
    h += '<div class="ticker" aria-hidden="true"><div class="track">' + tick + " &nbsp;/&nbsp; " + tick + " &nbsp;/&nbsp; " + tick + " &nbsp;/&nbsp; " + tick + " &nbsp;/&nbsp; </div></div>";

    h += '<section id="services"><div class="wrap">' + head(num(sec++), t.services) + '<div class="menu">';
    S.services.forEach(function (s) {
      h += '<div class="item"><div class="top"><span class="nm">' + esc(s.name[lang]) + '</span><span class="dots"></span><span class="pr">' + (s.priceFrom ? t.from + " " : "") + esc(s.price) + "</span></div>" +
        (s.desc ? "<p>" + esc(s.desc[lang]) + "</p>" : "") + "</div>";
    });
    h += "</div></div></section>";

    if (S.gallery) {
      h += '<section id="gallery" style="padding-top:0"><div class="wrap">' + head(num(sec++), t.gallery) + '<div class="gal">';
      S.gallery.forEach(function (g, i) {
        var cap = g.label ? g.label[lang] : t.photo;
        h += "<figure><div class=\"ph\">" + (g.img ? '<img loading="lazy" alt="' + esc(cap) + '" src="' + esc(g.img) + '">' : "<span>" + t.photo + " " + num(i) + "</span>") +
          "</div><figcaption><span>" + esc(cap) + "</span><span>" + num(i) + "</span></figcaption></figure>";
      });
      h += "</div></div></section>";
    }

    if (S.masters) {
      h += '<section id="masters" style="padding-top:0"><div class="wrap">' + head(num(sec++), t.masters) + "<div>";
      S.masters.forEach(function (m, i) {
        h += '<div class="mrow"><span class="n">' + num(i) + "</span><b>" + esc(m.name) + '</b><span class="rl">' + esc(m.role[lang]) + '</span><span class="ex">' + (m.exp ? esc(m.exp[lang]) : "") + "</span></div>";
      });
      h += "</div></div></section>";
    }

    if (S.reviews) {
      h += '<section id="reviews" style="padding-top:0"><div class="wrap">' + head(num(sec++), t.reviews) + '<div class="rev">';
      S.reviews.forEach(function (r) { h += "<blockquote>" + esc(r.text[lang]) + "<cite>" + esc(r.name) + "</cite></blockquote>"; });
      h += "</div></div></section>";
    }

    h += '<section id="book" class="dark"><div class="wrap"><div class="book"><div><h3>' + t.formTitle + "</h3><p>" + t.formText + "</p>" +
      (S.bookUrl ? '<p><a class="btn" style="color:var(--paper);border-color:var(--paper)" target="_blank" rel="noopener" href="' + esc(S.bookUrl) + '">' + t.bookExt + "</a></p>" : "") + "</div>" +
      '<form id="bf"><div class="f2"><input name="n" required placeholder="' + t.name + '"><input name="p" required inputmode="tel" placeholder="' + t.tel + '"></div>' +
      '<div class="f2"><select name="s">' + S.services.map(function (s) { return "<option>" + esc(s.name[lang]) + "</option>"; }).join("") + "</select>" +
      (S.masters ? '<select name="m"><option value="">' + t.any + "</option>" + S.masters.map(function (m) { return "<option>" + esc(m.name) + "</option>"; }).join("") + "</select>" : '<input name="w" placeholder="' + t.when + ": " + t.whenPh + '">') + "</div>" +
      (S.masters ? '<input name="w" placeholder="' + t.when + ": " + t.whenPh + '">' : "") +
      '<button class="btn a" type="submit">' + t.send + "</button></form></div></div></section>";

    h += '<section id="contacts"><div class="wrap">' + head(num(sec++), t.contacts) + '<div class="contact"><div>' +
      '<p class="row"><b>' + t.addr + "</b>" + esc(S.address[lang]) + '</p><p class="row"><b>' + t.hours + "</b>" + esc(S.hours[lang]) +
      '</p><p class="row"><b>' + t.phone + '</b><a href="tel:' + esc(S.phoneRaw) + '">' + esc(S.phone) + "</a></p>" +
      (S.instagram ? '<p class="row"><b>Instagram</b><a target="_blank" rel="noopener" href="https://instagram.com/' + esc(S.instagram) + '">@' + esc(S.instagram) + "</a></p>" : "") +
      '<div class="btns" style="margin-top:20px"><a class="btn p" href="' + wa(S.waText[lang]) + '" target="_blank" rel="noopener">' + t.write + "</a></div></div>" +
      (S.mapEmbed ? '<iframe title="map" src="' + esc(S.mapEmbed) + '" loading="lazy"></iframe>' : "") + "</div></div></section>";

    h += '<footer><div class="wrap">© ' + new Date().getFullYear() + " " + esc(S.name) + (S.isDemo ? " · " + t.demo : "") + "</div></footer>";
    h += '<div class="bar"><a class="btn p" href="' + bookHref() + '"' + ext() + ">" + t.book + '</a><a class="btn" href="' + wa(S.waText[lang]) + '" target="_blank" rel="noopener">WhatsApp</a></div>';

    document.getElementById("app").innerHTML = h;
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.onclick = function () { lang = b.getAttribute("data-l"); try { localStorage.setItem("lang", lang); } catch (e) {} render(); };
    });
    var f = document.getElementById("bf");
    if (f) f.onsubmit = function (e) {
      e.preventDefault();
      var d = new FormData(f), L = lang === "kk";
      var msg = (L ? "Сәлеметсіз бе! Жазылғым келеді.\n" : "Здравствуйте! Хочу записаться.\n") +
        (L ? "Аты: " : "Имя: ") + d.get("n") + "\nТелефон: " + d.get("p") + "\n" + (L ? "Қызмет: " : "Услуга: ") + d.get("s") +
        (d.get("m") ? "\n" + (L ? "Шебер: " : "Мастер: ") + d.get("m") : "") + (d.get("w") ? "\n" + (L ? "Уақыт: " : "Время: ") + d.get("w") : "");
      window.open(wa(msg), "_blank");
    };
  }
  render();
})();
