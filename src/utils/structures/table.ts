type Array1D = string[];
type Array2D = (string | number)[][];

class Table {
	header: Array1D | undefined;
	content: Array2D | undefined;
	rowSize: number;
	indexMap: Map<number, string>;
	rows: any[];

	constructor(header: Array1D, requiredHead?: string) {
		this.header = this._validateHeader(header, requiredHead);
		this.indexMap = this._setIndex(this.header);
		this.rowSize = this.header.length;
		this.content = undefined;
		this.rows = [];
	}

	setContents = (rows: Array2D) => {
		for (const row of rows) {
			if (row.length !== this.rowSize)
				throw Error(`The rows in the data provided must all have a length of ${this.rowSize}`);
		}
		this.content = rows;
		rows.forEach((row) => {
			const rowData: any = {};

			row.forEach((item, itemIndex) => {
				const property = this.indexMap.get(itemIndex) || "";
				rowData[property] = item;
			});
			this.rows.push(rowData);
		});
	};

	filter = (fn: (row: any) => any) => {
		return this.rows.filter(fn);
	};

	forEachRow = (fn: (row: any) => void) => {
		this.rows.forEach(fn);
	};

	_validateHeader = (val: Array1D, requiredHead: string | undefined) => {
		val = val.map((item) => item.toLowerCase());
		if (val.length === 0) throw Error("Table head cannot be empty");
		if (requiredHead) {
			if (val.indexOf(requiredHead.toLowerCase()) === -1)
				throw Error(`"${requiredHead}" was not found in the table head`);
		}
		return val;
	};

	_setIndex = (header: Array1D): Map<number, string> => {
		const indexMap = new Map<number, string>();
		header.forEach((headerName, index) => {
			indexMap.set(index, headerName.toLowerCase());
		});
		return indexMap;
	};
}

export default Table;
