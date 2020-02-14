'use strict';

(function () {
  // constants
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // selectors for dialog
  var SETUP_DIALOG_SELECTOR = '.setup';
  var SETUP_DIALOG_HIDDEN_CLASS = 'hidden';
  var SETUP_CLOSE_ELEMENT_SELECTOR = '.setup-close';
  var SETUP_UPLOAD_ELEMENT_SELECTOR = '.upload';
  var PROFILE_NAME_ELEMENT_SELECTOR = '.setup-user-name';
  var WIZARD_SIMILAR_ELEMENT_SELECTOR = '.setup-similar-list';
  var WIZARD_SIMILAR_REGION_SELECTOR = '.setup-similar';
  var WIZARD_SIMILAR_REGION_HIDDEN_CLASS = 'hidden';

  // selectors for wizard

  var WIZARD_SETUP_WRAP_ELEMENT_SELECTOR = '.setup-wizard-wrap';
  var WIZARD_COAT_COLOR_ELEMENT_SELECTOR = '.setup-wizard .wizard-coat';
  var WIZARD_COAT_COLOR_INPUT_SELECTOR = 'input[name="coat-color"]';

  var WIZARD_EYES_COLOR_ELEMENT_SELECTOR = '.setup-wizard .wizard-eyes';
  var WIZARD_EYES_COLOR_INPUT_SELECTOR = 'input[name="eyes-color"]';
  var WIZARD_FIREBALL_COLOR_ELEMENT_SELECTOR = '.setup-fireball-wrap';
  var WIZARD_FIREBALL_COLOR_INPUT_SELECTOR = 'input[name="fireball-color"]';

  var setupDialogElement = document.querySelector(SETUP_DIALOG_SELECTOR);
  var setupDialogCloseElement = setupDialogElement.querySelector(SETUP_CLOSE_ELEMENT_SELECTOR);
  var similarListElement = document.querySelector(WIZARD_SIMILAR_ELEMENT_SELECTOR);

  var wizardCoatInputElement = document.querySelector(WIZARD_COAT_COLOR_INPUT_SELECTOR);
  var wizardEyesInputElement = document.querySelector(WIZARD_EYES_COLOR_INPUT_SELECTOR);
  var wizardFireballInputElement = document.querySelector(WIZARD_FIREBALL_COLOR_INPUT_SELECTOR);

  function onPopupCloseClick() {
    document.querySelector(WIZARD_SIMILAR_REGION_SELECTOR)
      .classList.remove(WIZARD_SIMILAR_REGION_HIDDEN_CLASS);
    setupDialogElement.classList.add(SETUP_DIALOG_HIDDEN_CLASS);
    removeCloseSetupDialogEventListeners();
    removeChangeColorEventListeners();
  }

  function onPopupEscapePress(evt) {
    if (evt.target.matches(PROFILE_NAME_ELEMENT_SELECTOR) === false) {
      window.utils.events.isEscapeEvent(evt, onPopupCloseClick);
    }
  }

  function onPopupCloseEnterPress(evt) {
    window.utils.events.isEnterEvent(evt, onPopupCloseClick);
  }

  function onWizardCoatClick(evt) {
    if (evt.target.matches(WIZARD_COAT_COLOR_ELEMENT_SELECTOR)) {
      var color = window.utils.colorize(evt.target, COAT_COLORS);
      wizardCoatInputElement.value = color;
    }
  }

  function onWizardEyesClick(evt) {
    if (evt.target.matches(WIZARD_EYES_COLOR_ELEMENT_SELECTOR)) {
      var color = window.utils.colorize(evt.target, EYES_COLORS);
      wizardEyesInputElement.value = color;
    }
  }

  function onWizardFireballClick(evt) {
    var color = window.utils.colorize(evt.target, FIREBALLS_COLORS);
    wizardFireballInputElement.value = color;
  }

  function addChangeColorEventListeners() {
    document.querySelector(WIZARD_SETUP_WRAP_ELEMENT_SELECTOR).addEventListener('click', onWizardCoatClick);
    document.querySelector(WIZARD_SETUP_WRAP_ELEMENT_SELECTOR).addEventListener('click', onWizardEyesClick);
    document.querySelector(WIZARD_FIREBALL_COLOR_ELEMENT_SELECTOR).addEventListener('click', onWizardFireballClick);
  }

  function removeChangeColorEventListeners() {
    document.querySelector(WIZARD_SETUP_WRAP_ELEMENT_SELECTOR).removeEventListener('click', onWizardCoatClick);
    document.querySelector(WIZARD_SETUP_WRAP_ELEMENT_SELECTOR).removeEventListener('click', onWizardEyesClick);
    document.querySelector(WIZARD_FIREBALL_COLOR_ELEMENT_SELECTOR).removeEventListener('click', onWizardFireballClick);
  }

  function addCloseSetupDialogEventListeners() {
    setupDialogCloseElement.addEventListener('click', onPopupCloseClick);
    setupDialogCloseElement.addEventListener('keydown', onPopupCloseEnterPress);
    document.addEventListener('keydown', onPopupEscapePress);
  }

  function removeCloseSetupDialogEventListeners() {
    setupDialogCloseElement.removeEventListener('click', onPopupCloseClick);
    setupDialogCloseElement.removeEventListener('keydown', onPopupCloseEnterPress);
    document.removeEventListener('keydown', onPopupEscapePress);
  }

  function showSetupDialog() {
    window.setup.dialog.wizards.renderWizards(similarListElement);
    document.querySelector(WIZARD_SIMILAR_REGION_SELECTOR).classList.remove(WIZARD_SIMILAR_REGION_HIDDEN_CLASS);
    addCloseSetupDialogEventListeners();
    addChangeColorEventListeners();
    setupDialogElement.style = '';
    setupDialogElement.classList.remove(SETUP_DIALOG_HIDDEN_CLASS);
    window.draggable.makeDraggable(setupDialogElement.querySelector(SETUP_UPLOAD_ELEMENT_SELECTOR), setupDialogElement);
  }

  window.setup = window.setup || {};
  window.setup.dialog = window.setup.dialog || {};
  window.setup.dialog.showSetupDialog = showSetupDialog;
})();


