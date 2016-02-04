angular.module('mcms.core')
    .controller('ResultsController',Controller);

Controller.$inject = ['results','quiz.service','$timeout','$location'];

function Controller(resultsData,Quiz,$timeout,$location){
    var vm = this;
    vm.Points = Quiz.getPoints();
    vm.Results = Quiz.processResults();

}