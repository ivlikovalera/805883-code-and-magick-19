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
  'Ирвинг',
];

var COATS_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

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

document.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var form = setup.querySelector('.setup-wizard-form');
var wizardNameArea = form.querySelector('.setup-user-name');
var saveButton = form.querySelector('.setup-submit');
var setupWizard = form.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireball = form.querySelector('.setup-fireball-wrap');
var setupWizardFireballArea = setupWizardFireball.querySelector('input');

setupOpen.querySelector('img').tabIndex = 0;
setupClose.tabIndex = 0;

wizardNameArea.minLength = 2;

var formCancelSubmitHandler = function () {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
};

var formSubmitHandler = function () {
  form.action = 'https://js.dump.academy/code-and-magick';
  form.submit();
};

wizardNameArea.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    evt.preventDefault();
  }
});

saveButton.addEventListener('click', formSubmitHandler);
saveButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    formSubmitHandler();
  }
});

var escapePopupHandler = function (evt) {
  if ((evt.key === ESC_KEY) && (evt.target !== wizardNameArea)) {
    closePopup();
  }
};

var closePopupHandler = function () {
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      closePopup();
    }
  });
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', escapePopupHandler);
  setupClose.addEventListener('focus', closePopupHandler, true);
  formCancelSubmitHandler();
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', escapePopupHandler);
  setupClose.removeEventListener('focus', closePopupHandler, true);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupWizardCoat.style.cursor = 'pointer';
setupWizardEyes.style.cursor = 'pointer';
setupWizardFireball.style.cursor = 'pointer';

setupWizardCoat.addEventListener('click', function () {
  setupWizardCoat.style.fill = COATS_COLORS[getRandomInt(0, COATS_COLORS.length)];
});

setupWizardEyes.addEventListener('click', function () {
  setupWizardEyes.style.fill = EYES_COLORS[getRandomInt(0, EYES_COLORS.length)];
});

setupWizardFireball.addEventListener('click', function () {
  var fireballColor = FIREBALL_COLORS[getRandomInt(0, FIREBALL_COLORS.length)];
  setupWizardFireball.style.backgroundColor = fireballColor;
  setupWizardFireballArea.value = fireballColor;
});

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

