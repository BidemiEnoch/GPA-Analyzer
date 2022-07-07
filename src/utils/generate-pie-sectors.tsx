import { CourseData } from "../components/home/course";

export interface Sector {
	name: string | undefined;
	y: number;
}

export const generateSectors = (courses: CourseData[], gradingScale: Map<string, number>): Sector[] => {
	const sectors = new Array<Sector>();
	for (const course of courses) {
		if (course.isHalfEmpty || course.isEmpty) continue;
		sectors.push({
			name: course.name === "" ? course.placeholder : course.name,
			y: course.weight(gradingScale),
		});
	}

	return sectors;
};
