import { useEffect, useState } from "react";
import { Course, CourseData } from "./course";
import { computeGPA, isValidGPA } from "../../utils/compute-gpa";
import BasicBtn from "../reusable/basic-btn";

export class Semester {
	tcu: string;
	tqp: string;

	constructor() {
		this.tcu = "---";
		this.tqp = "---";
	}

	get isNull(): boolean {
		return this.tcu === "---" || this.tqp === "";
	}
}

interface props {
	index: number;
	addSemester: () => void;
	isLastSemester: boolean;
	setSemesterData: (index: number, tqp: string, tcu: string) => void;
	displayWeightChart: (index: number, courses: CourseData[]) => void;
	gradingScale: Map<string, number>;
}

export const SemesterUI = ({
	index,
	addSemester,
	isLastSemester,
	setSemesterData,
	displayWeightChart,
	gradingScale,
}: props) => {
	const [courses, setCourses] = useState([
		new CourseData("Course #1"),
		new CourseData("Course #2"),
		new CourseData("Course #3"),
	]);

	const [gpa, setGpa] = useState<string>("---");
	const [tqp, setTQP] = useState<string>("---");
	const [tcu, setTCU] = useState<string>("---");

	const [addRowBtnStatus, setAddRowBtnStatus] = useState(true);
	const [calculateGpaBtnStatus, setCalculateGpaBtnStatus] = useState(false);
	const [viewWeightChartBtnStatus, setViewWeightChartBtnStatus] = useState(false);

	const maxCourseNo = 14;

	const addCourse = () => {
		if (!addRowBtnStatus) return;

		setCourses(
			Object.assign(
				[],
				courses,
				courses.push(new CourseData()),
				courses.forEach((course, i) => (course.placeholder = `Course #${i + 1}`))
			)
		);

		if (courses.length >= maxCourseNo) setAddRowBtnStatus(false);
	};

	const removeCourse = (courseIndex: number) => {
		if (courses.length === 1) return;

		courses.splice(courseIndex, 1);
		courses.forEach((course, i) => (course.placeholder = `Course #${i + 1}`));
		setCourses(Object.assign([], courses));

		if (!addRowBtnStatus) setAddRowBtnStatus(true);
	};

	const setName = (courseIndex: number, val: string) => {
		courses[courseIndex].name = val;
		setCourses(Object.assign([], courses));
	};

	useEffect(() => {
		//console.log(courses);
	});

	const setCredit = (courseIndex: number, val: string) => {
		const isNumbers = /^[0-9]+$/.test(val);
		if ((!isNumbers && val.trim() !== "") || val.length > 3) return;
		courses[courseIndex].credits = val;
		setCourses(Object.assign([], courses));
	};

	const setGrade = (courseIndex: number, val: string) => {
		courses[courseIndex].grade = val;
		setCourses(Object.assign([], courses));
	};

	/**
	 * When the scale gets toggled from a 5.0 to a 4.0, an F might exist as a value in one of the grade inputs; even though the UI defaults to
	 * an A, the value still exists as an F on the CourseData object. checkForRedundantF corrects this difference
	 */
	const checkForRedundantF = () => {
		if (gradingScale.size === 6) return; // returns from the function if the current scale is a 5.0 based on the length of the Map;
		for (let i = 0; i < courses.length; i++) {
			if (courses[i].grade === "F") {
				courses[i].grade = "A";
				setCourses(Object.assign([], courses));
			}
		}
	};

	const findGPA = (): void => {
		if (isValidGPA(courses)) {
			const { gpa, totalQualityPoints, totalCreditUnits } = computeGPA(courses, gradingScale);
			setGpa(gpa);
			setTQP(totalQualityPoints);
			setTCU(totalCreditUnits);
			setSemesterData(index, totalQualityPoints, totalCreditUnits);
			checkForRedundantF();
		} else if (gpa !== "---") {
			setGpa("---");
			setTQP("---");
			setTCU("---");
			setSemesterData(index, "---", "---");
		}
	};

	return (
		<div className="semester">
			<div className="header">Semester #{index + 1}</div>
			<div className="main">
				<div className="table-wrapper">
					<table>
						<thead>
							<td>Course </td>
							<td>Credits</td>
							<td>Grade</td>
						</thead>
						<tbody>
							{courses.map((course, i) => (
								<Course
									key={i}
									index={i}
									data={course}
									setName={setName}
									setCredit={setCredit}
									setGrade={setGrade}
									removeCourse={removeCourse}
									gradingScale={gradingScale}
								/>
							))}
						</tbody>
					</table>
				</div>
				<div className="info-wrapper">
					<div className="info-wrapper-child-1">
						<div className="info-wrapper-child-2">
							<span>GPA:{gpa}</span>
							<span>TQP:{tqp}</span>
							<span>TCU:{tcu} </span>
						</div>
						<BasicBtn
							action={() => {
								if (gpa !== "---") displayWeightChart(index, courses);
							}}
							content="View weight chart"
							isClickable={viewWeightChartBtnStatus}
							onHover={() => {
								if (gpa !== "---") setViewWeightChartBtnStatus(true);
								else setViewWeightChartBtnStatus(false);
							}}
						/>
					</div>
				</div>
			</div>
			<div className="footer">
				<BasicBtn action={addCourse} content="Add row" isClickable={addRowBtnStatus} />
				<BasicBtn
					action={findGPA}
					content="Calculate GPA"
					isClickable={calculateGpaBtnStatus}
					onHover={() => {
						if (isValidGPA(courses)) setCalculateGpaBtnStatus(true);
						else setCalculateGpaBtnStatus(false);
					}}
				/>

				{isLastSemester ? (
					<BasicBtn action={addSemester} content="Add semester" isClickable={true} />
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
