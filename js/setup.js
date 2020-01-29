'use strict';

// Wizards constants
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

// Html Elements Selectors
var SETUP_DIALOG_SELECTOR = '.setup';
var WIZARD_SIMILAR_REGION_SELECTOR = '.setup-similar';
var WIZARD_SIMILAR_ELEMENT_SELECTOR = '.setup-similar-list';
var WIZARD_TEMPLATE_ELEMENT_SELECTOR = '#similar-wizard-template';
var WIZARD_NAME_ELEMENT_SELECTOR = '.setup-similar-label';
var WIZARD_COAT_ELEMENT_SELECTOR = '.wizard-coat';
var WIZARD_EYES_ELEMENT_SELECTOR = '.wizard-eyes';

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomArrayItem(array) {
  var index = random(0, array.length - 1);
  return array[index];
}

function getRandomWizardName() {
  return getRandomArrayItem(NAMES) + ' ' + getRandomArrayItem(SURNAMES);
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
  wizardElement.querySelector(WIZARD_NAME_ELEMENT_SELECTOR).textContent = wizard.name;
  wizardElement.querySelector(WIZARD_COAT_ELEMENT_SELECTOR).style.fill = wizard.coatColor;
  wizardElement.querySelector(WIZARD_EYES_ELEMENT_SELECTOR).style.fill = wizard.eyesColor;
  return wizardElement;
}

function renderWizards() {
  var similarListElement = document.querySelector(WIZARD_SIMILAR_ELEMENT_SELECTOR);
  var wizardTemplate = document
    .querySelector(WIZARD_TEMPLATE_ELEMENT_SELECTOR)
    .content;

  var wizards = generateWizards();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizardTemplate, wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

function showSetupDialog() {
  renderWizards();
  document.querySelector(SETUP_DIALOG_SELECTOR).classList.remove('hidden');
  document.querySelector(WIZARD_SIMILAR_REGION_SELECTOR).classList.remove('hidden');
}

showSetupDialog();
