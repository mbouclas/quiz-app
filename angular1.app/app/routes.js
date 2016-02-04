angular.module('mcms')
    .config(config);

config.$inject = ['configuration', '$routeProvider'];

function config(Config, $routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: Config.templatesDir + 'quiz-page.html',
            controller: 'QuizController',
            controllerAs: 'VM',
            resolve: {
                quiz: ["quiz.service", function (Mock) {
                    return Mock.fetchQuiz();
                }]
            },
            reloadOnSearch: false,
            name: 'home'
        })
        .when('/results', {
            templateUrl: Config.templatesDir + 'result-page.html',
            controller: 'ResultsController',
            controllerAs: 'VM',
            resolve: {
                results: ["quiz.service", function (Mock) {
                    return Mock.fetchResults();
                }]
            },
            name: 'results'
        })
        .otherwise('/');

}
