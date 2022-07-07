import "./basic-btn.css";

interface props {
	content: string;
	action: () => void;
	isClickable: boolean;
	onHover?: () => void;
}

const BasicBtn = ({ content, action, isClickable, onHover }: props) => {
	return (
		<div
			className={`basic-btn ${isClickable ? "clickable-btn" : "unclickable-btn"}`}
			onClick={action}
			onMouseEnter={onHover ? onHover : () => {}}
		>
			{content}
		</div>
	);
};

export default BasicBtn;
