(function () {
  'use strict';

  var core = angular.module('mcms.core');
  var assetsUrl = '/assets/',
    appUrl = '/app/',
    componentsUrl = appUrl + 'Components/';

  var config = {
    apiUrl: '/api/',
    imageBasePath: assetsUrl + 'img',
    templatesDir: appUrl + 'templates/',
    appUrl: appUrl,
    componentsUrl: componentsUrl,
    mockDataUrl : appUrl + 'data/',
    defaultQuizId : 12
  };

  core.value('config', config);
  core.constant('configuration', config);
})();
