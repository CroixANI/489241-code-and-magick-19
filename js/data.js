'use strict';

(function () {
  function processWizardsData(data) {
    return window.utils.shuffleArray(data).slice(0, 4);
  }

  function getWizards(onLoad, onError) {
    window.backend.load(function (data) {
      onLoad(processWizardsData(data));
    }, onError);
  }

  window.data = window.data || {};
  window.data.getWizards = getWizards;
})();
