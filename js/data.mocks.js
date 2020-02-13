'use strict';

(function () {
  // constants
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_COUNT = 4;

  function getRandomWizardName() {
    return window.Utils.getRandomArrayItem(NAMES) + ' ' + window.Utils.getRandomArrayItem(SURNAMES);
  }

  function generateWizards() {
    var wizards = [];

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      var wizard = {
        name: getRandomWizardName(),
        coatColor: window.Utils.getRandomArrayItem(COAT_COLORS),
        eyesColor: window.Utils.getRandomArrayItem(EYES_COLORS)
      };
      wizards.push(wizard);
    }

    return wizards;
  }

  window.Data = window.Data || {};
  window.Data.Mocks = window.Data.Mocks || {};
  window.Data.Mocks.generateWizards = generateWizards;
})();
