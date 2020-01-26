'use strict';

var statisticConstants = {
  window: {
    startPositionX: 100,
    startPositionY: 10,
    width: 420,
    height: 270,
    shadowStartPositionDiff: 10,
    getShadowStartPosition: function () {
      return {
        x: statisticConstants.window.startPositionX + statisticConstants.window.shadowStartPositionDiff,
        y: statisticConstants.window.startPositionY + statisticConstants.window.shadowStartPositionDiff
      };
    },
    getStartPosition: function () {
      return {
        x: statisticConstants.window.startPositionX,
        y: statisticConstants.window.startPositionY
      };
    }
  },
  text: {
    fontFamily: '16px PT Mono',
    fontColor: '#000',
    lineHeight: 20,
    x: 15,
    y: 30,
    getStartPosition: function () {
      return {
        x: statisticConstants.window.getStartPosition().x + statisticConstants.text.x,
        y: statisticConstants.window.getStartPosition().y + statisticConstants.text.y,
      };
    }
  },
  bars: {
    height: 150,
    columnWidth: 40,
    columnGap: 50,
    playerColor: 'rgba(255, 0, 0, 1)',
    otherColor: 'rgb(0, 0, ${X}, 1)'
  }
};

function renderRectangle(ctx, x, y, color, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function renderMessage(ctx, message, x, y) {

  ctx.fillStyle = statisticConstants.text.fontColor;
  ctx.font = statisticConstants.text.fontColor.fontFamily;
  message.split('\n').forEach(function (line, i) {
    ctx.fillText(line, x, y + statisticConstants.text.lineHeight * i);
  });
}

function calculateBarHeight(max, current) {
  return Math.floor((statisticConstants.bars.height * current) / max);
}

window.renderStatistics = function (ctx, names, times) {
  var shadowStartPosition = statisticConstants.window.getShadowStartPosition();
  var startPosition = statisticConstants.window.getStartPosition();
  var mainTextStartPosition = statisticConstants.text.getStartPosition();


  var firstBardBordersDiff = 40;
  var barStartY = startPosition.y + statisticConstants.window.height - firstBardBordersDiff;
  var maxTime = Math.floor(times.reduce(function (a, b) {
    return Math.max(a, b);
  }));

  // draw window dialog
  renderRectangle(ctx, shadowStartPosition.x, shadowStartPosition.y, 'rgba(0, 0, 0, 0.7)', statisticConstants.window.width, statisticConstants.window.height);
  renderRectangle(ctx, startPosition.x, startPosition.y, 'white', statisticConstants.window.width, this.statisticConstants.window.height);
  // display main text
  renderMessage(ctx, 'Ура вы победили! \nСписок результатов: ', mainTextStartPosition.x, mainTextStartPosition.y);

  // draw histogram e.g. bars
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var barHeight = calculateBarHeight(maxTime, times[i]);
    var startXDiff = i * (statisticConstants.bars.columnWidth + statisticConstants.bars.columnGap);
    var barStartX = startPosition.x + firstBardBordersDiff + startXDiff;

    var color = statisticConstants.bars.otherColor;
    if (name === 'Вы') {
      color = statisticConstants.bars.playerColor;
    } else {
      // example took here https://stackoverflow.com/questions/20790579/wont-math-floormath-random-255-generate-uneven-probabilities
      color = color.replace('${X}', Math.floor(Math.random() * 256));
    }

    // visual start of bar = window start position + total window height - firstBardBordersDiff, where firstBardBordersDiff approx diff between bar visual begin and window buttom
    renderRectangle(ctx, barStartX, barStartY - barHeight, color, statisticConstants.bars.columnWidth, barHeight);
    renderMessage(ctx, name, barStartX, barStartY + firstBardBordersDiff / 2);
  }
};
