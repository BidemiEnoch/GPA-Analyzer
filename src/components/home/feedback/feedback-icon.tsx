import { useState } from "react";
import axios from "axios";
import { FILE_SERVER_URL } from "../../../utils/constants";
import "./feedback-icon.css";

const FeedbackIcon = () => {
	const [content, setContent] = useState<string>("");
	const [submitStatus, setSubmitStatus] = useState(false);

	const submitFeedback = async () => {
		if (!content) return;

		try {
			const uploadResponse = await axios.post(`${FILE_SERVER_URL}/send-feedback`, {
				content,
			});
			console.log("post:" + uploadResponse.statusText);
			setSubmitStatus(true);
		} catch {
			alert("An error occured sending your feedback");
		}
	};

	return (
		<div id="feedback-container">
			<div id="feedback-header">
				<div id="feedback-header-text">Give us feedback</div>
				<div id="feedback-icon" />
			</div>
			<div id="feedback-writearea-wrapper">
				<div id="feedback-writearea-pointer"></div>
				{submitStatus ? (
					<div id="feedback-response">Thanks for your submission</div>
				) : (
					<>
						<div id="feedback-writearea-wrapper-2">
							<textarea
								id="feedback-writearea"
								placeholder="Write your improvement suggestions here"
								maxLength={200}
								value={content}
								onChange={(e) => setContent(e.currentTarget.value)}
							/>
						</div>
						<div id="feedback-submit" onClick={submitFeedback}>
							Submit
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default FeedbackIcon;
