import { CourseData } from "../components/home/course";
import { Semester } from "../components/home/semester";

export const fourPointScale = new Map([
	["A", 4],
	["B", 3],
	["C", 2],
	["D", 1],
	["E", 0],
]);

export const fivePointScale = new Map([
	["A", 5],
	["B", 4],
	["C", 3],
	["D", 2],
	["E", 1],
	["F", 0],
]);

export const isValidGPA = (courses: CourseData[]): boolean => {
	let emptyFields = 0;
	for (const course of courses) {
		if (course.isHalfEmpty) return false;
		if (course.isEmpty) emptyFields++;
	}
	if (emptyFields === courses.length) return false;
	return true;
};

export const isValidCGPA = (semesters: Semester[]): boolean => {
	for (const semester of semesters) {
		if (semester.isNull) return false;
	}

	return true;
};

export const computeGPA = (courses: CourseData[], gradingScale: Map<string, number>): any => {
	let totalCreditUnits = 0;
	let totalQualityPoints = 0;
	//const gradingScale = scale === "4" ? fourPointScale : fivePointScale;
	for (const course of courses) {
		if (course.isEmpty) continue;
		//const credits = +course.credits;
		//const weight = gradingScale.get(course.grade) || 0;
		//const qualityPoint = course;
		totalQualityPoints += course.weight(gradingScale);
		totalCreditUnits += course.creditsVal;
	}
	const gpa = (totalQualityPoints / totalCreditUnits).toFixed(2);

	return {
		gpa,
		totalQualityPoints,
		totalCreditUnits,
	};
};

export const computeCGPA = (semesters: Semester[]): any => {
	let totalCreditUnits = 0;
	let totalQualityPoints = 0;

	for (const semester of semesters) {
		if (semester.isNull) continue;
		totalQualityPoints += +semester.tqp;
		totalCreditUnits += +semester.tcu;
	}

	const cgpa = (totalQualityPoints / totalCreditUnits).toFixed(2);

	return {
		cgpa,
		tqp: totalQualityPoints,
		tcu: totalCreditUnits,
	};
};
