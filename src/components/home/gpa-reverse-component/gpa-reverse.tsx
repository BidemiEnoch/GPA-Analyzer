const credits = [3, 2, 1, 3, 2, 2];

const gpa = 3.2;

const lowerScale = 3.0;

const findGrades = (credits: number[], gpa: number) => {
	let tcu = 0;
	credits.forEach((credit) => {
		tcu += credit;
	});
	const tqp = gpa * tcu;
	const defaultTqp = lowerScale * tcu;

	console.log(tqp);
	console.log(defaultTqp);
};

findGrades(credits, gpa);

const GpaReverse = () => {
	return <div>test</div>;
};

export default GpaReverse;
