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
        vm.boolValues = [
            {val : true,caption : 'True'},
            {val : false,caption : 'False'}
        ];

        $scope.$watch('question',function (val) {
            reset();
        });

        vm.setAnswer = function (answer) {
            if (vm.Question.question_type == 'mutiplechoice-single' || vm.Question.question_type == 'truefalse'){
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
            if (typeof _this.answerSelected == 'undefined' || _this.answerSelected == null){
                return;
            }
            //validate answer
            var validate = Quiz.validateAnswer(_this.answerSelected,vm.Question);

            if (!validate){
                //highlight correct answers
            }

            vm.submitted = true;

            if (typeof $scope.onAnswer == 'function'){
                $scope.onAnswer({result : validate });
            }
        };

        function reset() {
            vm.submitted = false;
            vm.questions = $scope.question.possible_answers;
            vm.Question = $scope.question;
            _this.answerSelected = (vm.Question.question_type == 'mutiplechoice-single' || vm.Question.question_type == 'truefalse') ? null : [];
            vm.correctQuestions = (vm.Question.question_type == 'mutiplechoice-single' || vm.Question.question_type == 'truefalse') ? [vm.Question.correct_answer] : vm.Question.correct_answer;

            $location.search('q',vm.Question.q_id);
        }
    }


})();
