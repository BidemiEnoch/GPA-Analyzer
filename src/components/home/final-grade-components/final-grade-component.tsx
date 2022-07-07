import React, { useState } from "react";
import { computeFinalGrade, isValidFinalGradeInput } from "../../../utils/compute-final-grade";
import { STRING_IS_INT } from "../../../utils/constants";
import BasicBtn from "../../reusable/basic-btn";
import "./final-grade-container.css";

interface props {
	gradingScale: Map<string, number>;
}

const FinalGradeContainer = ({ gradingScale }: props) => {
	const maxGrade = gradingScale.size === 5 ? 4 : 5;
	const [currentCGPA, setCurrentCGPA] = useState("");
	const [currentSemesterCount, setcurrentSemesterCount] = useState("");
	const [currentAvgCredits, setcurrentAvgCredits] = useState("");
	const [finalCGPA, setFinalCGPA] = useState("");
	const [finalSemesterCount, setFinalSemesterCount] = useState("");
	const [finalAvgCredits, setFinalAvgCredits] = useState("");
	const [calcBtnStatus, setCalcBtnStatus] = useState(false);

	const [conclusion, setConclusion] = useState(
		<div>
			"The conclusion of the computation will appear here if the appropriate values have been entered. You can
			check your student portal to verify the validity of the data being entered."
			<br />
		</div>
	);

	const setStateHandler = (
		val: string,
		setStateFn: React.Dispatch<React.SetStateAction<string>>,
		regexType: "integer" | "decimal"
	) => {
		if (regexType === "integer") {
			const testcase = STRING_IS_INT(val);
			if (!testcase && val.trim() !== "") return;
			setStateFn(val);
		} else if (regexType === "decimal") {
			const testOnfivePoint = /^[0-4]{0,1}(\.|(\.\d{1,2}))?$/.test(val) || /^5(\.|(\.0{1,2}))?$/.test(val);

			if (!testOnfivePoint && val.trim() !== "") return;
			setStateFn(val);
		}
	};

	const isValidInput = () =>
		isValidFinalGradeInput(
			currentCGPA,
			currentSemesterCount,
			currentAvgCredits,
			finalCGPA,
			finalSemesterCount,
			finalAvgCredits
		);

	const handler = () => {
		if (!isValidInput()) return;

		const requiredCGPA = computeFinalGrade(
			+currentCGPA,
			+currentSemesterCount,
			+currentAvgCredits,
			+finalCGPA,
			+finalSemesterCount,
			+finalAvgCredits
		);

		let conclusionVal;

		if (requiredCGPA > maxGrade)
			conclusionVal = (
				<div>
					"The target CGPA is impossible to achieve based on your current CGPA because you will need need an
					approximate GPA of {requiredCGPA.toFixed(2)} for the next {finalSemesterCount} semester(s) which is
					higher than the {maxGrade}.0 scale."
				</div>
			);
		else if (requiredCGPA < 0)
			conclusionVal = (
				<div>
					"The target CGPA is impossible to achieve based on your current CGPA because you will need need an
					approximate GPA of {requiredCGPA.toFixed(2)} for the next {finalSemesterCount} semester(s) which is
					a negative value for a CGPA."
				</div>
			);
		else
			conclusionVal = (
				<div>
					"Based on the information provided, You will need to achieve a GPA of {requiredCGPA.toFixed(2)} for
					the next {finalSemesterCount} semester(s) to finish with a CGPA of {finalCGPA}. We wish you the best
					of luck in attaining your target CGPA."
				</div>
			);

		setConclusion(conclusionVal);
	};

	return (
		<div id="final-grade-container">
			<div id="final-grade-header">
				Final Grade Calculator<div id="final-grade-icon"></div>
			</div>
			<div id="current-cgpa-data">
				<div className="final-grade-legend">Current grades</div>
				<table>
					<tbody>
						<tr>
							<td>Your current CGPA:</td>
							<td>
								<input
									name="current-cgpa"
									placeholder="CGPA"
									onChange={(e) => setStateHandler(e.currentTarget.value, setCurrentCGPA, "decimal")}
									value={currentCGPA}
								/>
							</td>
						</tr>
						<tr>
							<td>No. of semesters offered:</td>
							<td>
								<input
									name="current-semester-no"
									placeholder="No. of semesters"
									onChange={(e) =>
										setStateHandler(e.currentTarget.value, setcurrentSemesterCount, "integer")
									}
									value={currentSemesterCount}
								/>
							</td>
						</tr>
						<tr>
							<td>Average no. of credit units offered per those semesters:</td>
							<td>
								<input
									name="current-avg-credits"
									placeholder="No. of credits"
									onChange={(e) =>
										setStateHandler(e.currentTarget.value, setcurrentAvgCredits, "integer")
									}
									value={currentAvgCredits}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="final-cgpa-data">
				<div className="final-grade-legend">Final grades</div>
				<table>
					<tbody>
						<tr>
							<td>Your target CGPA:</td>
							<td>
								<input
									name="final-cgpa"
									placeholder="CGPA"
									onChange={(e) => setStateHandler(e.currentTarget.value, setFinalCGPA, "decimal")}
									value={finalCGPA}
								/>
							</td>
						</tr>
						<tr>
							<td>No. of semesters remaining:</td>
							<td>
								<input
									name="final-semester-no"
									placeholder="No. of semesters"
									onChange={(e) =>
										setStateHandler(e.currentTarget.value, setFinalSemesterCount, "integer")
									}
									value={finalSemesterCount}
								/>
							</td>
						</tr>
						<tr>
							<td>Average no. of credit units left per those semesters:</td>
							<td>
								<input
									name="final-avg-credits"
									placeholder="No. of credits"
									onChange={(e) =>
										setStateHandler(e.currentTarget.value, setFinalAvgCredits, "integer")
									}
									value={finalAvgCredits}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="final-grade-footer">
				<div id="basic-btn-wrapper">
					<BasicBtn
						action={handler}
						content="Calculate final grades"
						isClickable={calcBtnStatus}
						onHover={() => {
							if (isValidInput()) setCalcBtnStatus(true);
							else setCalcBtnStatus(false);
						}}
					/>
				</div>

				<div id="final-grade-conclusion">
					<div id="final-grade-conclusion-content">{conclusion}</div>
				</div>
			</div>
		</div>
	);
};

export default FinalGradeContainer;
