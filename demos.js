/* Список примеров сайтов. Чтобы добавить новый пример:
   1) положи папку с сайтом рядом (например my-demo/index.html),
   2) добавь сюда объект,
   3) запусти publish.ps1.
   thumb: необязательная картинка-превью (путь от корня репозитория). */
window.DEMOS = [
  { path: "https://qmanga.maqsatto.dev/", title: "QManga. Платформа манги на казахском", niche: "Мой проект",
    desc: "Реальный работающий проект: сайт для чтения манги и манхвы на казахском, роли читателя, переводчика и админа. Go, PostgreSQL, Docker.", thumb: "" },
  { path: "biz-beauty/", title: "Салон красоты", niche: "Красота", desc: "Нежный розовый, serif-шрифт, раскладка «фото сверху». Услуги, шаги записи, отзывы.", thumb: "biz-beauty/img/hero.jpg" },
  { path: "biz-detailing/", title: "Детейлинг и автомойка", niche: "Авто", desc: "Тёмный графит и электрический синий, крупное фото на весь экран. Цена до начала работ.", thumb: "biz-detailing/img/hero.jpg" },
  { path: "biz-dental/", title: "Стоматология", niche: "Медицина", desc: "Белый и бирюзовый, дружелюбный шрифт. Доверие, детская стоматология, шаги приёма.", thumb: "biz-dental/img/hero.jpg" },
  { path: "biz-cafe/", title: "Кофейня", niche: "Общепит", desc: "Тёплый кофейный, serif, текст по центру поверх фото. Меню с ценами и бронь столика.", thumb: "biz-cafe/img/hero.jpg" },
  { path: "biz-fitness/", title: "Фитнес-клуб", niche: "Спорт", desc: "Чёрный с оранжевым, жирный шрифт, абонементы и запись на пробное.", thumb: "biz-fitness/img/hero.jpg" },
  { path: "barber-premium/", title: "Барбершоп. Тёмный люкс", niche: "Барбершоп", desc: "Почти чёрный фон, медный акцент, цветные фото, карусели на телефоне.", thumb: "barber-premium/img/hero.jpg" },
  { path: "barber-street/", title: "Барбершоп. Уличный", niche: "Барбершоп", desc: "Бетон, кислотно-жёлтый, тяжёлые шрифты, отзывы как чат.", thumb: "barber-street/img/hero.jpg" },
  { path: "barber-nomad/", title: "Барбершоп. Кочевой", niche: "Барбершоп", desc: "Бирюза, кожа и латунь, казахский орнамент.", thumb: "barber-nomad/img/hero.jpg" },
  { path: "barber-light/", title: "Барбершоп. Светлый с записью", niche: "Барбершоп", desc: "Белый и зелёный, виджет записи с выбором мастера и времени.", thumb: "barber-light/img/hero.jpg" },
  { path: "barber-classic/", title: "Барбершоп. Классика", niche: "Барбершоп", desc: "Светлая бумажная тема, красная барбер-полоса, прайс как меню.", thumb: "" },
  { path: "education-center/", title: "Учебный центр", niche: "Образование", desc: "Английский, математика, подготовка к ЕНТ.", thumb: "" }
];
