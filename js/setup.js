'use strict';

var SETUP_OPEN_ELEMENT_SELECTOR = '.setup-open';
var SETUP_OPEN_ICON_ELEMENT_SELECTOR = '.setup-open-icon';

function onAvatarClick() {
  window.setup.dialog.showSetupDialog();
}

function onAvatarEnterPress(evt) {
  window.utils.events.isEnterEvent(evt, window.setup.dialog.showSetupDialog);
}

function addAvatarEventListeners() {
  var avatarElement = document.querySelector(SETUP_OPEN_ELEMENT_SELECTOR);
  avatarElement.addEventListener('click', onAvatarClick);
  avatarElement.querySelector(SETUP_OPEN_ICON_ELEMENT_SELECTOR)
    .addEventListener('keydown', onAvatarEnterPress);
}

addAvatarEventListeners();
