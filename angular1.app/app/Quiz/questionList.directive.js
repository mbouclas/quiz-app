(function() {
    angular.module('mcms.quiz')
        .directive('questionList', questionList);

    questionList.$inject = ['configuration'];
    questionListController.$inject = ['$scope','quiz.service'];

    function questionList(Config) {
        return {
            require : ['questionList','^ngModel'],
            controller : questionListController,
            controllerAs : 'VM',
            templateUrl : Config.templatesDir + 'questionList.directive.html',
            scope : {
                question : '=ngModel',
                options : '=?options',
                onAnswer : '&?onAnswer'
            },
            replace : true,
            restrict : 'E',
            link : function(scope, element, attrs){

            }
        };
    }

    function questionListController($scope,Quiz) {
        var vm = _this = this;
        vm.questions = $scope.question.possible_answers;
        vm.Question = $scope.question;
        this.answerSelected = null;

        vm.setAnswer = function (answer) {
            //validate answer
            var validate = Quiz.validateAnswer(answer);
            _this.answerSelected = answer;
        }
    }


})();
