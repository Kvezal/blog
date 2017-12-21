const PLACE_HOLDER = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor massa id. Neque convallis a cras semper auctor neque vitae. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Sagittis eu volutpat odio facilisis mauris sit. Risus nec feugiat in fermentum posuere urna. Eleifend mi in nulla posuere. Habitant morbi tristique senectus et netus et malesuada fames ac. Vel eros donec ac odio tempor orci dapibus ultrices in. Duis ultricies lacus sed turpis tincidunt id aliquet. Eu scelerisque felis imperdiet proin. Nibh ipsum consequat nisl vel pretium. In nisl nisi scelerisque eu.

Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Nunc non blandit massa enim. Urna et pharetra pharetra massa massa ultricies mi quis hendrerit. Duis ultricies lacus sed turpis tincidunt id aliquet. Pellentesque adipiscing commodo elit at imperdiet dui. Non arcu risus quis varius quam quisque. Vel pharetra vel turpis nunc eget lorem dolor sed viverra. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Elementum tempus egestas sed sed risus pretium quam. Gravida neque convallis a cras semper. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Elit ullamcorper dignissim cras tincidunt. Fermentum et sollicitudin ac orci phasellus egestas. Ac felis donec et odio pellentesque diam.

Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Nullam vehicula ipsum a arcu cursus. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Tellus cras adipiscing enim eu turpis egestas. Tincidunt dui ut ornare lectus sit amet est. Tellus mauris a diam maecenas sed enim ut. Mattis nunc sed blandit libero volutpat sed. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Dignissim cras tincidunt lobortis feugiat vivamus at. Porta lorem mollis aliquam ut porttitor leo a.

