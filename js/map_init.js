var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
  // Создание экземпляра карты и его привязка к контейнеру с
  // заданным id ("map").
  myMap = new ymaps.Map("map", {
    // При инициализации карты обязательно нужно указать
    // её центр и коэффициент масштабирования.
    center: [51.763154, 55.10321], // Москва
    zoom: 14,
  });
  myMap.container.fitToViewport();
  // Загрузка XML данных.
  // Функция определяет формат файла (KML, GPX или YMapsML) автоматически.
  ymaps.geoXml
    .load(
      "https://fest.stepiveter.ru/kml/map.kml"
    )
    .then(onGeoXmlLoad);

  // Обработчик загрузки XML-файлов.d
  function onGeoXmlLoad(res) {
    myMap.geoObjects.add(res.geoObjects);
    if (res.mapState) {
      // res.mapState.applyToMap(myMap);
    } else {
      // myMap.setBounds(res.geoObjects.getBounds());
    }
  }
}
