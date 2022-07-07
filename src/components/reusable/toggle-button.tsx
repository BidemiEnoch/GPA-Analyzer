import "./toggle-button.css";

interface props {
	label: string;
	action: (switchIsChecked: boolean) => void;
	checkValue: boolean;
	className: string;
}

const ToggleSwitch = ({ label, action, checkValue, className }: props) => {
	return (
		<div className="toggle-switch-container">
			{label}{" "}
			<div className="toggle-switch">
				<input
					type="checkbox"
					className="toggle-switch-checkbox"
					id={label}
					name={label}
					onChange={(e) => action(e.currentTarget.checked)}
					checked={checkValue}
				/>
				<label className="toggle-switch-label" htmlFor={label}>
					<span className={`toggle-switch-inner ${className}`} />
					<span className="toggle-switch-btn" />
				</label>
			</div>
		</div>
	);
};

export default ToggleSwitch;
