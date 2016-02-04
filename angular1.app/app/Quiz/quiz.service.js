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
        this.quizResults = {};
        this.totalPoints = 0;
        this.difficultyLevel = 1;
        this.quizDone = false;
        this.fetchQuiz = fetchQuiz;
        this.fetchResults = fetchResults;
        this.currentQuizProgress = currentQuizProgress;
        this.validateAnswer = validateAnswer;
        this.getPoints = getPoints;
        this.loadQuestion = loadQuestion;
        this.loadNextQuestion = loadNextQuestion;
        this.processResults = processResults;

        var Validator = {
            "mutiplechoice-single": validateSingle,
            "mutiplechoice-multiple": validateMultiple,
            "truefalse" : validateBoolean
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
                    _this.quizResults = resultData.data;
                    defer.resolve(_this.quizResults);
                })
                .catch(function (e) {
                    Log.error(e);
                    defer.reject(e);
                });

            return defer.promise;
        }

        function currentQuizProgress() {
            return _quizProgress(_this.currentQuestion);
        }

        function _quizProgress(currentQuestion) {
            if (typeof currentQuestion == 'undefined' || currentQuestion === null) {
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

                calculateTotalPoints();
                return true;
            }

            return false;
        }

        function validateSingle(answer, question) {
            return (answer.a_id == question.correct_answer);
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

        function validateBoolean(answer, question) {
            console.log(answer,question.correct_answer)
            return (answer == question.correct_answer);
        }

        function getPoints() {
            return _this.totalPoints;
        }

        function calculateTotalPoints() {
            var total = 0;
            for (var i in _this.pointsCollected){
                total = total + _this.pointsCollected[i].points;
            }

            _this.totalPoints = total;

            return total;
        }

        function loadQuestion(id) {
            if (!id){
                id = 0;
            }

            if (_this.currentQuiz.questions[id] == 'undefined'){
                Log.error('Question not found');
                return false;
            }

            _this.currentQuestion = id;
            return _this.currentQuiz.questions[id];
        }

        function loadNextQuestion() {
            if (_this.currentQuestion +1 == _this.currentQuiz.questions.length){//done
                return true;
            }

            return _this.loadQuestion(_this.currentQuestion+1);
        }

        function processResults() {
            var finalResult = {};
            _this.quizResults.results.forEach(function (result) {

               if (_this.totalPoints >= result.minpoints && _this.totalPoints <= result.maxpoints){
                   finalResult = result;
                   return result;
               }
            });

            return finalResult;
        }
    }

})();