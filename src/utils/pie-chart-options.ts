import { Sector } from "./generate-pie-sectors";

export const getChartOptions = (sectors: Sector[] | undefined, titleText: string, dimension: number = 450) => ({
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: "pie",
		height: dimension,
		width: dimension,
		backgroundColor: "#fff",
	},
	title: {
		text: titleText,
		style: {
			color: "#000",
			font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
		},
	},
	tooltip: {
		pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
	},
	accessibility: {
		point: {
			valueSuffix: "%",
		},
	},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: "pointer",
			dataLabels: {
				enabled: true,
				style: {
					fontFamily: "monospace",
					color: "#000",
				},
			},
			showInLegend: false,
		},
	},
	series: [
		{
			name: "percentage",
			colorByPoint: true,
			data: sectors,
		},
	],
	credits: {
		enabled: false,
	},
});
