import { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";
import ToggleModeContainer from "./toggle-mode";
import FeedbackIcon from "./feedback/feedback-icon";
import "./home.css";

interface props {
	children: ReactElement;
	setGradingScale: (param: Map<string, number>) => void;
	scale: Map<string, number>;
	setAdditionalSettings: React.Dispatch<React.SetStateAction<any>>;
	additionalSettings: any;
}

const Home = ({ children, setGradingScale, scale, setAdditionalSettings, additionalSettings }: props) => {
	const { pathname } = useLocation();
	const [displayFullContent, setDisplayFullContent] = useState(true);

	const MIN_WINDOW_WIDTH = 1000;

	window.addEventListener("resize", () => {
		handleResize(window.innerWidth, window.innerHeight);
	});

	const handleResize = (width: number, height: number) => {
		if (width < MIN_WINDOW_WIDTH) displayFullContent && setDisplayFullContent(false);
		else !displayFullContent && setDisplayFullContent(true);
	};

	return (
		<>
			<div id="home-content">
				{displayFullContent && pathname !== "/" && (
					<ToggleModeContainer
						additionalSettings={additionalSettings}
						setGradingScale={setGradingScale}
						setAdditionalSettings={setAdditionalSettings}
						scale={scale}
					/>
				)}

				<div id="home-main">{children}</div>
				{pathname !== "/" && <FeedbackIcon />}
			</div>
		</>
	);
};

export default Home;
