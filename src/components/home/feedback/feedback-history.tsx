import axios from "axios";
import { useEffect, useState } from "react";
import { FILE_SERVER_URL } from "../../../utils/constants";
import "./feedback-history.css";

const Feedback = ({ content }: { content: string }) => (
	<div className="feedback-history-container">
		<div className="history-header">Anonymous</div>
		<div className="history-content">{content}</div>
	</div>
);

const FeedbackHistory = () => {
	const [feedbacks, setFeedbacks] = useState<string[]>();
	/*
    [
		"Improve the buttons",
		"More themes, I would love a yellow theme and is there like a dark mode theme? That would be really cool, great app! \n Also it would be cool if you added more grading scales",
		"Is there a way I can upload a transcript in png format? and your app just reads it and computes the grades? add that feature",
	]
	axios.get(`${FILE_SERVER_URL}/feedbacks`).then((res) => {
		const { data } = res;
		setFeedbacks(data);
	});*/

	return (
		<div>
			<h4 id="feedback-container-head">Feedback History</h4>
			{feedbacks ? (
				feedbacks.map((feedback) => <Feedback content={feedback} />)
			) : (
				<div>No feedbacks</div>
			)}
		</div>
	);
};

export default FeedbackHistory;
