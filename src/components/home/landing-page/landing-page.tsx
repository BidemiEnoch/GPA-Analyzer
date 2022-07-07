import { Link } from "react-router-dom";
import "./landing-page.css";

const LandingPage = () => (
	<div id="landing-page">
		<div id="landing-page-header">WELCOME HOME</div>
		<div className="landing-page-main">
			An all-in-one tool for analyzing your grades. This application is a must use for university students who are
			tired of the old (and traditional way) of calculating grades.
		</div>
		<div className="landing-page-main">
			And oh! This application is not just for students, Universities can use this app to analyze data on students
			grades.
		</div>
		<div id="landing-page-btn">
			<Link to="/gpa-calculator" target="_blank" rel="noopener noreferrer">
				<div className="basic-btn">GET STARTED</div>
			</Link>
		</div>
	</div>
);

export default LandingPage;
