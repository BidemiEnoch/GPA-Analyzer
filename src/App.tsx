import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/navigation-bar";
import Home from "./components/home/home";
import SemesterContainer from "./components/home/semester-container";
import FinalGradeContainer from "./components/home/final-grade-components/final-grade-component";
import AnalyzerContainer from "./components/home/cgpa-analyzer-components/cgpa-analyzer-container";
import LandingPage from "./components/home/landing-page/landing-page";
import UniContainer from "./components/home/university/university-container";
import GpaReverse from "./components/home/gpa-reverse-component/gpa-reverse";
import { fourPointScale } from "./utils/compute-gpa";
import "./App.css";

const App = () => {
	const [scale, setScale] = useState<Map<string, number>>(fourPointScale);

	const [additionalSettings, setAdditionalSettings] = useState({
		"open links in new tab": false,
	});

	const setGradingScale = (newScale: Map<string, number>) => {
		setScale(newScale);
	};

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
						<Route path="/gpa-reverse-calculator" element={<GpaReverse />} />
						<Route element={<div>404</div>} />
					</Routes>
				</Home>
			</main>
		</>
	);
};

export default App;
