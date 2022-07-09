import "./feedback-icon.css";

const FeedbackIcon = () => {
	return (
		<div id="feedback-container">
			<div id="feedback-icon">feedback</div>
			<div id="feedback-writearea-wrapper">
				<div id="feedback-writearea-pointer"></div>
				<div id="feedback-writearea-wrapper-2">
					<textarea
						id="feedback-writearea"
						placeholder="Write your improvement suggestions here"
						maxLength={200}
					></textarea>
				</div>
			</div>

			<div id="feedback-submit">submit</div>
		</div>
	);
};

export default FeedbackIcon;
