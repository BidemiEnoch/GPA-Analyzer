import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/navigation-bar";
import Home from "./components/home/home";
import SemesterContainer from "./components/home/semester-container";
import FinalGradeContainer from "./components/home/final-grade-components/final-grade-component";
import AnalyzerContainer from "./components/home/cgpa-analyzer-components/cgpa-analyzer-container";
import LandingPage from "./components/home/landing-page/landing-page";
import UniContainer from "./components/home/university/university-container";
import FeedbackHistory from "./components/home/feedback/feedback-history";
import CopyRights from "./components/footer/copyrights";
import Page404 from "./components/page404/page404";
import { fourPointScale } from "./utils/compute-gpa";
import "./App.css";

const App = () => {
	const [scale, setScale] = useState<Map<string, number>>(fourPointScale);
	const theme = localStorage.getItem("theme");
	if (theme) {
		document.body.style.setProperty("--theme", theme);
	}

	const [additionalSettings, setAdditionalSettings] = useState({
		"open links in new tab": false,
	});

	const setGradingScale = (newScale: Map<string, number>) => setScale(newScale);

	return (
		<>
			<NavBar />
			<main>
				<Home
					setGradingScale={setGradingScale}
					scale={scale}
					additionalSettings={additionalSettings}
					setAdditionalSettings={setAdditionalSettings}
				>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route
							path="/gpa-calculator"
							element={<SemesterContainer gradingScale={scale} />}
						/>
						<Route
							path="/final-grade-calculator"
							element={<FinalGradeContainer gradingScale={scale} />}
						/>
						<Route path="/cgpa-analyzer" element={<AnalyzerContainer />} />
						<Route
							path="/university-tools"
							element={<UniContainer gradingScale={scale} />}
						/>
						<Route path="/feedbacks" element={<FeedbackHistory />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Home>
			</main>
			<CopyRights />
		</>
	);
};

export default App;
