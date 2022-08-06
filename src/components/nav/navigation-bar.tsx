import { useState } from "react";
import { Link } from "react-router-dom";
import { GithubPicker } from "react-color";
import Theme from "../../data/theme.json";
import "./navigation-bar.css";

const NavLink = ({ url, name }: { url: string; name: string }) => (
	<a href={url} target="_blank" rel="noreferrer">
		<div className="author-links-child" id={name.toLowerCase()}>
			{name}
		</div>
	</a>
);

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
		localStorage.setItem("theme", color.hex);
	};

	return (
		<nav id="navbar">
			<div id="navbar-left">
				<div id="nav-icon-wrapper">
					<Link to="/">
						<div id="nav-icon" />
						<h3 id="nav-text">GPA ANALYZER</h3>
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
						{extendAuthorInfo && (
							<div style={{ opacity: authorInfoOpacity }}>
								<div id="drop-icon" />
								<div id="author-links">
									<NavLink
										url="https://github.com/BidemiEnoch"
										name="Github"
									/>
									<NavLink
										url="https://www.linkedin.com/in/koledoye-abidemi-5a27241b8/"
										name="Linkedin"
									/>
									<NavLink
										url="https://www.sololearn.com/profile/6860646"
										name="Sololearn"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
