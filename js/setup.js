'use strict';

// Wizards constants
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;

// Html Elements Selectors
var SETUP_DIALOG_SELECTOR = '.setup';
var SETUP_OPEN_ELEMENT_SELECTOR = '.setup-open';
var SETUP_OPEN_ICON_ELEMENT_SELECTOR = '.setup-open-icon';
var SETUP_CLOSE_ELEMENT_SELECTOR = '.setup-close';
var PROFILE_NAME_ELEMENT_SELECTOR = '.setup-user-name';
var WIZARD_SIMILAR_REGION_SELECTOR = '.setup-similar';
var WIZARD_SIMILAR_ELEMENT_SELECTOR = '.setup-similar-list';
var WIZARD_TEMPLATE_ELEMENT_SELECTOR = '#similar-wizard-template';
var WIZARD_NAME_ELEMENT_SELECTOR = '.setup-similar-label';
var WIZARD_COAT_ELEMENT_SELECTOR = '.wizard-coat';
var WIZARD_SETUP_WRAP_ELEMENT_SELECTOR = '.setup-wizard-wrap';
var WIZARD_COAT_COLOR_ELEMENT_SELECTOR = '.setup-wizard .wizard-coat';
var WIZARD_COAT_COLOR_INPUT_SELECTOR = 'input[name="coat-color"]';
var WIZARD_EYES_ELEMENT_SELECTOR = '.wizard-eyes';
var WIZARD_EYES_COLOR_ELEMENT_SELECTOR = '.setup-wizard .wizard-eyes';
var WIZARD_EYES_COLOR_INPUT_SELECTOR = 'input[name="eyes-color"]';
var WIZARD_FIREBALL_COLOR_ELEMENT_SELECTOR = '.setup-fireball-wrap';
var WIZARD_FIREBALL_COLOR_INPUT_SELECTOR = 'input[name="fireball-color"]';

// Event Listeners
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setupDialogElement = document.querySelector(SETUP_DIALOG_SELECTOR);
var setupDialogCloseElement = setupDialogElement.querySelector(SETUP_CLOSE_ELEMENT_SELECTOR);
var wizardCoatInputElement = document.querySelector(WIZARD_COAT_COLOR_INPUT_SELECTOR);
var wizardEyesInputElement = document.querySelector(WIZARD_EYES_COLOR_INPUT_SELECTOR);
var wizardFireballInputElement = document.querySelector(WIZARD_FIREBALL_COLOR_INPUT_SELECTOR);

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
  setupDialogElement.classList.remove('hidden');
  document.querySelector(WIZARD_SIMILAR_REGION_SELECTOR).classList.remove('hidden');
  addCloseSetupDialogEventListeners();
}

function closeSetupDialog() {
  setupDialogElement.classList.add('hidden');
  removeCloseSetupDialogEventListeners();
}

function onPopupEscapePress(evt) {
  if (evt.key === ESC_KEY && evt.target.matches(PROFILE_NAME_ELEMENT_SELECTOR) === false) {
    closeSetupDialog();
  }
}

function onPopupCloseEnterPress(evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupDialog();
  }
}

function onAvatarEnterPress(evt) {
  if (evt.key === ENTER_KEY) {
    showSetupDialog();
  }
}

function onWizardCoatClick(evt) {
  if (evt.target.matches(WIZARD_COAT_COLOR_ELEMENT_SELECTOR)) {
    var color = getRandomArrayItem(COAT_COLORS);
    evt.target.style.fill = color;
    wizardCoatInputElement.value = color;
  }
}

function onWizardEyesClick(evt) {
  if (evt.target.matches(WIZARD_EYES_COLOR_ELEMENT_SELECTOR)) {
    var color = getRandomArrayItem(EYES_COLORS);
    evt.target.style.fill = color;
    wizardEyesInputElement.value = color;
  }
}

function onWizardFireballClick(evt) {
  var color = getRandomArrayItem(FIREBALLS_COLORS);
  evt.target.style.backgroundColor = color;
  wizardFireballInputElement.value = color;
}

function addChangeColorEventListeners() {
  document.querySelector(WIZARD_SETUP_WRAP_ELEMENT_SELECTOR)
    .addEventListener('click', function (evt) {
      onWizardCoatClick(evt);
      onWizardEyesClick(evt);
    });
  document.querySelector(WIZARD_FIREBALL_COLOR_ELEMENT_SELECTOR)
    .addEventListener('click', onWizardFireballClick);
}

function addOpenSetupDialogEventListeners() {
  var openElement = document.querySelector(SETUP_OPEN_ELEMENT_SELECTOR);
  openElement.addEventListener('click', showSetupDialog);
  openElement.querySelector(SETUP_OPEN_ICON_ELEMENT_SELECTOR)
    .addEventListener('keydown', onAvatarEnterPress);
  addChangeColorEventListeners();
}

function addCloseSetupDialogEventListeners() {
  setupDialogCloseElement.addEventListener('click', closeSetupDialog);
  setupDialogCloseElement.addEventListener('keydown', onPopupCloseEnterPress);
  document.addEventListener('keydown', onPopupEscapePress);
}

function removeCloseSetupDialogEventListeners() {
  setupDialogCloseElement.removeEventListener('click', closeSetupDialog);
  setupDialogCloseElement.removeEventListener('keydown', onPopupCloseEnterPress);
  document.removeEventListener('keydown', onPopupEscapePress);
}

renderWizards();
addOpenSetupDialogEventListeners();
