angular.module('mcms.core')
    .controller('HomeController',Controller);

Controller.$inject = ['quiz','quiz.service'];

function Controller(QuizData,Quiz){
    var vm = this;
    vm.Quiz = QuizData;
    vm.Question = vm.Quiz.questions[4];
    //vm.Question = vm.Quiz.questions[Quiz.currentQuestion];
    vm.progress = Quiz.currentQuizProgress();


    vm.answer = function () {
        vm.progress = Quiz.currentQuizProgress();
    }
}