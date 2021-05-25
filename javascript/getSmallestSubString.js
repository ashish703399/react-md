

function getSubString(str1, str2){
	let smallestString = str1;;
    const getSubStringRec = (mainStr, substrArr, index) => {
		let indexii = substrArr.indexOf(mainStr[index])
		if(indexii > -1){
			substrArr.splice(indexii, 1);
		}
		if(substrArr.length === 0){
			const subStr = mainStr.slice(0,index+1);
			if(smallestString.length > subStr.length){
				smallestString = subStr;
			}
			return;
		}
		if(mainStr.length === index){
			return;
		}
		
		return getSubStringRec(mainStr, substrArr, ++index);
		
	}
    for(let i = 0; i < (str1.length - str2.length); i++){
		if(str2.includes(str1[i])){
			getSubStringRec(str1.slice(i, str1.length), [...str2], 0);
		}
    }
	return smallestString;
}

getSubString('this is a test string', 'tist');