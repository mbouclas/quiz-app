angular.module('mcms')
    .config(config);

config.$inject = ['configuration', '$routeProvider'];

function config(Config, $routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: Config.templatesDir + 'front-page.html',
            controller: 'HomeController',
            controllerAs: 'VM',
            resolve: {
                quiz: ["quiz.service", function (Mock) {
                    return Mock.fetchQuiz();
                }]
            },
            name: 'home'
        })
        .otherwise('/');

}
