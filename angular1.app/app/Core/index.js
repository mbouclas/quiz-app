angular.module('mcms.core', []).run(run);

function run(){

}
require('./core.config');
require('./core.logger');
require('./core.services');
require('./HomeController');
