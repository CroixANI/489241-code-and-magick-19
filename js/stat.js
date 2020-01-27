'use strict';

// Window Position Constants
var WINDOW_POSITION_X = 100;
var WINDOW_POSITION_Y = 10;
var WINDOW_SHADOW_POSITION_INDENT = 10;
var WINDOW_HEIGHT = 270;
var WINDOW_WIDTH = 420;

// Window Text Constants
var TEXT_FONT_FAMILY = '16px PT Mono';
var TEXT_FONT_COLOR = '#000';
var TEXT_LINE_HEIGHT = 20;
var WINDOW_TITLE_POSITION_X = 15;
var WINDOW_TITLE_POSITION_Y = 30;

// Statistic Bars Constants
var STATISTIC_ZONE_HEIGHT = 150;
var FIRST_BAR_LEFT_BUTTOM_INDENT = 40;
var BAR_WIDTH = 40;
var BAR_GAP_WIDTH = 50;
var BAR_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_OTHER_COLOR = 'hsl(240, ${X}%, 50%)';// 'rgb(0, 0, ${X}, 1)';
var BAR_POSITION_X = WINDOW_POSITION_X + FIRST_BAR_LEFT_BUTTOM_INDENT;
var BAR_POSITION_Y = WINDOW_POSITION_Y + WINDOW_HEIGHT - FIRST_BAR_LEFT_BUTTOM_INDENT;
var BAR_CAPTION_POSITION_Y = Math.floor(BAR_POSITION_Y + FIRST_BAR_LEFT_BUTTOM_INDENT / 2);

function getWindowRectangle() {
  return {
    x: WINDOW_POSITION_X,
    y: WINDOW_POSITION_Y,
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    color: 'white'
  };
}

function getWindowShadowRectangle() {
  var windowPosition = getWindowRectangle();
  windowPosition.x += WINDOW_SHADOW_POSITION_INDENT;
  windowPosition.y += WINDOW_SHADOW_POSITION_INDENT;
  windowPosition.color = 'rgba(0, 0, 0, 0.7)';
  return windowPosition;
}

function getWindowTitlePosition() {
  var windowPosition = getWindowRectangle();
  return {
    x: windowPosition.x + WINDOW_TITLE_POSITION_X,
    y: windowPosition.y + WINDOW_TITLE_POSITION_Y,
  };
}

function renderRectangle(ctx, rectangle) {
  ctx.fillStyle = rectangle.color;
  ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
}

function renderMessage(ctx, message, position) {

  ctx.fillStyle = TEXT_FONT_COLOR;
  ctx.font = TEXT_FONT_FAMILY;
  message.split('\n').forEach(function (line, i) {
    ctx.fillText(line, position.x, position.y + TEXT_LINE_HEIGHT * i);
  });
}

function calculateBarHeight(max, current) {
  return Math.floor((STATISTIC_ZONE_HEIGHT * current) / max);
}

function getMaxTime(times) {
  return Math.floor(times.reduce(function (a, b) {
    return Math.max(a, b);
  }));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
  return BAR_OTHER_COLOR.replace('${X}', random(0, 100));
}

function renderBars(ctx, names, times) {
  var maxTime = getMaxTime(times);

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var startXDiff = i * (BAR_WIDTH + BAR_GAP_WIDTH);
    var currentBarHeight = calculateBarHeight(maxTime, times[i]);

    var color = BAR_PLAYER_COLOR;
    if (name !== 'Вы') {
      // example took here https://css-tricks.com/hsl-hsla-is-great-for-programmatic-color-control/
      color = getRandomColor();
    }

    var currentBarRectangle = {
      x: BAR_POSITION_X + startXDiff,
      y: BAR_POSITION_Y - currentBarHeight,
      height: currentBarHeight,
      width: BAR_WIDTH,
      color: color
    };

    // visual start of bar = window start position + total window height - firstBardBordersDiff, where firstBardBordersDiff approx diff between bar visual begin and window buttom
    renderRectangle(ctx, currentBarRectangle);
    renderMessage(ctx, name, {x: currentBarRectangle.x, y: BAR_CAPTION_POSITION_Y});
  }
}

window.renderStatistics = function (ctx, names, times) {
  // draw window dialog
  renderRectangle(ctx, getWindowShadowRectangle());
  renderRectangle(ctx, getWindowRectangle());

  // display main text
  renderMessage(ctx, 'Ура вы победили! \nСписок результатов: ', getWindowTitlePosition());

  // draw histogram e.g. bars
  renderBars(ctx, names, times);
};
