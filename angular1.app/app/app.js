angular.module('mcms', [
        'ngRoute',
        'mcms.core',
        'mcms.quiz',
        'mcms.components'
    ])
    .config(appConfig);

appConfig.$inject = ['$compileProvider'];

function appConfig($compileProvider){
    $compileProvider.debugInfoEnabled(true);
}

require('./routes');
require('./Core');
require('./Components');
require('./Quiz');