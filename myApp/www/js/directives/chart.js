angular.module('starter')
    .directive('chart', ['ChartDrawer', function (ChartDrawer) {
        return {
            restrict: 'E',
            scope: {
                chartData: '&',
                chartType: '&'
            },
            templateUrl: './templates/chart.html',
            link: function (scope, elem) {
                ChartDrawer.drawChart(elem.find('canvas')[0].getContext("2d"), scope.chartType(), scope.chartData());
            }}
    }]);