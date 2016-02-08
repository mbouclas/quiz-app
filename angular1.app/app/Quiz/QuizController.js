angular.module('mcms.core')
    .controller('QuizController',Controller);

Controller.$inject = ['quiz','quiz.service','$timeout','$location'];

function Controller(QuizData,Quiz,$timeout,$location){
    var vm = this;
    vm.Quiz = QuizData;
    vm.Question = Quiz.loadQuestion();
    vm.progress = Quiz.currentQuizProgress();
    vm.Points = Quiz.getPoints();

    vm.onAnswer = function (result) {
        vm.progress = Quiz.currentQuizProgress();
        vm.Points = Quiz.getPoints();
        vm.result = result;
        $timeout(function () {
            vm.result = null;
            //load next question
            vm.Question = Quiz.loadNextQuestion();
            if (vm.Question === true){//all done
                Quiz.done = true;
                Quiz.submitted = true;
                $location.path('/results');
                return;
            }
            vm.progress = Quiz.currentQuizProgress();
        },3000);
    }
}