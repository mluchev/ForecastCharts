angular.module('starter')
    .factory('ChartDataPreprocessor', function () {
        return {
            getPieChartData: function (forecastDays) {
                var chartData;

                if (!forecastDays) {
                    return;
                }

                chartData = {
                    weatherTypes: {},
                    numOfDays: forecastDays.length
                };

                forecastDays.forEach(function (day) {
                    chartData.weatherTypes[day.weather[0].main] = chartData.weatherTypes[day.weather[0].main] || 0;
                    chartData.weatherTypes[day.weather[0].main]++;
                });

                return chartData;
            },

            getLineOrBarChartData: function (forecastDays) {
                var chartData;

                if (!forecastDays) {
                    return;
                }
                chartData = {
                    minTemp: [],
                    maxTemp: []
                };

                forecastDays.forEach(function (day) {
                    chartData.minTemp.push(day.temp.min);
                    chartData.maxTemp.push(day.temp.max);
                });

                return chartData;
            }
        }
    });
