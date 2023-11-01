export class Queue<T> {
	length = 0;
	elements: T[] = [];

	public push(input: T) {
		this.elements.push(input);
		this.length = this.length + 1;
	}

	public pop() {
		this.elements.pop();
		this.length = this.length - 1;
	}

	public peek() {
		return this.elements[0];
	}
}
