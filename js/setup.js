'use strict';

var FIRST_NAMES = [
  'Иван ',
  'Хуан Себастьян ',
  'Мария ',
  'Кристоф ',
  'Виктор ',
  'Юлия ',
  'Люпита ',
  'Вашингтон '
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COATS_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getShuffleArray = function (values) {
  for (var i = values.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  return values;
};

var getListCharacters = function (count) {
  var listCharacters = [];
  FIRST_NAMES = getShuffleArray(FIRST_NAMES);
  LAST_NAMES = getShuffleArray(LAST_NAMES);
  COATS_COLORS = getShuffleArray(COATS_COLORS);
  EYES_COLORS = getShuffleArray(EYES_COLORS);

  for (var i = 0; i < count; i++) {
    listCharacters[i] =
    {
      name: FIRST_NAMES[getRandomInt(0, FIRST_NAMES.length)]
      + LAST_NAMES[getRandomInt(0, LAST_NAMES.length)],
      coatColor: COATS_COLORS[getRandomInt(0, COATS_COLORS.length)],
      eyesColor: EYES_COLORS[getRandomInt(0, EYES_COLORS.length)],
    };
  }
  return listCharacters;
};

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var listElement = document.querySelector('.setup-similar-list');

var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var makeFiledFragment = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

var fragment = makeFiledFragment(getListCharacters(4));
listElement.appendChild(fragment);
