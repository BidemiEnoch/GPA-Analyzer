import { useState } from "react";
import { Link } from "react-router-dom";
import "./navigation-bar.css";

const NavBar = () => {
	const [extendAuthorInfo, setExtendAuthorInfo] = useState(false);
	const [authorInfoOpacity, setAuthorInfoOpacity] = useState(0);

	const toggleAuthorInfo = (val: boolean) => {
		setExtendAuthorInfo(val);
		val ? setTimeout(() => setAuthorInfoOpacity(1), 200) : setAuthorInfoOpacity(0);
		//alert("works");
	};

	return (
		<nav id="navbar">
			<div id="nav-icon-wrapper">
				<Link to="/">
					<div id="nav-icon" />
					<h3 id="nav-text"> GPA ANALYZER</h3>
				</Link>
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
