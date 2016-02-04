angular.module('mcms.core')
    .controller('HomeController',Controller);

Controller.$inject = ['quiz','quiz.service'];

function Controller(QuizData,Quiz){
    var vm = this;
    vm.progress = 0;
    vm.Quiz = QuizData;
    vm.Question = vm.Quiz.questions[Quiz.currentQuestion];


    vm.answer = function () {
        vm.progress = Quiz.currentQuizProgress();
    }
}