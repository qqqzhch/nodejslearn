define(['angular',
	'scripts/filters/phonecatFilters',
    'scripts/servers/phonecatServices'
], function(angular) {
    return angular.module('phonecat', ['ngRoute', 'phonecatFilters', 'phonecatServices']);
})