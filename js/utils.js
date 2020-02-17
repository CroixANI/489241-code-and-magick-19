'use strict';

(function () {
  var ERROR_SELECTOR = '.error';
  var ERROR_HIDDEN_CLASS = 'hidden';

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

  // took from here https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var swapIndex = random(0, i);
      var currentItem = array[i];
      array[i] = array[swapIndex];
      array[swapIndex] = currentItem;
    }
    return array;
  }

  function showError(errorMessage) {
    var errorElement = document.querySelector(ERROR_SELECTOR);
    errorElement.classList.remove(ERROR_HIDDEN_CLASS);
    errorElement.textContent = errorMessage;
  }

  function hideError() {
    var errorElement = document.querySelector(ERROR_SELECTOR);
    errorElement.classList.add(ERROR_HIDDEN_CLASS);
  }

  window.utils = window.utils || {};
  window.utils.random = random;
  window.utils.getRandomArrayItem = getRandomArrayItem;
  window.utils.colorize = colorize;
  window.utils.showError = showError;
  window.utils.hideError = hideError;
  window.utils.shuffleArray = shuffleArray;
})();
