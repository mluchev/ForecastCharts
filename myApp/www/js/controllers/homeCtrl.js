angular.module('starter')
    .controller('HomeCtrl', function ($scope, ForecastsProvider, $state, $ionicPopup) {
        $scope.queryData = {
            cityName: 'Sofia',
            numOfDays: 10
        };

        $scope.loadForecast = function () {
            if(!isValidInput()) {
                $ionicPopup.alert({
                    title: 'Invalid Input',
                    template: 'The number of days should be between 1 and 16.'
                });

                return;
            }

            ForecastsProvider.get($scope.queryData.cityName, $scope.queryData.numOfDays).then(function (forecastDays) {
                $scope.forecast.cityName = $scope.queryData.cityName;
                $scope.forecast.forecastDays = forecastDays;

                $state.go('tab.piechart');
            });
        };

        function isValidInput() {
            return ($scope.queryData.numOfDays > 0 && $scope.queryData.numOfDays < 17);
        }

    });