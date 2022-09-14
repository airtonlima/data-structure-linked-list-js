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

	remove(index) {
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
	//list.remove(3) //index
	//console.log(JSON.stringify(list));
	list.remove(5);
	console.log(JSON.stringify(list));
};

main();