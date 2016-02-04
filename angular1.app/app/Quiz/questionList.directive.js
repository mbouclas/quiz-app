(function() {
    angular.module('mcms.quiz')
        .directive('questionList', questionList);

    questionList.$inject = ['configuration'];
    questionListController.$inject = ['$scope','quiz.service','$location'];

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

    function questionListController($scope,Quiz,$location) {
        var vm = _this = this;

        reset();

        vm.setAnswer = function (answer) {
            if (vm.Question.question_type == 'mutiplechoice-single'){
                _this.answerSelected = answer;
                return;
            }

            if (_this.answerSelected.indexOf(answer) != -1){
                _this.answerSelected.splice(_this.answerSelected.indexOf(answer),1);
                return;
            }

            _this.answerSelected.push(answer);
        };

        vm.answerQuestion = function () {
            if (!_this.answerSelected){
                return;
            }
            //validate answer
            var validate = Quiz.validateAnswer(_this.answerSelected,vm.Question);
            console.log(validate);
            if (!validate){

            }
        };

        function reset() {
            vm.questions = $scope.question.possible_answers;
            vm.Question = $scope.question;
            _this.answerSelected = (vm.Question.question_type == 'mutiplechoice-single') ? null : [];
            $location.search('q',vm.Question.q_id);
        }
    }


})();
