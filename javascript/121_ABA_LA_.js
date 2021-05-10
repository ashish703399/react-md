function countDecoding(digits, n)
    {
		// base cases
        if (n == 0 || n == 1)
        {
            return 1;
        }
        // for base condition "01123" should return 0
        if (digits[0] == '0')
        {
            return 0;
        }
         
        // Initialize count
        let count = 0;
         
        // If the last digit is not 0, then
        // last digit must add to
        // the number of words
        if (digits[n - 1] > '0')
        {
            count = countDecoding(digits, n - 1);
		}
        // If the last two digits form a number
        // smaller than or equal to 26,
        // then consider last two digits and recur
        if (digits[n - 2] == '1'
            || (digits[n - 2] == '2'
                && digits[n - 1] < '7'))
        {
            count += countDecoding(digits, n - 2);
		}
        return count;
    }
    // Given a digit sequence of length n,
    // returns count of possible decodings by
    // replacing 1 with A, 2 woth B, ... 26 with Z
    function countWays(digits, n)
    {
        if (n == 0 || (n == 1 && digits[0] == '0'))
        {
            return 0;
        }
        return countDecoding(digits, n);
    }



function decoding(str = ['1','2','1','2','1'], n = 5){
	if(n === 1 || n === 0){
		return 1;
	}
	let count = 0;
	if(str[n-1] > '0'){
		console.log(str[n-1])
		count = decoding(str, n-1);
		console.log("count increaed");
	}
	
	if(str[n-2]+str[n-1] < 27 ){
		console.log(str[n-2]+str[n-1])
		count += decoding(str, n-2);
		console.log("count increaed again");
	}
	return count;
}
function decod(str = '12121'){
	console.log('Original count- '+countWays(str.split(''), str.length));

	return decoding(str.split(''), str.length);
}
decod('12134')
