angular.module('starter')
    .controller('PieChartCtrl', function ($scope, ChartDataPreprocessor) {
        $scope.chartType = 'PieChart';
        $scope.chartData = ChartDataPreprocessor.getPieChartData($scope.forecast.forecastDays);
    });