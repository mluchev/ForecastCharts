angular.module('starter')
    .controller('MainCtrl', function ($scope) {
        $scope.forecast = {
            cityName: null,
            forecastDays: null
        };
    });