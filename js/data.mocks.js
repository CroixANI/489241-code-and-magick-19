'use strict';

(function () {
  // constants
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_COUNT = 4;

  function getRandomWizardName() {
    return window.utils.getRandomArrayItem(NAMES) + ' ' + window.utils.getRandomArrayItem(SURNAMES);
  }

  function generateWizards() {
    var wizards = [];

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var wizard = {
        name: getRandomWizardName(),
        coatColor: window.utils.getRandomArrayItem(COAT_COLORS),
        eyesColor: window.utils.getRandomArrayItem(EYES_COLORS)
      };
      wizards.push(wizard);
    }

    return wizards;
  }

  window.data = window.data || {};
  window.data.mocks = window.data.mocks || {};
  window.data.mocks.generateWizards = generateWizards;
})();
