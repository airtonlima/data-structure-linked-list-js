import { defaultEquals } from './utils.mjs';
import { Node } from './models/linked-list-models.mjs';

export default class LinkedList 
{
	constructor(equalsFn = defaultEquals) {
		this.count = 0;
		this.head  = undefined;
		this.equalsFn = equalsFn;
	}
	
	// getRandomInteger(min, max) {
	// 	min = Math.ceil(min);
	// 	max = Math.floor(max);
	// 	return Math.floor( Math.random() * (max - min) + min );
	// }

	push(element) {
		const node = new Node(element);
		let current;
		if (!this.head) {
			this.head = node;
		} else {
			current = this.head;
			while (current.next != null) {
				current = current.next
			}
			current.next = node;
			//current.random = this.getRandomInteger(0, this.count);
		}
		this.count++;
	}

	removeAt(index) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			if (index === 0) {
				this.head = current.next;
			} else {
				const previous = this.getElementAt(index - 1);
				current = previous.next;
				previous.next = current.next;
			}
			this.count--;
			return current.element;
		}
		return undefined;
	}

	getElementAt(index) {
		if (index >= 0 && index < this.count) {
			let current = this.head;
			for (let i = 0; i < index && current; i++) {
				current = current.next
			}
			return current;
		}
		return undefined;
	}

	insert(element, index) {
		if (index >= 0 && index <= this.count) {
			const node = new Node(element);
			if (index === 0) {
				const current = this.head;
				node.next = current;
				this.head = node;
			} else {
				const previous = this.getElementAt(index - 1);
				const current = previous.next;
				node.next = current;
				previous.next = node;
			}
			this.count++; // update linked list size.
			return true;
		}
		return false;
	}

	indexOf(element) {
		let current = this.head;
		for (let i = 0; i < this.count && current; i++) {
			if (this.equalsFn(element, current.element)) {
				return i;
			}
			current = current.next;
		}
		return -1
		;
	}

	remove(element) {
		const index = this.indexOf(element);
		return this.removeAt(index);
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return this.size() === 0;
	}

	getHead() {
		return this.head;
	}

	toString() {
		if (!this.head) {
			return '';
		}
		let objString = `${this.head.element}`;
		let current = this.head.next;
		for (let i = 1; i < this.size() && current; i++) {
			objString = `${objString},${current.element}`;
			current = current.next;
		}
		return objString;
	}

	clone(start) {
		let curr = start, temp = null;

		// insert additional node after every node of original list
		while(curr != null) {
			temp = curr.next;
			// Inserting node
			curr.next = new Node(curr.element);
			curr.next.next = temp;
			curr = temp;
		}

		curr = start;

		// adjust the random pointers of the newly added nodes
		while (curr != null) {
			if (curr.next != null) {
				curr.next.random = (curr.random != null) ? curr.random.next : curr.random;
			}
			// move to the next newly added node by skipping an original node
			curr = (curr.next != null) ? curr.next.next : curr.next;
		}

		let original = start, copy = start.next;

		// save the start of copied linked list
		temp = copy;

		// now separate the original list and copied list
		while (original != null && copy != null) {
			original.next = (original.next != null) ? original.next.next : original.next;
			copy.next = (copy.next != null) ? copy.next.next : copy.next;
			original = original.next;
			copy = copy.next;
		}
		return temp;
	}
}

const main = () => {
	
	const list = new LinkedList();

	list.push(15);
	list.push(10);
	list.push(50);
	list.push(30);
	list.push(20);
	list.push(18);

	console.log(JSON.stringify(list));
	
	list.removeAt(5);

	console.log(JSON.stringify(list));
	console.log(list.indexOf(50));

	list.remove(50);

	console.log(JSON.stringify(list));
	console.log(list.toString());
	console.log(list.size())

	console.log('clone', JSON.stringify( list.clone( list.getHead() ) ) )
};

main();