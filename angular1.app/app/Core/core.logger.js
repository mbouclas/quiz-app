angular.module('mcms.core')
    .service('logger',logger);

logger.$inject = ['$log'];

function logger($log) {
    return {
        info : info,
        error : error,
        success : success,
        warning : warning,
        log     : $log.log
    };


    function info(message,data){
        $log.info('Info : ' + message,data || '');
    }

    function error(message,data){
        $log.error('Error : ' + message,data || '');
    }

    function success(message,data){
        $log.success('Success : ' + message,data || '');
    }

    function warning(message,data){
        $log.warning('Warning : ' + message,data || '');
    }
}