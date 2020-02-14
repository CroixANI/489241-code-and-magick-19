'use strict';

(function () {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomArrayItem(array) {
    var index = random(0, array.length - 1);
    return array[index];
  }

  function colorize(element, colorsArray) {
    var color = getRandomArrayItem(colorsArray);
    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }
    return color;
  }

  window.utils = window.utils || {};
  window.utils.random = random;
  window.utils.getRandomArrayItem = getRandomArrayItem;
  window.utils.colorize = colorize;
})();
