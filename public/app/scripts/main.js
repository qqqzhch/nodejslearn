require.config({
    baseUrl: '/public/app/',
    paths: {
        angular: 'vender/angular',
        jquery: 'vender/jquery',
        domReady: 'vender/domReady',
        uibootstrap: 'vender/uibootstrap',
        angularResource: 'vender/angular-resource',
        angularRoute: 'vender/angular-route'
    },
    shim: {
        'uibootstrap': {
            deps: ['jquery']
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angularResource': {
            deps: ['angular']
        },
        'angularRoute': {
            deps: ['angular']
        }

    }
})

require(['angular', 'scripts/app',
        'scripts/controllers/PhoneDetailCtrl',
        'scripts/controllers/PhoneListCtrl',
        'domReady',
        'angularRoute'
    ],
    function(angular, app, PhoneDetailCtrl, PhoneListCtrl, domReady) {
        'use strict'
      
        domReady(
            function() {
                $('html').attr('ng-app','phonecat')//ng-app="phonecat"
                app.
                config(['$routeProvider',
                    function($routeProvider) {
                        $routeProvider.
                        when('/phones', {
                            templateUrl: '/public/html/phone-list.html',
                            controller: PhoneListCtrl
                        }).
                        when('/phones/:phoneId', {
                            templateUrl: '/public/html/phone-detail.html',
                            controller: PhoneDetailCtrl
                        }).
                        otherwise({
                            redirectTo: '/phones'
                        });
                    }
                ])
                angular.bootstrap(document,['phonecat'])
            }
            )
        


    })