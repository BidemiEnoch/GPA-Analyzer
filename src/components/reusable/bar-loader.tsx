import "./bar-loader.css";

interface props {
	content: string;
}

const Loader = ({ content }: props) => (
	<div className="bar-loader">
		{content}
		<div></div>
	</div>
);

export default Loader;
