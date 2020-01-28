'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomArrayItem(array) {
  var index = random(0, array.length - 1);
  return array[index];
}

function getRandomWizardName() {
  return getRandomArrayItem(NAMES) + " " + getRandomArrayItem(SURNAMES);
}

function generateWizards() {
  var wizards = [];

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    var wizard = {
      name: getRandomWizardName(),
      coatColor: getRandomArrayItem(COAT_COLORS),
      eyesColor: getRandomArrayItem(EYES_COLORS)
    };
    wizards.push(wizard);
  }

  return wizards;
}

function renderWizard(template, wizard) {
  var wizardElement = template.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

function renderWizards() {
  var similarListElement = document.querySelector('.setup-similar-list');
  var wizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var wizards = generateWizards();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizardTemplate, wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

function showSetupDialog() {
  renderWizards();
  document.querySelector('.setup').classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
}

showSetupDialog();
