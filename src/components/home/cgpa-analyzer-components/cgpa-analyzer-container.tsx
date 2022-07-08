import { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { getChartOptions } from "../../../utils/line-chart-options";
import { STRING_IS_INT, STRING_IS_DECIMAL, FIND_AVERAGE } from "../../../utils/constants";
import BasicBtn from "../../reusable/basic-btn";
import "./cgpa-analyzer-container.css";

const AnalyzerContainer = () => {
	const [gpaInputValue, setGpaInputValue] = useState("");
	const [cgpaInputValue, setCgpaInputValue] = useState("");
	const [gpaSeries, setGpaSeries] = useState<number[]>([3, 3.5, 2.78]);
	const [cgpaSeries, setCgpaSeries] = useState<number[]>([3, 3.25, 3.09]);
	const [autoMode, setAutoMode] = useState(true);
	const [plotBtnStatus, setPlotBtnStatus] = useState(false);

	const validateGpaInput = (): boolean => {
		const values = gpaInputValue.split(",").map((e) => e.trim());

		for (const value of values) {
			if (!(STRING_IS_INT(value) || STRING_IS_DECIMAL(value)) || value === "") return false;
		}

		return true;
	};

	const handleClick = () => {
		if (!validateGpaInput()) return;

		const values = gpaInputValue.split(",").map((e) => e.trim());

		const newGpaSeries = [];
		for (const value of values) newGpaSeries.push(+value);

		setGpaSeries(newGpaSeries);
		setGpaInputValue(values.join(", "));

		handleCgpaValue(newGpaSeries);
	};

	const handleCgpaValue = (series: number[]) => {
		if (autoMode) {
			const newCgpaSeries = generateCgpaSeries(series);
			setCgpaSeries(newCgpaSeries);
			setCgpaInputValue(newCgpaSeries.map((e) => ` ${e.toFixed(2)}`).toString());
		} else {
			const values = cgpaInputValue.split(",").map((e) => e.trim());
			const newSeries = [];
			for (const value of values) {
				if (!(STRING_IS_INT(value) || STRING_IS_DECIMAL(value)) || value === "") return;
				newSeries.push(+value);
			}
			setCgpaSeries(newSeries);
		}
	};

	const generateCgpaSeries = (series: number[]): number[] => {
		const newSeries = [];
		for (let currentIndex = 0; currentIndex < series.length; currentIndex++) {
			const range = [];
			for (let iter = 0; iter <= currentIndex; iter++) {
				range.push(series[iter]);
			}

			newSeries.push(FIND_AVERAGE(range));
		}

		return newSeries;
	};

	return (
		<div id="analyzer-container">
			<div id="analyzer-header">CGPA Analyzer</div>
			<div id="analyzer-main">
				<HighchartsReact
					highcharts={Highcharts}
					options={getChartOptions(gpaSeries, cgpaSeries)}
				/>
			</div>

			<div id="analyzer-footer">
				<label htmlFor="gpa-series">Enter your GPA series for each semester:</label>
				<input
					type="text"
					placeholder="E.g. 3.00, 3.50, 2.78"
					name="gpa-series"
					onChange={(e) => {
						setGpaInputValue(e.currentTarget.value);
					}}
					value={gpaInputValue}
					className="basic-input"
				/>
				<label htmlFor="cgpa-series">
					Your CGPA series (Autogenerate:
					<input
						type="checkbox"
						checked={autoMode}
						onChange={() => {
							setAutoMode((val) => !val);
							const newCgpaSeries = generateCgpaSeries(gpaSeries);
							setCgpaSeries(newCgpaSeries);
							setCgpaInputValue(
								newCgpaSeries.map((e) => ` ${e.toFixed(2)}`).toString()
							);
						}}
					/>
					)
				</label>
				<input
					type="text"
					placeholder={autoMode ? "-AUTO-" : "E.g. 2.11, 2.62, 2.76, 2.89"}
					name="cgpa-series"
					value={cgpaInputValue}
					onInput={(e) => {
						if (!autoMode) setCgpaInputValue(e.currentTarget.value);
					}}
					className="basic-input"
				/>

				<div id="analyzer-btn-wrapper">
					<BasicBtn
						action={handleClick}
						content="Plot graph"
						onHover={() => {
							if (validateGpaInput())
								!plotBtnStatus && setPlotBtnStatus(true);
							else plotBtnStatus && setPlotBtnStatus(false);
						}}
						isClickable={plotBtnStatus}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnalyzerContainer;

/*<input
					type="file"
					id="docpicker"
					accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
					onChange={(e) => {
						console.log(JSON.stringify(e.currentTarget.files?.item(0)?.size));
					}}
				/>*/
