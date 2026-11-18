/* Общий скрипт для барбершоп-примеров: язык RU/ҚАЗ, шапка, появление блоков, запись в WhatsApp.
   Номер WhatsApp меняется в одном месте: window.WA_PHONE в index.html страницы (по умолчанию заглушка). */
(function () {
  var $ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var PHONE = window.WA_PHONE || "77000000000";

  var hd = document.getElementById("hd");
  if (hd) { var sc = function () { hd.classList.toggle("s", scrollY > 30); }; sc(); addEventListener("scroll", sc, { passive: true }); }

  /* язык */
  var els = $("[data-kk]"), phs = $("[data-ph-kk]");
  els.forEach(function (e) { e._ru = e.innerHTML; });
  phs.forEach(function (e) { e._ru = e.placeholder; });
  function setLang(l) {
    document.documentElement.lang = l;
    els.forEach(function (e) { e.innerHTML = l === "kk" ? e.getAttribute("data-kk") : e._ru; });
    phs.forEach(function (e) { e.placeholder = l === "kk" ? e.getAttribute("data-ph-kk") : e._ru; });
    $(".lang button").forEach(function (b) { b.classList.toggle("on", b.dataset.l === l); });
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  $(".lang button").forEach(function (b) { b.onclick = function () { setLang(b.dataset.l); }; });
  try { if (localStorage.getItem("lang") === "kk") setLang("kk"); } catch (e) {}

  /* появление блоков */
  var rv = $(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: .1 });
    rv.forEach(function (e) { io.observe(e); });
  } else rv.forEach(function (e) { e.classList.add("in"); });

  /* выбор времени (чипы) и мастера (кнопки «Выбрать») */
  $(".slot").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.preventDefault();
      $(".slot").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      var w = document.querySelector('[name="w"]'); if (w) w.value = b.textContent.trim();
    });
  });
  $("[data-pick]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      var m = document.querySelector('[name="m"]'); if (m) m.value = b.getAttribute("data-pick");
      var t = document.getElementById("book"); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
    });
  });

  /* форма → WhatsApp */
  var f = document.getElementById("bf");
  if (f) f.addEventListener("submit", function (e) {
    e.preventDefault();
    var k = document.documentElement.lang === "kk", d = new FormData(f);
    if (!d.get("n") || !d.get("p")) { (d.get("n") ? f.p : f.n).focus(); return; }
    var m = (k ? "Сәлеметсіз бе! Жазылғым келеді.\n" : "Здравствуйте! Хочу записаться.\n") +
      (k ? "Аты: " : "Имя: ") + d.get("n") + "\nТелефон: " + d.get("p") +
      (d.get("s") ? "\n" + (k ? "Қызмет: " : "Услуга: ") + d.get("s") : "") +
      (d.get("m") ? "\n" + (k ? "Шебер: " : "Мастер: ") + d.get("m") : "") +
      (d.get("w") ? "\n" + (k ? "Уақыт: " : "Время: ") + d.get("w") : "");
    window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(m), "_blank");
  });
})();
