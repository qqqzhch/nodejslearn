define(['angular',
    'domReady',
    ],
    function (angular,$,domReady) {
        'use strict'
        domReady(angular.bootstrap(document,['phonecat']));

    })