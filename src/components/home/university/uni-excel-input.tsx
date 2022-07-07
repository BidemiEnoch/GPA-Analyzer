import { useState } from "react";
import axios from "axios";
import { FILE_SERVER_URL } from "../../../utils/constants";
import BasicBtn from "../../reusable/basic-btn";
import Loader from "../../reusable/bar-loader";

interface props {
	handleExcelData: (data: [][]) => void;
}

const UniExcelInput = ({ handleExcelData }: props) => {
	const [selectedFile, setSelectedFile] = useState<File>();
	const [uploadStatus, setUploadStatus] = useState(false);

	//The button gets active when the <input/> has received a file
	const [uploadBtnActive, setUploadBtnActive] = useState(false);

	//const [excelData, handleExcelData] = useState<[][]>();

	const handleInput = (files: FileList | null) => {
		const file = files![0];
		if (!file) return;

		setSelectedFile(file);
		setUploadBtnActive(true);
	};

	const uploadHandler = async () => {
		if (!selectedFile) return;
		const data = new FormData();
		data.append("file", selectedFile!);

		setUploadStatus(true);

		try {
			const uploadResponse = await axios.post(`${FILE_SERVER_URL}/upload`, data);
			console.log("post:" + uploadResponse.statusText);

			const downloadResponse = await axios.get(`${FILE_SERVER_URL}/download`);
			handleExcelData(downloadResponse.data);
			console.log("get:" + downloadResponse.statusText);
		} catch (err) {
			console.log(err);
			setUploadStatus(false);
			setUploadBtnActive(false);
			alert("Opps! An error occured uploading the neccessary data");
		}
	};

	return (
		<>
			<div id="university-excel-main">
				<div id="university-excel-desc">
					Upload an excel file containing the data of your students. The excel file must
					have a column for GPA, and can contain other columns which can be used to filter
					the data used for analysis. <br /> <br />
					The below image is an example of the excel input required. Every field other
					than "GPA" is optional.
				</div>
				<div id="university-excel-example" />
			</div>
			<div id="university-excel-input">
				{uploadStatus ? (
					<Loader content="uploading file" />
				) : (
					<>
						<input
							type="file"
							accept=".xlsx"
							onChange={(e) => handleInput(e.currentTarget.files)}
						/>
						<div id="upload-excel-input">
							<BasicBtn
								content="Upload"
								action={uploadHandler}
								isClickable={uploadBtnActive}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default UniExcelInput;
