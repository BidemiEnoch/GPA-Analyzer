import UniExcelInput from "./uni-excel-input";
import { useState } from "react";
import UniChart from "./uni-chart-display";
import Table from "../../../utils/structures/table";
import "./university-container.css";

interface props {
	gradingScale: Map<string, number>;
}
/*
const table = new Table(["level", "gpa"], "gpa");

const contents = [];

for (let i = 0; i < 100; i++) {
	const val = Math.random() * 4;
	const level = Math.floor(Math.random() * 400);
	contents.push([level, val]);
}

table.setContents(contents);
*/
const UniContainer = ({ gradingScale }: props) => {
	const [excelTable, setExcelTable] = useState<Table>();

	const handleExcelData = (data: [][]) => {
		try {
			const table = new Table(data[0], "GPA");
			table.setContents(data.slice(1));
			setExcelTable(table);
		} catch (err) {
			alert(err);
		}
	};

	return (
		<div id="university-container">
			<div id="university-container-header">
				Grade class percentage
				<div id="university-header-icon" />
			</div>
			{excelTable ? (
				<UniChart table={excelTable} gradingScale={gradingScale} />
			) : (
				<UniExcelInput handleExcelData={handleExcelData} />
			)}
		</div>
	);
};

export default UniContainer;
