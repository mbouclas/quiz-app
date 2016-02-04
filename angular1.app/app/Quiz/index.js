(function () {
    'use strict';
    angular.module('mcms.quiz', []);

    require('./quiz.service');
    require('./questionList.directive');
    require('./QuizController');
    require('./ResultsController');

})();