Consectetur adipiscing elit duis tristique sollicitudin. Sed turpis tincidunt id aliquet. Erat pellentesque adipiscing commodo elit at imperdiet dui. Volutpat sed cras ornare arcu dui vivamus. Turpis massa sed elementum tempus egestas sed. Vel facilisis volutpat est velit egestas dui. Ornare massa eget egestas purus viverra accumsan. Ut placerat orci nulla pellentesque dignissim. Fermentum odio eu feugiat pretium nibh. Mi ipsum faucibus vitae aliquet. Dignissim sodales ut eu sem integer vitae justo eget. Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada. Tincidunt nunc pulvinar sapien et ligula. Dui faucibus in ornare quam viverra orci sagittis. Maecenas sed enim ut sem viverra aliquet. Curabitur gravida arcu ac tortor dignissim convallis aenean et tortor. In nibh mauris cursus mattis molestie a.`;


export default {
  skills: [
    `HTML5`,
    `Семантичная и валидная верстка`,
    `Адаптивная графика(ретинизация и кадрирование изображений)`,
    `CSS`,
    `Кроссбраузерная и pixel-perfect верстка`,
    `Построение адаптивных сеток`,
    `Анимация`,
    `JS`,
    `Проектирование приложений`,
    `MVP`,
    `ES6+`,
    `Gulp`,
    `Git`,
    `AJAX`,
    `Promise`,
    `LESS`,
    `SASS`,
    `БЭМ методология`,
    `Mobile first`,
    `Progressive enhancement`,
    `Соблюдение принципа DRY`,
    `Написание оптимизированного кода`
  ],

  education: [
    {
      name: `basicHTML&CSS`,
      type: `Интенсив`,
      title: `Базовый HTML и CSS`,
      data: `16 января - 22 февраля 2017г.`,
      state: `100%`,
      id: `e1`
    },
    {
      name: `advancedHTML&CSS`,
      type: `Интенсив`,
      title: `“Продвинутый HTML и CSS”`,
      data: `22 мая - 28 июня 2017г.`,
      state: `100%`,
      id: `e2`
    },
    {
      name: `basicJS`,
      type: `Интенсив`,
      title: `Базовый JavaScript`,
      data: `8 августа - 20 сентября 2017г.`,
      state: `100%`,
      id: `e3`
    },
    {
      name: `advancedJS`,
      type: `Интенсив`,
      title: `Продвинутый JavaScript`,
      data: `26 сентября - 8 ноября 2017г.`,
      state: `100%`,
      id: `e4`
    }
  ],

  portfolio: [
    {
      title: `Gllacy`,
      link: `https://kvezal.github.io/gllacy/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p1`,
      shortDescription: `интернет-магазин мороженого.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API (при выключеном JS, кнопка вызывающая появление модального окна, будет осуществлять переход на отдельную страницу, а роль карты исполняет фоновое изображение блока с картой). Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS). Выполнена резиновая верстка в диападоне от 900 до 1200px.`
    },
    {
      title: `Nerds`,
      link: `https://kvezal.github.io/nerds/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p2`,
      shortDescription: `сайт web-студии.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API. Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS).`
    },
    {
      title: `Technomart`,
      link: `https://kvezal.github.io/technomart/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p3`,
      shortDescription: `интернет-магазин строительных материалов и инструментов для ремонта.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API. Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS).`
    },
    {
      title: `Sedona`,
      link: `https://kvezal.github.io/sedona/`,
      features: [
        `Markup`,
        `Fixed`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p4`,
      shortDescription: `информационный сайт для туристов.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Google карты с помощью API. Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS). Выполнена резиновая верстка в диападоне от 768 до 1200px.`
    },
    {
      title: `Device`,
      link: `https://kvezal.github.io/device/`,
      features: [
        `Markup`,
        `Fixed`,
        `LESS`,
        `Gulp`,
        `Progressive`,
        `Pixel-Perfect`,
        `ES5`,
        `Базовая оптимизация`,
        `Валидный код`
      ],
      id: `p5`,
      shortDescription: `интернет-магазин гаджетов.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовался подход "Progressive Enhancement". Использовано немного нативного JS для реализации всплывающего окна и подключения Яндекс карты с помощью API (при выключеном JS, кнопка вызывающая появление модального окна, будет осуществлять переход на отдельную страницу, а роль карты исполняет фоновое изображение блока с картой). Произведена базовая оптимизация проекта(использованы спрайты для растровых иконок и минифицирован CSS и JS). Первая попытка работы с CSS-препроцессором и сборщиком проектов(в данном случае использовались препроцессор LESS и сборщик Gulp).`
    },
    {
      title: `Mishka`,
      link: `https://kvezal.github.io/mishka/`,
      features: [
        `Markup`,
        `Adaptive`,
        `Retina`,
        `Кадрирование изображений`,
        `SASS`,
        `SVG`,
        `Gulp`,
        `БЭМ`,
        `Mobile First`,
        `Graceful Degradation`,
        `Pixel-Perfect`,
        `ES5`,
        `Оптимизация`,
        `Валидный код`
      ],
      id: `p6`,
      shortDescription: `интернет-магазин вязаных игрушек.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовались подход "Graceful Degradation" и "Mobile First", также использовалась БЭМ-методология. Использовано немного нативного JS для реализации всплывающего окна, меню (в мобильной версии сайта) и подключения Яндекс карты с помощью API (при выключеном JS в качестве карты выступает фоновое изображение блока к которому подключается карта). Сделана раскадровка и ретинизация изображений с целью ускорения загрузки страницы, чтобы качество изображений было одинакого высоким как на ретиновых, так и на обычных экранах. Произведена сборка и базовая оптимизация проекта с помощью Gulp (оптимизация графики, SVG-спрайты, сборка CSS из SASS, минификация JS и собранного CSS, автоприфексование свойств и группировка media-выражений).`
    },
    {
      title: `Pink`,
      link: `https://kvezal.github.io/pink/`,
      features: [
        `Markup`,
        `Adaptive`,
        `Retina`,
        `Кадрирование изображений`,
        `SASS`,
        `SVG`,
        `Gulp`,
        `БЭМ`,
        `Mobile First`,
        `Progressive Enhancement`,
        `Pixel-Perfect`,
        `ES5`,
        `Оптимизация`,
        `Валидный код`
      ],
      id: `p7`,
      shortDescription: `промо-сайт приложения.`,
      fullDescription: `Верстка проекта реализована в соответствии с PSD-макетом, соблюден "Pixel-Perfect". В процессе разработки использовались подход "Progressive Enhancement" и "Mobile First", также использовалась БЭМ-методология. Использовано немного нативного JS для реализации всплывающего окна, меню (в мобильной версии сайта) и подключения Яндекс карты с помощью API (при выключеном JS в качестве карты выступает фоновое изображение блока к которому подключается карта). Сделана раскадровка и ретинизация изображений с целью ускорения загрузки страницы, чтобы качество изображений было одинакого высоким как на ретиновых, так и на обычных экранах. Произведена базовая сборка и оптимизация проекта с помощью Gulp (оптимизация графики, SVG-спрайты, сборка CSS из SASS, минификация JS и собранного CSS, автоприфексование свойств и группировка media-выражений).`
    },
    {
      title: `Portfolio`,
      link: `https://kvezal.github.io/portfolio/`,
      features: [
        `Дизайн`,
        `Markup`,
        `Adaptive`,
        `Retina`,
        `Кадрирование изображений`,
        `SASS`,
        `SVG`,
        `Gulp`,
        `БЭМ`,
        `Mobile First`,
        `Progressive Enhancement`,
        `Оптимизация`,
        `Валидный код`
      ],
      id: `p8`,
      shortDescription: `сайт-портфолио.`,
      fullDescription: `В процессе разработки использовались подход "Progressive Enhancement" и "Mobile First", также использовалась БЭМ-методология. Сделана раскадровка и ретинизация изображений с целью ускорения загрузки страницы, чтобы качество изображений было одинакого высоким как на ретиновых, так и на обычных экранах. Произведена базовая сборка и оптимизация проекта с помощью Gulp (оптимизация графики, SVG-спрайты, сборка CSS из SASS, минификация JS и собранного CSS, автоприфексование свойств и группировка media-выражений). Проект разрабатывался с учетом неработоспособного JS.`
    },
    {
      title: `Keksobooking`,
      link: `https://kvezal.github.io/keksobooking/`,
      tasks: `documents/specification-keksobooking.md`,
      features: [
        `Fixed`,
        `SPA`,
        `ES5`,
        `Функциональный стиль`,
        `Модульность`,
        `AJAX`
      ],
      id: `p9`,
      shortDescription: `сервис размещения объявлений о сдаче в аренду недвижимости в центре Токио.`,
      fullDescription: `Выполнена загрузка данных с сервера с последующим их отображением на карте в виде меток, при нажатии на которые осуществляется появление карточки для текущей метки. Так же реализовано перетаскивание метки с последующей синхронизацией ее с полем "Адрес" (так же можно задавать координаты внутри этого поля). Написана логика для интерактивной фильтрации полученных элементов по категориям: тип жилья, цена, количество комнат, количество гостей и особенности. Выполнена валидация и синхронизация полей ввода, добавлена возможность загрузки фотографий. При нажатии на кнопку "Опубликовать", данные проверяются на валидность и в случае успеха отправляются на сервер, при этом происходит сброс введенных данных. Обмен данными с сервером осуществляется посредством AJAX (получение и публикация данных). Код написан модульно, использован функциональный стиль. Произведена оптимизация логики исполнения кода.`
    },
    {
      title: `Kekstagram`,
      link: `https://kvezal.github.io/kekstagram/`,
      tasks: `documents/specification-kekstagram.md`,
      features: [
        `Fixed`,
        `SPA`,
        `ES5`,
        `Функциональный стиль`,
        `Модульность`,
        `AJAX`
      ],
      id: `p10`,
      shortDescription: `сервис просмотра изображений.`,
      fullDescription: `Выполнена загрузка данных с сервера с последующим их отображением в галерее в виде фотографий загруженных пользователями, при нажатии на которые появляется модальное окно с исходным размером фотографии. Реализована загрузка фотографии при нажатии на иконку фотоаппарата с последующим наложением на загруженное фото одного из эффектов (хром, сепия, марвин, фобос или зной) и регулировка выбранного эффекта с помощью ползунка. Выполнена валидация полей ввода (хэш-теги, комментарии). При нажатии на кнопку публикации, данные отправляются на сервер, при этом окно с загруженной фотографией закрывается и происходит сброс введенных данных. Написана логика для интерактивной фильтрации полученных элементов по категориям: рекомендуемые, популярные, обсуждаемые и случайные. Обмен данными с сервером осуществляется посредством AJAX (получение и публикация данных). Код написан модульно, использован функциональный стиль. Произведена оптимизация логики исполнения кода.`
    },
    {
      title: `Pixel Hunter`,
      link: `https://kvezal.github.io/pixel-hunter/`,
      tasks: `documents/specification-pixel-hunter.md`,
      features: [
        `Fixed`,
        `SPA`,
        `Проектирование приложения`,
        `ES6+`,
        `Gulp`,
        `MVP`,
        `Модульность`,
        `Promise`
      ],
      id: `p11`,
      shortDescription: `онлайн-игра в которой игроку предлагается отличать фотографии от фотореалистичных изображений.`,
      fullDescription: `Приложение спроектировано в соответствии с паттерном MVP, также произведено проектирование структуры данных, с последующей адаптацией приходящих с сервера данных, под ранее созданную структуру (ранее была неизвестна организация данных на серверной стороне, для чего и потребовалось их адаптировать под используемую в проекте структуру). Функционал проекта реализован в соответствии с техническим заданием. Весь код организован в соответствии с принципом dry. Осуществлена оптимизация кода.`
    }
  ],

  blog: [
    {
      title: `Название статьи 1`,
      link: `#`,
      date: `${new Date() - 1}`,
      article: `Текст статьи`,
      features: [
        `html`
      ],
      id: `b1`,
      shortDescription: `Описание 1`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 2`,
      link: `#`,
      date: `${new Date() - 2}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b2`,
      shortDescription: `Описание 2`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 3`,
      link: `#`,
      date: `${new Date() - 3}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b3`,
      shortDescription: `Описание 3`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 4`,
      link: `#`,
      date: `${new Date() - 4}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b4`,
      shortDescription: `Описание 4`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 5`,
      link: `#`,
      date: `${new Date() - 5}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b5`,
      shortDescription: `Описание 5`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 6`,
      link: `#`,
      date: `${new Date() - 6}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b6`,
      shortDescription: `Описание 6`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 7`,
      link: `#`,
      date: `${new Date() - 7}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b7`,
      shortDescription: `Описание 7`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 8`,
      link: `#`,
      date: `${new Date() - 8}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b8`,
      shortDescription: `Описание 8`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 9`,
      link: `#`,
      date: `${new Date() - 9}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b9`,
      shortDescription: `Описание 9`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 10`,
      link: `#`,
      date: `${new Date() - 10}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b10`,
      shortDescription: `Описание 10`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 11`,
      link: `#`,
      date: `${new Date() - 11}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b11`,
      shortDescription: `Описание 11`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 12`,
      link: `#`,
      date: `${new Date() - 12}`,
      article: `Текст статьи`,
      features: [
        `css`
      ],
      id: `b12`,
      shortDescription: `Описание 12`,
      fullDescription: PLACE_HOLDER
    },
    {
      title: `Название статьи 13`,
      link: `#`,
      date: `${new Date() - 13}`,
      article: `Текст статьи`,
      features: [
        `js`
      ],
      id: `b13`,
      shortDescription: `Описание 13`,
      fullDescription: PLACE_HOLDER
    }
  ]
};
