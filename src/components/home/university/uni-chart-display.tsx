import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Table from "../../../utils/structures/table";
import { getChartOptions } from "../../../utils/pie-chart-options";
import { FOUR_POINT_SCALE_BOUNDARIES, FIVE_POINT_SCALE_BOUNDARIES } from "../../../utils/constants";

interface props {
	table: Table;
	gradingScale: Map<string, number>;
}

interface boundaryType {
	firstClass: {
		lower: number;
		upper: number;
	};
	secondClassUpper: {
		lower: number;
		upper: number;
	};
	secondClassLower: {
		lower: number;
		upper: number;
	};
	thirdClass: {
		lower: number;
		upper: number;
	};
	pass: {
		lower: number;
		upper: number;
	};
}

const generateSectors = (table: Table, scaleBoundaries: boundaryType) => {
	const sectors = [
		{
			name: "First class",
			y: 0,
			color: "#0a0",
		},
		{
			name: "Second class upper",
			y: 0,
			color: "#aa0",
		},
		{
			name: "Second class lower",
			y: 0,
			color: "#444",
		},
		{
			name: "Third class",
			y: 0,
			color: "#a00",
		},
		{
			name: "Pass",
			y: 0,
			color: "#f00",
		},
	];

	table.forEachRow(({ gpa }) => {
		if (gpa < scaleBoundaries.pass.upper) sectors[4].y++;
		else if (gpa < scaleBoundaries.thirdClass.upper) sectors[3].y++;
		else if (gpa < scaleBoundaries.secondClassLower.upper) sectors[2].y++;
		else if (gpa < scaleBoundaries.secondClassUpper.upper) sectors[1].y++;
		else if (gpa <= scaleBoundaries.firstClass.upper) sectors[0].y++;
	});

	return sectors;
};

const UniChart = ({ table, gradingScale }: props) => {
	const scaleBoundaries = gradingScale.size === 5 ? FOUR_POINT_SCALE_BOUNDARIES : FIVE_POINT_SCALE_BOUNDARIES;
	return (
		<div id="uni-chart">
			<div id="uni-chart-main">
				<div id="uni-chart-wrapper">
					<HighchartsReact
						highcharts={Highcharts}
						options={getChartOptions(
							generateSectors(table, scaleBoundaries),
							"A grade-class chart",
							600
						)}
					/>
				</div>
			</div>

			<div id="uni-chart-footer">
				<div>Students: {table.rows.length}</div>
				<div>
					First class :{" "}
					{table.filter((row) => row.gpa >= scaleBoundaries.firstClass.lower).length}
				</div>
				<div>
					Second class upper :{" "}
					{
						table.filter(
							(row) =>
								row.gpa >= scaleBoundaries.secondClassUpper.lower &&
								row.gpa < scaleBoundaries.secondClassUpper.upper
						).length
					}
				</div>
				<div>
					Second class lower:{" "}
					{
						table.filter(
							(row) =>
								row.gpa >= scaleBoundaries.secondClassLower.lower &&
								row.gpa < scaleBoundaries.secondClassLower.upper
						).length
					}
				</div>
				<div>
					Third class :{" "}
					{
						table.filter(
							(row) =>
								row.gpa >= scaleBoundaries.thirdClass.lower &&
								row.gpa < scaleBoundaries.thirdClass.upper
						).length
					}
				</div>
				<div>Pass : {table.filter((row) => row.gpa < scaleBoundaries.pass.upper).length}</div>
			</div>
		</div>
	);
};

export default UniChart;
