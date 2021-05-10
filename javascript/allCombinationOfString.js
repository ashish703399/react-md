let allCombinationArray = new Set();
function allCombination(str = 'Delhi') {
	for(let i=0;i<str.length; i++){
		const string = str.slice(0, i);
		for(let j=i;j<str.length; j++){
			allCombinationArray.set(string+str[j]);
		}
		if(i<str.length){
			allCombination(str.slice(i+1, str.length));	
		}
	}
	return;
	
}
allCombination();
console.log(allCombinationArray)