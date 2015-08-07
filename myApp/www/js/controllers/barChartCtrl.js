angular.module('starter')
    .controller('BarChartCtrl', function ($scope, ChartDataPreprocessor) {
        $scope.chartType = 'BarChart';
        $scope.chartData = ChartDataPreprocessor.getLineOrBarChartData($scope.forecast.forecastDays);
    });
