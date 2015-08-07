angular.module('starter')
    .factory('ForecastsProvider', function ($http, $q) {
        function cacheForecast(cityName, forecastList) {
            localStorage.setItem(cityName, JSON.stringify({
                dateOfCaching: new Date().setHours(0, 0, 0, 0),
                forecastList: forecastList
            }));
        }

        function getCachedForecast(cityName, numOfDays) {
            var cachedForecast = JSON.parse(localStorage.getItem(cityName)),
                daysPassedFromLastCache;

            if (cachedForecast && cachedForecast.forecastList) {
                daysPassedFromLastCache =
                    Math.floor((new Date() - cachedForecast.dateOfCaching) / (1000 * 3600 * 24));

                if (cachedForecast.forecastList.length - daysPassedFromLastCache >= numOfDays) {
                    return cachedForecast.forecastList.slice(daysPassedFromLastCache, numOfDays);
                }
            }
        }

        return {
            get: function(cityName, numOfDays) {
                var deferred = $q.defer(),
                    cachedForecast = getCachedForecast(cityName, numOfDays);

                if (cachedForecast) {
                    deferred.resolve(cachedForecast);
                } else {
                    $http.get('http://api.openweathermap.org/data/2.5/forecast/daily',
                        {
                            params: {
                                q: cityName,
                                mode: 'json',
                                units: 'metric',
                                cnt: numOfDays
                            }
                        })
                        .success(function (forecast) {
                            cacheForecast(cityName, forecast.list);
                            deferred.resolve(forecast.list);
                        });
                }

                return deferred.promise;
            }
        };
    });
