import { useEffect, useRef, useState } from "react";
import { Semester, SemesterUI } from "./semester";
import { WeightChart } from "./weight-chart";
import { CourseData } from "./course";
import { isValidCGPA, computeCGPA } from "../../utils/compute-gpa";
import { generateSectors, Sector } from "../../utils/generate-pie-sectors";
//import ProgressArray from "../../utils/structures/progressArray";
import "./semester-container.css";

interface props {
	gradingScale: Map<string, number>;
}

const SemesterContainer = ({ gradingScale }: props) => {
	const [semesters, setSemesters] = useState(new Array(new Semester()));
	const [cgpa, setCGPA] = useState("---");
	const [tqp, setTQP] = useState<string>("---");
	const [tcu, setTCU] = useState<string>("---");
	const [sectors, setSectors] = useState<Sector[]>();
	const [chartVisibility, setChartVisibility] = useState(false);
	const [chartSemesterIndex, setChartSemesterIndex] = useState(0);
	const lastAction = useRef<"semester-deleted" | "semester-added">();
	const semesterInterfaceHeight = 360;

	const addSemester = () => {
		if (semesters.length === 12) return;
		semesters.push(new Semester());
		setSemesters(Object.assign([], semesters));
		lastAction.current = "semester-added";
	};

	useEffect(() => {
		if (lastAction.current === "semester-added") window.scrollBy(0, semesterInterfaceHeight);
	}, [semesters.length]);

	const deleteSemester = (index: number) => {
		if (semesters.length === 1) return;
		semesters.splice(index, 1);
		setSemesters(Object.assign([], semesters));
		lastAction.current = "semester-deleted";
	};

	const setSemesterData = (index: number, tqp: string, tcu: string) => {
		semesters[index].tcu = tcu;
		semesters[index].tqp = tqp;
		setSemesters(Object.assign([], semesters));

		if (isValidCGPA(semesters)) {
			const { cgpa, tcu, tqp } = computeCGPA(semesters);
			setCGPA(cgpa);
			setTQP(tqp);
			setTCU(tcu);
		} else if (cgpa !== "---") {
			setCGPA("---");
			setTQP("---");
			setTCU("---");
		}
	};

	const displayWeightChart = (index: number, courses: CourseData[]) => {
		const sectors: Sector[] = generateSectors(courses, gradingScale);
		setSectors(sectors);
		setChartSemesterIndex(index);
		toggleChartVisibility();
	};

	const toggleChartVisibility = () => {
		setChartVisibility((chartVisibility) => !chartVisibility);
	};

	return (
		<div id="semester-container">
			<div id="semester-header">
				GPA Calculator
				<div id="semester-icon" />
			</div>

			<div id="semester-container2">
				<div>
					{semesters.map((semester, i) => (
						<SemesterUI
							key={i}
							index={i}
							addSemester={addSemester}
							deleteSemester={deleteSemester}
							isLastSemester={i + 1 === semesters.length}
							setSemesterData={setSemesterData}
							displayWeightChart={displayWeightChart}
							gradingScale={gradingScale}
							singular={semesters.length === 1}
						/>
					))}
				</div>
				<div id="cgpa-info-box">
					<div id="cgpa-info-box-centered">
						<div>CGPA: {cgpa}</div>
						<div>TCU: {tcu}</div>
						<div>TQP: {tqp}</div>
					</div>
				</div>
			</div>
			{chartVisibility && (
				<WeightChart
					sectors={sectors}
					semesterIndex={chartSemesterIndex}
					setChartVisibility={toggleChartVisibility}
				/>
			)}
		</div>
	);
};

export default SemesterContainer;
