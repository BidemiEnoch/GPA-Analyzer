import TrashIcon from "../../assets/svg/trash-icon.svg";
import "./course.css";

/* The Blueprint for defining course objects **/
export class CourseData {
	name: string;
	placeholder: string | undefined;
	credits: string;
	grade: string;

	constructor(placeholder?: string) {
		this.placeholder = placeholder;
		this.name = "";
		this.credits = "";
		this.grade = "--";
	}

	weight = (scale: Map<string, number>): number => {
		if (this.credits === "" || this.grade === "---") return 0;
		const credits = +this.credits;
		const pointGrade = scale.get(this.grade) || 0;
		const qualityPoint = pointGrade * credits;
		return qualityPoint;
	};

	get creditsVal(): number {
		return +this.credits;
	}

	get isEmpty(): boolean {
		return this.credits === "" && this.grade === "--";
	}

	get isHalfEmpty(): boolean {
		return (this.credits === "" && this.grade !== "--") || (this.credits !== "" && this.grade === "--");
	}
}

/*


The Course component


*/

interface props {
	data: CourseData;
	index: number;
	setCredit: (courseIndex: number, val: string) => void;
	setGrade: (courseIndex: number, val: string) => void;
	setName: (courseIndex: number, val: string) => void;
	removeCourse: (courseIndex: number) => void;
	gradingScale: Map<string, number>;
}

export const Course = ({ data, index, setCredit, setGrade, setName, removeCourse, gradingScale }: props) => (
	<tr className="table-row">
		<td>
			<input
				name="course-name"
				type="text"
				placeholder={data.placeholder}
				onChange={(e) => setName(index, e.currentTarget.value)}
				value={data.name}
			/>
		</td>
		<td>
			<input
				name="credits"
				type="text"
				placeholder="Credit"
				onChange={(e) => setCredit(index, e.currentTarget.value)}
				value={data.credits}
			/>
		</td>
		<td>
			<select
				name="grades"
				className="grades"
				onChange={(e) => setGrade(index, e.currentTarget.value)}
				value={data.grade}
			>
				<option value="--" disabled hidden>
					--
				</option>
				{Array.from(gradingScale).map((e, i) => (
					<option key={i} value={e[0]}>
						{e[0]}
					</option>
				))}
			</select>
		</td>
		<td>
			<div className="close-row-btn" onClick={() => removeCourse(index)}>
				<TrashIcon />
			</div>
		</td>
	</tr>
);
