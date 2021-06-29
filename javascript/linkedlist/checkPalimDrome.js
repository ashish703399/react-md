class LinkedList{
	constructor(value, next){
		this.value = value;
		this.next = next;
	}
}

let linedListObj = () => {
	let currentObj = null;
	for(let i = 10; i > 0; i--){
		currentObj = new LinkedList(i, currentObj);
	}
	return currentObj;
}

let linkedListFinal = linedListObj();

// delete 5 value nodeName
let prev, temp = linkedListFinal;
while(temp.next != null){
	if(temp.value === 5){
		prev.next = temp.next;
		break;
	}
	prev = temp;
	temp = temp.next;
}
console.log(linkedListFinal);

//https://michaelzheng.medium.com/an-efficient-way-to-check-linked-list-for-palindrome-e445f9061922