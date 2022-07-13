import { useState } from "react";
import { Link } from "react-router-dom";
import { GithubPicker } from "react-color";
import Theme from "../../data/theme.json";
import "./navigation-bar.css";

const NavBar = () => {
	const [extendAuthorInfo, setExtendAuthorInfo] = useState(false);
	const [extendColorPicker, setExtendColorPicker] = useState(false);
	const [authorInfoOpacity, setAuthorInfoOpacity] = useState(0);

	const toggleAuthorInfo = (val: boolean) => {
		setExtendAuthorInfo(val);
		val ? setTimeout(() => setAuthorInfoOpacity(1), 200) : setAuthorInfoOpacity(0);
	};

	const changeTheme = (color: any) => {
		document.body.style.setProperty("--theme", color.hex);
	};

	return (
		<nav id="navbar">
			<div id="navbar-left">
				<div id="nav-icon-wrapper">
					<Link to="/">
						<div id="nav-icon" />
						<h3 id="nav-text"> GPA ANALYZER</h3>
					</Link>
				</div>

				<div id="nav-color-picker">
					<div
						onMouseEnter={() => setExtendColorPicker(true)}
						onMouseLeave={() => setExtendColorPicker(false)}
					>
						<div id="color-picker-text">Theme</div>
						{extendColorPicker && (
							<div id="color-picker-wrapper-2">
								<GithubPicker
									colors={Theme.colors}
									onChangeComplete={changeTheme}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			<div id="design-info">
				created by
				<div id="author">
					<div
						onMouseEnter={() => toggleAuthorInfo(true)}
						onMouseLeave={() => toggleAuthorInfo(false)}
					>
						<div id="author-name">K. Abidemi</div>
						{extendAuthorInfo ? (
							<>
								<div
									id="drop-icon"
									style={{ opacity: authorInfoOpacity }}
								/>
								<div
									id="author-links"
									style={{ opacity: authorInfoOpacity }}
								>
									<a
										href="https://github.com/BidemiEnoch"
										target="_blank"
										rel="noreferrer"
									>
										<div
											className="author-links-child"
											id="github"
										>
											Github
										</div>
									</a>
									<a
										href="https://www.linkedin.com/in/koledoye-abidemi-5a27241b8/"
										target="_blank"
										rel="noreferrer"
									>
										<div
											className="author-links-child"
											id="linked-in"
										>
											LinkedIn
										</div>
									</a>
									<a
										href="https://www.sololearn.com/profile/6860646"
										target="_blank"
										rel="noreferrer"
									>
										<div
											className="author-links-child"
											id="sololearn"
										>
											Sololearn
										</div>
									</a>
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
