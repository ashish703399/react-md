function findPermutation(str){
	if(str.length < 2){
		return str;
	}
	let permutationArray = [];
	for(let i=0; i<str.length; i++){
		let firstChar = str.charAt(i);
		if (str.indexOf(firstChar) != i)
			continue; // it will return if same char exists multiple time
		let remamingChar = str.slice(0, i)+str.slice(i+1, str.length);
		let combination = findPermutation(remamingChar);
		for(let singleCom of combination){
			permutationArray.push(firstChar+singleCom);	
		}
	}
	return permutationArray;
}

console.log(findPermutation('ABC'))