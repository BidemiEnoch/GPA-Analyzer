import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ToggleSwitch from "../reusable/toggle-button";
import { fourPointScale, fivePointScale } from "../../utils/compute-gpa";
import "./toggle-mode.css";

interface props {
	setGradingScale: (param: Map<string, number>) => void;
	setAdditionalSettings: React.Dispatch<React.SetStateAction<any>>;
	additionalSettings: any;
	scale: Map<string, number>;
}

const ToggleModeContainer = ({ setGradingScale, scale, setAdditionalSettings, additionalSettings }: props) => {
	const { pathname } = useLocation();
	const [checkboxValue, setCheckboxValue] = useState(scale === fivePointScale);
	const [checkbox2Value, setCheckbox2Value] = useState(additionalSettings["open links in new tab"]);

	const toggleSwitchRequired =
		pathname === "/gpa-calculator" ||
		pathname === "/final-grade-calculator" ||
		pathname === "/university-tools";

	const changeGradingScale = (switchIsChecked: boolean) => {
		setCheckboxValue(scale === fourPointScale);
		setGradingScale(switchIsChecked ? fivePointScale : fourPointScale);
	};

	const target = additionalSettings["open links in new tab"] ? "_blank" : "";

	return (
		<div id="toggle-mode-container">
			<div id="toggle-mode-container-2">
				{toggleSwitchRequired ? (
					<div className="toggle-mode-section">
						<div className="toggle-mode-header">Select a grading scale</div>
						<div className="toggle-mode-main">
							<ToggleSwitch
								label="Scale"
								action={changeGradingScale}
								checkValue={checkboxValue}
								className={"four-or-five-point-toggle"}
							/>
						</div>
					</div>
				) : (
					<></>
				)}

				<div className="toggle-mode-section">
					<div className="toggle-mode-header">Select a tool</div>
					<div className="toggle-mode-main">
						<ul>
							<li>
								<Link
									to="/gpa-calculator"
									target={target}
									rel="noreferrer"
								>
									Gpa calculator
								</Link>
							</li>
							<li>
								<Link
									to="/final-grade-calculator"
									target={target}
									rel="noreferrer"
								>
									Final grade calculator
								</Link>
							</li>
							<li>
								<Link
									to="/cgpa-analyzer"
									target={target}
									rel="noreferrer"
								>
									CGPA Analyzer
								</Link>
							</li>
							<li>
								<Link
									to="/university-tools"
									target={target}
									rel="noreferrer"
								>
									University Tools
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="toggle-mode-section">
					<div className="toggle-mode-header">Check out some helpful links</div>
					<div className="toggle-mode-main">
						<ul>
							<li>
								<a
									href="https://www.pdx.edu/registration/calculating-grade-point-average"
									target="_blank"
									rel="noreferrer"
								>
									How a GPA is computed
								</a>
							</li>

							<li>
								<a href="https://github.com/repo">
									Our source code on github
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="toggle-mode-section">
					<div className="toggle-mode-header">Some additional settings</div>
					<div className="toggle-mode-main">
						<ToggleSwitch
							label="Open links in new tab"
							action={(switchIsChecked: boolean) => {
								setCheckbox2Value(switchIsChecked);
								setAdditionalSettings({
									"open links in new tab": switchIsChecked,
								});
							}}
							checkValue={checkbox2Value}
							className={"yes-or-no-toggle"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ToggleModeContainer;
