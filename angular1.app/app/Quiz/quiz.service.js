(function () {
    'use strict';
    angular.module('mcms.quiz')
        .service('quiz.service', Service);

    Service.$inject = ['$http', '$q', 'logger', 'lodashFactory', 'configuration'];

    function Service($http, $q, Log, lo, Config) {
        var _this = this;
        this.currentQuiz = {};
        this.currentQuestion = 0;
        this.pointsCollected = [];
        this.totalPoints = 0;
        this.difficultyLevel = 1;
        this.fetchQuiz = fetchQuiz;
        this.fetchResults = fetchResults;
        this.currentQuizProgress = currentQuizProgress;
        this.validateAnswer = validateAnswer;

        var Validator = {
            "mutiplechoice-single": validateSingle,
            "mutiplechoice-multiple": validateMultiple
        };

        function fetchQuiz(quizId) {
            if (!quizId) {
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
            if (!quizId) {
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
            return _quizProgress(_this.currentQuestion + 1);
        }

        function _quizProgress(currentQuestion) {
            if (!currentQuestion) {
                return;
            }
            return parseInt((currentQuestion / _this.currentQuiz.questions.length) * 100);
        }

        function validateAnswer(answer, question) {
            //correct
            if (Validator[question.question_type](answer, question)) {
                //add the points if this question has not been answered already
                if (!lo.find(_this.pointsCollected,{id : answer.a_id})){
                    _this.pointsCollected.push({
                        id: answer.a_id,
                        points: question.points
                    });
                }

                return true;
            }

            return false;
        }

        function validateSingle(answer, question) {
            return (answer.a_id == question.correct_answer) ? true : false;
        }

        function validateMultiple(answer, question) {
            var res = false,
                foundCount = 0;

            lo.forEach(answer, function (item) {
                if (question.correct_answer.indexOf(item.a_id) != -1) {
                    foundCount++;
                }
            });

            return (foundCount == question.correct_answer.length);
        }
    }

})();