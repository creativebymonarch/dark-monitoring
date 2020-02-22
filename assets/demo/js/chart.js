<!-- Linear Chart Settings -->
am4core.ready(function() {
// Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
    var chart = am4core.create("linear_chart_id_for_amchart", am4charts.XYChart);
    chart.language.locale = am4lang_fr_FR;
    /* Add legend */
    chart.legend = new am4charts.Legend();
    chart.legend.fontSize = 12;
// Add data
    chart.data = [
        {
            "date" : "2020-01",
            "data1" : "7",
            "data2" : "1"
        },
        {
            "date" : "2020-02",
            "data1" : "10",
            "data2" : "4"
        },
        {
            "date" : "2020-03",
            "data1" : "14",
            "data2" : "9"
        },
        {
            "date" : "2020-04",
            "data1" : "15",
            "data2" : "10"
        },
        {
            "date" : "2020-05",
            "data1" : "16",
            "data2" : "11"
        },
        {
            "date" : "2020-06",
            "data1" : "18",
            "data2" : "10"
        },
        {
            "date" : "2020-07",
            "data1" : "21",
            "data2" : "12"
        },
        {
            "date" : "2020-08",
            "data1" : "20",
            "data2" : "10"
        },
        {
            "date" : "2020-09",
            "data1" : "24",
            "data2" : "16"
        },
        {
            "date" : "2020-10",
            "data1" : "20",
            "data2" : "8"
        },
        {
            "date" : "2020-11",
            "data1" : "21",
            "data2" : "10"
        },
        {
            "date" : "2020-12",
            "data1" : "24",
            "data2" : "14"
        }
    ];
// Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        //dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;
        dateAxis.renderer.labels.template.fontSize = 12;
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        //valueAxis.logarithmic = true;
        valueAxis.renderer.minGridDistance = 20;
        valueAxis.renderer.labels.template.fontSize = 12;
// Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "data1";
        series.dataFields.dateX = "date";
        series.tensionX = 0.8;
        series.strokeWidth = 3;
        series.stroke = am4core.color("#9499ff");
        series.tooltipText = "{data1}";
        series.minBulletDistance = 15;
        series.legendSettings.labelText = "Dataset 1";

        var companies = chart.series.push(new am4charts.LineSeries());
        companies.dataFields.valueY = "data2";
        companies.dataFields.dateX = "date";
        companies.tensionX = 0.8;
        companies.strokeWidth = 3;
        companies.stroke = am4core.color("#ff7a95");
        companies.tooltipText = "{data2}";
        companies.minBulletDistance = 15;
        companies.legendSettings.labelText = "Dataset 2";
        companies.legendSettings.fontSize = 12;

        var axisTooltip = dateAxis.tooltip;
        axisTooltip.background.fill = am4core.color("#5755d9");
        axisTooltip.background.strokeWidth = 0;
        axisTooltip.background.cornerRadius = 3;
        axisTooltip.background.pointerLength = 0;
        axisTooltip.dy = 5;

        var interBullet  = series.bullets.push(new am4charts.CircleBullet());
        var reportBullet = companies.bullets.push(new am4charts.CircleBullet());
        interBullet.circle.fill = am4core.color("#070507");
        interBullet.circle.strokeWidth = 2;
        interBullet.circle.radius = 4;
        reportBullet.circle.fill = am4core.color("#070507");
        reportBullet.circle.strokeWidth = 2;
        reportBullet.circle.radius = 4;

        var interBullethover  = interBullet.states.create("hover");
        var reportBullethover = reportBullet.states.create("hover");
        interBullethover.properties.scale = 1.3;
        reportBullethover.properties.scale = 1.3;

        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        valueAxis.cursorTooltipEnabled = false;
        chart.cursor.lineY.disabled = true;
        chart.cursor.lineX.disabled = true;
        chart.cursor.behavior = "none";

        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 5;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#5755d9");
        series.tooltip.label.fill = am4core.color("#fff");
        series.tooltip.stroke = am4core.color("#fff");
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";

        // Drop-shaped tooltips
        companies.tooltip.background.cornerRadius = 5;
        companies.tooltip.background.strokeOpacity = 0;
        companies.tooltip.getFillFromObject = false;
        companies.tooltip.background.fill = am4core.color("#ff5f7f");
        companies.tooltip.label.fill = am4core.color("#fff");
        companies.tooltip.stroke = am4core.color("#fff");
        companies.tooltip.pointerOrientation = "vertical";
        companies.tooltip.label.minWidth = 40;
        companies.tooltip.label.minHeight = 40;
        companies.tooltip.label.textAlign = "middle";
        companies.tooltip.label.textValign = "middle";

    }); // end am4core.ready()