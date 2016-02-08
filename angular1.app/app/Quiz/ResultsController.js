angular.module('mcms.core')
    .controller('ResultsController',Controller);

Controller.$inject = ['results','quiz.service','$location'];

function Controller(resultsData,Quiz,$location){
    var vm = this;

    if (!Quiz.submitted){
        $location.path('/');
        return;
    }

    vm.Points = Quiz.getPoints();
    vm.Results = Quiz.processResults();

}