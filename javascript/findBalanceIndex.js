// for a given array find the index where sum of left hand items is equal to right .
// 1+2+5 === 3+2+1+2 so answer will be index 3 if.e. 4
// sumLeft = 1; i = 1
// sumRight = 2; j = 6;
let findBalanceIndex = (arr) => {
  let i = 1, j = arr.length-2 ;
  let sumLeft = arr[0], sumRight = arr[arr.length-1];
  let k, l;
  while(true){
    if(sumLeft === sumRight){
      k = i;
      l = j;
    }

    if(i === j){
      break;
    }

    if(sumLeft < sumRight){
      sumLeft += arr[i];
      i++;
    }else{
      sumRight += arr[j];
      j--;
    }

  }
  return l;
}
//console.log(findBalanceIndex([1,2,5,4,3,2,1,2]))
//console.log(findBalanceIndex([1,3,4,4,3,2,1,2]))
console.log(findBalanceIndex([1,3,4,4,5,7,3,2,1,2]))
