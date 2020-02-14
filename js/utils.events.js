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

  window.utils = window.utils || {};
  window.utils.events = window.utils.events || {};
  window.utils.events.isEscapeEvent = isEscapeEvent;
  window.utils.events.isEnterEvent = isEnterEvent;
})();
