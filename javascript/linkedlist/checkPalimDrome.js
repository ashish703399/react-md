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
// delete by index
let prev1, temp1 = linkedListFinal;
let count = 0;
while(temp1.next != null){
	if(count == 2){
		prev1.next = temp1.next;
		break;
	}
	count++;
	prev1 = temp1;
	temp1 = temp1.next;
}
console.log(linkedListFinal);





//https://michaelzheng.medium.com/an-efficient-way-to-check-linked-list-for-palindrome-e445f9061922