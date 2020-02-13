'use strict';

(function () {
  function makeDraggable(dragHandleElement, draggableElement) {
    dragHandleElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var draggable = false;
      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      function onMouseMove(moveEvt) {
        evt.preventDefault();

        draggable = true;

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        draggableElement.style.top = (draggableElement.offsetTop - shift.y) + 'px';
        draggableElement.style.left = (draggableElement.offsetLeft - shift.x) + 'px';
      }

      function onMouseUp(upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (draggable) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            dragHandleElement.removeEventListener('click', onClickPreventDefault);
          };
          dragHandleElement.addEventListener('click', onClickPreventDefault);
        }
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }

  window.Draggable = window.Draggable || {};
  window.Draggable.makeDraggable = makeDraggable;
})();
