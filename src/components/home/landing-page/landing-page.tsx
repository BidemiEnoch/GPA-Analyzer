import { Link } from "react-router-dom";
import "./landing-page.css";

const LandingPage = () => (
	<div id="landing-page">
		<div id="landing-page-header">WELCOME, NOW YOU CAN...</div>
		<div className="landing-page-main">
			<div className="landing-page-section">
				<div className="section-icon" />
				<div className="section-content">Compute your GPA from your grades</div>
			</div>
			<div className="landing-page-section">
				<div className="section-icon" />
				<div className="section-content">Analyze your GPA and CGPA graph</div>
			</div>
			<div className="landing-page-section">
				<div className="section-icon" />
				<div className="section-content">Predict your final grades</div>
			</div>
			<div className="landing-page-section">
				<div className="section-icon" />
				<div className="section-content">And more...</div>
			</div>
		</div>

		<Link to="/gpa-calculator">
			<div id="landing-page-btn"> GET STARTED</div>
		</Link>
	</div>
);

export default LandingPage;
