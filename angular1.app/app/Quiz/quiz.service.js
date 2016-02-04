(function () {
    'use strict';
    angular.module('mcms.quiz')
        .service('quiz.service', Service);

    Service.$inject = ['$http','$q','logger','lodashFactory','configuration'];

    function Service($http,$q,Log,lo,Config) {
        var _this = this;
        this.currentQuiz = {};
        this.currentQuestion = 0;
        this.fetchQuiz = fetchQuiz;
        this.fetchResults = fetchResults;
        this.currentQuizProgress = currentQuizProgress;
        this.validateAnswer = validateAnswer;

        function fetchQuiz(quizId) {
            if (!quizId){
                quizId = Config.defaultQuizId;
            }
            var defer = $q.defer();
            $http.get(Config.mockDataUrl + 'quiz-' + quizId + '.json')
                .then(function (quizData) {
                    _this.currentQuiz = quizData.data;
                    _this.currentQuestion = 0;//reset
                    defer.resolve(_this.currentQuiz);
                })
                .catch(function (e) {
                    Log.error(e);
                    defer.reject(e);
                });

            return defer.promise;
        }

        function fetchResults(quizId) {
            if (!quizId){
                quizId = Config.defaultQuizId;
            }
            var defer = $q.defer();
            $http.get(Config.mockDataUrl + 'results-' + quizId + '.json')
                .then(function (resultData) {
                    defer.resolve(resultData.data);
                })
                .catch(function (e) {
                    Log.error(e);
                    defer.reject(e);
                });

            return defer.promise;
        }

        function currentQuizProgress() {
            return _quizProgress(_this.currentQuestion+1);
        }

        function _quizProgress(currentQuestion) {
            if (!currentQuestion){ return; }
            return parseInt((currentQuestion/_this.currentQuiz.questions.length) * 100);
        }

        function validateAnswer(answer) {

        }
    }

})();