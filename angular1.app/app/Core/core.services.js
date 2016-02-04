angular.module('mcms.core')
    .factory('lodashFactory', lo)
    .factory('jQueryFactory', jquery)
    .factory('momentFactory', moment);

function lo(){
    return require('lodash');
}

function jquery(){
    return require('jquery');
}

function moment(){
    return require('moment');
}