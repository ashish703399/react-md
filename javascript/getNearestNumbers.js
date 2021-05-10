let arr = [12, 16, 22, 30, 35, 39, 42, 45, 48, 50, 53, 55, 57];
let num = 55;
let min, max;
let totalNearest = 4;
let nrr = [];
function findnear(prevIndex, nextIndex, arr){
	if(prevIndex < 0){
		nrr.push(...arr.slice(nextIndex, nextIndex+(totalNearest-nrr.length)));
		console.log(nrr);
		return;
	}
	if(nextIndex > arr.length-1){
		nrr.push(...arr.slice(prevIndex-(totalNearest-nrr.length-1), prevIndex+1));
		console.log(nrr);
		return;
	}
	if(nrr.length === totalNearest){
		console.log(nrr);
		return;
	}
	if(num - arr[prevIndex]  < arr[nextIndex]- num){
	  nrr.push(arr[prevIndex]);
	  prevIndex = prevIndex-1;
	}else{
	  nrr.push(arr[nextIndex]);
	  nextIndex = nextIndex+1;
	}
	findnear(prevIndex, nextIndex, arr);
}
for(let i = 0;  i <= arr.length; i++){
	if(arr[i] === num || arr[i] > num){
		findnear(i-1, arr[i] > num ? i : i+1, arr);
		break;
	}
}