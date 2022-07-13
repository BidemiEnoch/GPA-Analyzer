import { useEffect, useRef, useState } from "react";
import { Course, CourseData } from "./course";
import { computeGPA, isValidGPA } from "../../utils/compute-gpa";
import BasicBtn from "../reusable/basic-btn";
import Stack from "../../utils/structures/stack";

/*
This constant was defined as a function returning an array and not directly as an array
so that it returns a new array reference on every use
*/
const DEFAULT_COURSES = () => [new CourseData("Course #1"), new CourseData("Course #2"), new CourseData("Course #3")];

interface props {
	index: number;
	addSemester: () => void;
	deleteSemester: (index: number) => void;
	isLastSemester: boolean;
	singular: boolean;
	setSemesterData: (index: number, tqp: string, tcu: string) => void;
	displayWeightChart: (index: number, courses: CourseData[]) => void;
	gradingScale: Map<string, number>;
}

export const SemesterUI = ({
	index,
	addSemester,
	deleteSemester,
	isLastSemester,
	setSemesterData,
	displayWeightChart,
	gradingScale,
	singular,
}: props) => {
	const [courses, setCourses] = useState(DEFAULT_COURSES);

	const [gpa, setGpa] = useState<string>("---");
	const [tqp, setTQP] = useState<string>("---");
	const [tcu, setTCU] = useState<string>("---");

	const [addRowBtnStatus, setAddRowBtnStatus] = useState(true);
	const [calculateGpaBtnStatus, setCalculateGpaBtnStatus] = useState(false);
	const [viewWeightChartBtnStatus, setViewWeightChartBtnStatus] = useState(false);

	const maxCourseNo = 14;
	const prevStatesOfCourses = useRef(new Stack<CourseData[]>());

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

	const setCredit = (courseIndex: number, val: string) => {
		const isNumbers = /^[0-9]+$/.test(val);
		if ((!isNumbers && val !== "") || val.length > 3) return;
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

	const clearTable = () => {
		let emptyRows = 0;
		for (const course of courses) {
			if (course.isEmpty && !course.name) emptyRows++;
		}
		if (emptyRows !== courses.length) setCourses(DEFAULT_COURSES);
	};

	const setToPrevCourseData = () => {
		if (prevStatesOfCourses.current.size <= 1) return;

		prevStatesOfCourses.current.pop();
		setCourses(prevStatesOfCourses.current.top);
	};

	const cloneCourseData = (courses: CourseData[]) => {
		const data = [];
		for (const course of courses) {
			data.push(new CourseData(course.placeholder, course.name, course.credits, course.grade));
		}
		return data;
	};

	useEffect(() => {
		if (prevStatesOfCourses.current.lastAction === "pop") {
			prevStatesOfCourses.current.pop();
		}
		//console.log(JSON.stringify(courses));
		const data = cloneCourseData(courses);
		prevStatesOfCourses.current.push(data);
	}, [courses]);

	return (
		<div className="semester">
			<div className="corner-icons">
				<div title="Undo Last Action" onClick={setToPrevCourseData} className="undo-btn" />
				{isLastSemester && !singular && (
					<div
						title="Delete semester"
						className="delete-btn"
						onClick={() => deleteSemester(index)}
					/>
				)}
			</div>
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
				<BasicBtn action={clearTable} content="Clear Table" isClickable={true} />
				{isLastSemester && (
					<BasicBtn action={addSemester} content="Add semester" isClickable={true} />
				)}
			</div>
		</div>
	);
};

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
