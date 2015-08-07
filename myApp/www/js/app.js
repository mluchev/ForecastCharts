angular.module('starter', ['ionic'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                controller: 'MainCtrl'
            })

            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('tab.piechart', {
                url: '/pie-chart',
                views: {
                    'tab-pie-chart': {
                        templateUrl: 'templates/chart-container.html',
                        controller: 'PieChartCtrl'
                    }
                }
            })

            .state('tab.line-chart', {
                url: '/line-chart',
                views: {
                    'tab-line-chart': {
                        templateUrl: 'templates/chart-container.html',
                        controller: 'LineChartCtrl'
                    }
                }
            })

            .state('tab.bar-chart', {
                url: '/bar-chart',
                views: {
                    'tab-bar-chart': {
                        templateUrl: 'templates/chart-container.html',
                        controller: 'BarChartCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/home');
    });
