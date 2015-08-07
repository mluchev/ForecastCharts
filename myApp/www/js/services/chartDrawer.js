angular.module('starter')
    .factory('ChartDrawer', function () {
        function drawAxes(ctx, settings) {
            var i;

            ctx.beginPath();
            ctx.moveTo(settings.xPadding, settings.yPadding);
            ctx.lineTo(settings.xPadding, settings.canvasHeight - settings.yPadding);
            ctx.lineTo(settings.canvasWidth - settings.xPadding, settings.canvasHeight - settings.yPadding);
            ctx.stroke();

            ctx.fillText('Day', settings.canvasWidth - 25, settings.canvasHeight - settings.yPadding);
            ctx.fillText('Degrees', settings.xPadding - 15, 20);

            // Draw the X value texts
            for (i = 0; i < settings.numOfDays; i++) {
                ctx.fillText(i + 1, getXPixel(i, settings),
                        settings.canvasHeight - settings.yPadding + settings.xLabelsTopPadding);
            }
            // Draw the Y value texts
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (i = 0; i < settings.maxY; i += settings.yAxisLabelsInterval) {
                ctx.fillText(i, settings.xPadding - 10, getYPixel(i, settings));
            }
        }

        function createChartSettings(ctx, chartData) {
            var settings = {
                canvasWidth: ctx.canvas.width,
                canvasHeight: ctx.canvas.height,
                numOfDays: chartData.minTemp.length,
                minTempsColor: '#5DA5DA',
                maxTempsColor: '#F15854',
                xPadding: 30,
                yPadding: 30,
                xLabelsTopPadding: 20,
                yAxisLabelsInterval: 5,
                maxY: getMaxY(chartData.maxTemp)
            };

            ctx.clearRect(0, 0, settings.canvasWidth, settings.canvasHeight);

            function getMaxY(temps) {
                var maxValue = temps[0] || 0;
                for (var i = 0; i < temps.length; i++) {
                    if (temps[i] > maxValue) {
                        maxValue = temps[i];
                    }
                }

                return maxValue;
            }

            return settings;
        }

        function drawRectangle(ctx, x, y, w, h, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }

        // Return the X for a chart item point
        function getXPixel(val, settings) {
            return ((settings.canvasWidth - 2 * settings.xPadding) / settings.numOfDays) * val + (settings.xPadding * 1.5);
        }

        // Return the Y for a chart item point
        function getYPixel(val, settings) {
            return settings.canvasHeight - (((settings.canvasHeight - 2 * settings.yPadding) / settings.maxY) * val)
                - settings.yPadding;
        }

        function drawArc(ctx, x, y, r, sAngle, eAngle, counterClockWise, color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, sAngle, eAngle, counterClockWise);
            ctx.fill();
        }

        function drawLineChart(ctx, chartData) {
            var settings = createChartSettings(ctx, chartData);

            drawAxes(ctx, settings, chartData);
            drawGraphLines(chartData.minTemp, settings.minTempsColor);
            drawGraphLines(chartData.maxTemp, settings.maxTempsColor);

            function drawGraphLines(temps, color) {
                var i;

                // draw chart lines
                ctx.beginPath();
                ctx.moveTo(getXPixel(0, settings), getYPixel(temps[0], settings));
                for (i = 1; i < temps.length; i++) {
                    ctx.lineTo(getXPixel(i, settings), getYPixel(temps[i], settings));
                }
                ctx.stroke();

                // draw chart dots
                for(i = 0; i < temps.length; i ++) {
                    drawArc(ctx, getXPixel(i, settings), getYPixel(temps[i], settings), 4, 0, Math.PI * 2, true, color);
                }
            }
        }

        function drawBarChart(ctx, chartData) {
            console.log(chartData);
            var settings = createChartSettings(ctx, chartData),
                chartHeight = settings.canvasHeight - settings.yPadding,
                oneDayBarsPadding = 3,
                barWidth = ((settings.canvasWidth - 2 * settings.xPadding) / (2 * settings.numOfDays)) - oneDayBarsPadding,
                scaleNum = (settings.canvasHeight - 2 * settings.yPadding) / settings.maxY;


            drawAxes(ctx, settings);
            drawDoubleBars(chartData, scaleNum);

            function drawDoubleBars(chartData, scaleNum) {
                var i;
                for (i = 0; i < settings.numOfDays; i++) {
                    // Write the min temperature bar to the chart
                    drawRectangle(ctx, settings.xPadding + (2 * i) * (barWidth + oneDayBarsPadding) + oneDayBarsPadding,
                        (chartHeight - chartData.minTemp[i] * scaleNum), barWidth, chartData.minTemp[i] * scaleNum,
                        settings.minTempsColor);
                    // Write the max temperature bar to the chart
                    drawRectangle(ctx, settings.xPadding + (2 * i + 1) * (barWidth + oneDayBarsPadding),
                        (chartHeight - chartData.maxTemp[i] * scaleNum), barWidth, chartData.maxTemp[i] * scaleNum,
                        settings.maxTempsColor);
                }
            }
        }

        function drawPieChart(ctx, chartData) {
            var pieChartColors = ["#DECF3F", "#FAA43A", "#F15854"],
                chartLegendHeight = 100,
                chartLegendLineHeight = 20,
                chartLegendMargin = 20,
                canvasWidth = ctx.canvas.width,
                canvasHeight = ctx.canvas.height,
                circleCenterX = canvasWidth / 2,
                circleCenterY = (canvasHeight - chartLegendHeight) / 2,
                circleRadius = circleCenterY,
                chartLegendTopY = circleCenterY + circleRadius + chartLegendMargin,
                chartLegendTextStartX = 40,
                lastЕnd = 0;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            Object.keys(chartData.weatherTypes).forEach(function (weatherType, i) {
                ctx.fillStyle = pieChartColors[i];
                ctx.beginPath();
                ctx.moveTo(circleCenterX, circleCenterY);
                ctx.arc(circleCenterX, circleCenterY, circleRadius, lastЕnd, lastЕnd +
                    (Math.PI * 2 * (chartData.weatherTypes[weatherType] / chartData.numOfDays)), false);
                ctx.lineTo(circleCenterX, circleCenterY);
                ctx.fill();
                lastЕnd += Math.PI * 2 * (chartData.weatherTypes[weatherType] / chartData.numOfDays);

                // fill chart legend
                ctx.fillRect(chartLegendMargin, chartLegendTopY + i * chartLegendLineHeight, 10, 10);
                ctx.fillText(Math.round(chartData.weatherTypes[weatherType] * 100 / chartData.numOfDays) + '% '
                    + weatherType, chartLegendTextStartX, chartLegendTopY + i * 20 + 8);
            });
        }

        return {
            drawChart: function (ctx, chartType, chartData) {
                if (!chartData) {
                    ctx.font = 'normal 20pt sans-serif';
                    ctx.fillText('Please insert input data from the Home tab, in order to draw a chart!',
                        0, ctx.canvas.width / 2, ctx.canvas.height);

                    return;
                }

                if (chartType === 'PieChart') {
                    drawPieChart(ctx, chartData);
                } else if (chartType === 'LineChart') {
                    drawLineChart(ctx, chartData);
                } else if (chartType === 'BarChart') {
                    drawBarChart(ctx, chartData);
                }
            }
        };
    });