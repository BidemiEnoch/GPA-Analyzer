export const STRING_IS_INT = (str: string): boolean => /^[0-9]{0,2}$/.test(str);

export const STRING_IS_DECIMAL = (str: string): boolean => /^[0-9]{0,1}(\.\d{1,2})?$/.test(str);

export const FILE_SERVER_URL = "http://localhost:8000";

export const FIND_AVERAGE = (arr: number[]): number => {
	let sum = 0;
	arr.forEach((item) => (sum += item));
	const val = +(sum / arr.length).toFixed(2);
	return val;
};

export const FOUR_POINT_SCALE_BOUNDARIES = {
	firstClass: {
		lower: 3.5,
		upper: 4,
	},
	secondClassUpper: {
		lower: 3,
		upper: 3.5,
	},
	secondClassLower: {
		lower: 2,
		upper: 3,
	},
	thirdClass: {
		lower: 1,
		upper: 2,
	},
	pass: {
		lower: 0,
		upper: 1,
	},
};

export const FIVE_POINT_SCALE_BOUNDARIES = {
	firstClass: {
		lower: 4.5,
		upper: 5,
	},
	secondClassUpper: {
		lower: 3.5,
		upper: 4.5,
	},
	secondClassLower: {
		lower: 2.4,
		upper: 3.5,
	},
	thirdClass: {
		lower: 1.5,
		upper: 2.4,
	},
	pass: {
		lower: 0,
		upper: 1.5,
	},
};
