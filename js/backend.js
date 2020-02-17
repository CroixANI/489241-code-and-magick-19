'use strict';

(function () {
  var WIZARDS_URL = 'https://js.dump.academy/code-and-magick/data';
  var WIZARDS_POST_URL = 'https://js.dump.academy/code-and-magick';

  function sendAjax(url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Response error with status = ' + xhr.status + ' and message = ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Connection error.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Timeout happened.');
    });

    if (data) {
      xhr.open('POST', url);
      xhr.send(data);
    } else {
      xhr.open('GET', url);
      xhr.send();
    }
  }

  function load(onLoad, onError) {
    sendAjax(WIZARDS_URL, null, onLoad, onError);
  }

  function save(data, onLoad, onError) {
    sendAjax(WIZARDS_POST_URL, data, onLoad, onError);
  }

  window.backend = window.backend || {};
  window.backend.load = load;
  window.backend.save = save;
})();
