// input : [4, 6, 3, 7]
let getPossibleTriangles = (arr) => {
  let map = {};
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr.length; j++){
      if(i !== j && !map[arr[i]+arr[j]])
        map[arr[i]+arr[j]] = [i, j];
    }
  }
  const mapKeys = Object.keys(map);
  let sumMap = {};
  sumMap['finalMap'] = [];
  for(let i = 0; i < mapKeys.length; i++){
    for(let j = 0; j < arr.length; j++){
      if(mapKeys[i] > arr[j] && map[mapKeys[i]][0] != j && map[mapKeys[i]][1] != j ){
        const sum = arr[map[mapKeys[i]][0]]+ arr[map[mapKeys[i]][1]]+ arr[j];
        const valid1 = (arr[map[mapKeys[i]][0]]) < (arr[map[mapKeys[i]][1]]+ arr[j]);
        const valid2 = (arr[map[mapKeys[i]][0]] + arr[j]) > (arr[map[mapKeys[i]][1]]);
        if(!sumMap[sum] & valid1 & valid2){
          sumMap['finalMap'].push([arr[map[mapKeys[i]][0]], arr[map[mapKeys[i]][1]], arr[j]]);
          sumMap[sum] = sum;
        }

      }
    }
  }
  return sumMap['finalMap'];
}

getPossibleTriangles([4, 6, 3, 7]);
