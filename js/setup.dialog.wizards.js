'use strict';

(function () {
  var WIZARD_NAME_ELEMENT_SELECTOR = '.setup-similar-label';
  var WIZARD_COAT_ELEMENT_SELECTOR = '.wizard-coat';
  var WIZARD_EYES_ELEMENT_SELECTOR = '.wizard-eyes';

  var WIZARD_TEMPLATE_ELEMENT_SELECTOR = '#similar-wizard-template';

  function renderWizard(template, wizard) {
    var wizardElement = template.cloneNode(true);
    wizardElement.querySelector(WIZARD_NAME_ELEMENT_SELECTOR).textContent = wizard.name;
    wizardElement.querySelector(WIZARD_COAT_ELEMENT_SELECTOR).style.fill = wizard.coatColor;
    wizardElement.querySelector(WIZARD_EYES_ELEMENT_SELECTOR).style.fill = wizard.eyesColor;
    return wizardElement;
  }

  function renderWizards(containerElement) {
    var wizardTemplate = document
      .querySelector(WIZARD_TEMPLATE_ELEMENT_SELECTOR)
      .content;

    var wizards = window.data.mocks.generateWizards();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizardTemplate, wizards[i]));
    }

    containerElement.innerHTML = '';
    containerElement.appendChild(fragment);
  }

  window.setup = window.setup || {};
  window.setup.dialog = window.setup.dialog || {};
  window.setup.dialog.wizards = window.setup.dialog.wizards || {};
  window.setup.dialog.wizards.renderWizards = renderWizards;
})();
