class Stack<type> {
	private __value: type[];
	lastAction: "push" | "pop";
	constructor(initialVal?: type[]) {
		this.__value = initialVal || [];
		this.lastAction = "push";
	}

	push = (val: type) => {
		this.lastAction = "push";
		this.__value.push(val);
	};

	pop = () => {
		this.lastAction = "pop";
		return this.__value.pop();
	};
	get size() {
		return this.__value.length;
	}

	get top() {
		return this.__value[this.__value.length - 1];
	}
}

export default Stack;
