import { STRING_IS_INT, STRING_IS_DECIMAL } from "./constants";

const testAllForDecimal = (values: string[]): boolean => {
	for (const value of values) {
		const isDecimal = STRING_IS_DECIMAL(value);
		if (!isDecimal || value === "") return false;
	}

	return true;
};

const testAllForInteger = (values: string[]): boolean => {
	for (const value of values) {
		const isInteger = STRING_IS_INT(value);
		if (!isInteger || value === "") return false;
	}

	return true;
};

export const isValidFinalGradeInput = (
	currentCGPA: string,
	currentSemesterCount: string,
	currentAvgCredits: string,
	finalCGPA: string,
	finalSemesterCount: string,
	finalAvgCredits: string
): boolean => {
	const allCasesWork =
		testAllForDecimal([currentCGPA, finalCGPA]) &&
		testAllForInteger([currentSemesterCount, currentAvgCredits, finalSemesterCount, finalAvgCredits]);

	return allCasesWork;
};

export const computeFinalGrade = (
	currentCGPA: number,
	currentSemesterCount: number,
	currentAvgCredits: number,
	finalCGPA: number,
	finalSemesterCount: number,
	finalAvgCredits: number
) => {
	const currentCu = currentSemesterCount * currentAvgCredits;
	const currentTQP = currentCu * currentCGPA;
	const finalCU = finalSemesterCount * finalAvgCredits;
	const TCU = currentCu + finalCU;
	const targetTQP = TCU * finalCGPA;
	const marginOfTQP = targetTQP - currentTQP;
	const requiredCGPA = marginOfTQP / finalCU;
	return requiredCGPA;
};
