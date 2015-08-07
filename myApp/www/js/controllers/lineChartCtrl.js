angular.module('starter')
    .controller('LineChartCtrl', function ($scope, ChartDataPreprocessor) {
        $scope.chartType = 'LineChart';
        $scope.chartData = ChartDataPreprocessor.getLineOrBarChartData($scope.forecast.forecastDays);
        console.log($scope.chartData);
    });
