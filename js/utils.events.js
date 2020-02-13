'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  function isEscapeEvent(evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  }

  window.Utils = window.Utils || {};
  window.Utils.Events = window.Utils.Events || {};
  window.Utils.Events.isEscapeEvent = isEscapeEvent;
  window.Utils.Events.isEnterEvent = isEnterEvent;
})();
