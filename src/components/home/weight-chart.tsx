import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { getChartOptions } from "../../utils/pie-chart-options";
import { Sector } from "../../utils/generate-pie-sectors";
import CloseButton from "../../assets/svg/close-button";
import "./weight-chart.css";

interface SectorProp {
	sectors: Sector[] | undefined;
	setChartVisibility: Function;
	semesterIndex: number;
}

export const WeightChart = ({ sectors, setChartVisibility, semesterIndex }: SectorProp) => (
	<div id="weight-chart-wrapper">
		<div id="weight-chart-wrapper-2">
			<div id="weight-chart-centered">
				<div id="weight-chart-close-btn" onClick={() => setChartVisibility()}>
					<CloseButton />
				</div>
				<HighchartsReact
					highcharts={Highcharts}
					options={getChartOptions(
						sectors,
						`Weight chart for semester #${semesterIndex + 1}`
					)}
				/>
			</div>
		</div>
	</div>
);
