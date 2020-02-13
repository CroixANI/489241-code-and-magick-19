'use strict';

var SETUP_OPEN_ELEMENT_SELECTOR = '.setup-open';
var SETUP_OPEN_ICON_ELEMENT_SELECTOR = '.setup-open-icon';

function onAvatarClick() {
  window.Setup.Dialog.showSetupDialog();
}

function onAvatarEnterPress(evt) {
  window.Utils.Events.isEnterEvent(evt, window.Setup.Dialog.showSetupDialog);
}

function addAvatarEventListeners() {
  var avatarElement = document.querySelector(SETUP_OPEN_ELEMENT_SELECTOR);
  avatarElement.addEventListener('click', onAvatarClick);
  avatarElement.querySelector(SETUP_OPEN_ICON_ELEMENT_SELECTOR)
    .addEventListener('keydown', onAvatarEnterPress);
}

addAvatarEventListeners();
