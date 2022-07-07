export const getChartOptions = (gpaSeries: number[], cgpaSeries: number[]) => ({
	chart: {
		width: 600,
		backgroundColor: "#fff",
	},
	title: {
		text: "Your gpa graph plotted against your cgpa graph",
		style: {
			color: "#333",
			font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
		},
	},

	yAxis: {
		title: {
			text: "GPA (Grade Point Average)",
			style: {
				color: "#444",
				font: "bold 16px  sans-serif",
			},
		},
		labels: {
			style: {
				color: "#000",
				font: "14px Trebuchet MS, Verdana, sans-serif",
			},
		},
	},

	xAxis: {
		accessibility: {
			rangeDescription: "Range: 1 to 10",
		},

		labels: {
			style: {
				color: "#000",
				font: "14px Trebuchet MS, Verdana, sans-serif",
			},
		},
		title: {
			style: {
				color: "#444",
				font: "bold 14px  sans-serif",
			},
			text: "Semesters",
		},
	},

	legend: {
		backgroundColor: "white",
		borderRadius: 10,
	},

	plotOptions: {
		series: {
			label: {
				connectorAllowed: false,
			},
			pointStart: 1,
		},
	},

	series: [
		{
			name: "GPA graph",
			color: "#900",
			data: gpaSeries.length ? gpaSeries : [0],
		},
		{
			name: "CGPA graph",
			color: "#090",
			data: cgpaSeries.length ? cgpaSeries : [0],
		},
	],
	credits: {
		enabled: false,
	},
});
