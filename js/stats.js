'use strict';
var CLOUD = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = -150;
var FONT_GAP = 16;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.WIDTH, CLOUD.HEIGHT);
};

var getMaxElement = function (numbers) {
  return Math.max.apply(null, numbers);
};

var getRandomValue = function () {
  return Math.floor(Math.random() * (100 - 10)) + 10;
};

var getBarColor = function (ctx, currentPlayer) {
  if (currentPlayer !== 'Вы') {
    ctx.fillStyle = 'hsl(240, ' + getRandomValue() + '%, 40%)';
  } else {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD.X + GAP, CLOUD.Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD.X, CLOUD.Y, 'white');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', CLOUD.X + GAP * 3, CLOUD.Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD.X + GAP * 3, CLOUD.Y + GAP * 5);
  ctx.font = '12px PT Mono';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], CLOUD.X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD.HEIGHT);
    ctx.fillText(Math.round(times[i]), CLOUD.X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD.HEIGHT - GAP * 3 + (BAR_HEIGHT * times[i]) / maxTime);
    getBarColor(ctx, names[i]);
    ctx.fillRect(CLOUD.X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD.HEIGHT - GAP * 0.5 - FONT_GAP, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};
