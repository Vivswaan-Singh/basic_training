
// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
  // Write your code here
  let n=array.length;
  let maxi=-1e9,secmaxi=-1e9;
  for(let i=0;i<n;i++){
      if(array[i]>maxi){
          secmaxi=maxi;
          maxi=array[i];
      }
      else if(array[i]<maxi && array[i]>secmaxi){
          secmaxi=array[i];
      }
  }
  if(secmaxi==-1e9) return null;
  return secmaxi;
}



// Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
function calculateFrequency(string) {
  // Write your code here
  let n=string.length;
  const freq={};
  for(let i=0;i<n;i++){
      if(!freq[string[i]]) freq[string[i]]=0;
      freq[string[i]]++;
  }
  return freq;
}



// Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
function flatten(unflatObject) {
  // Write your code here
  const ans={};
  for(var i in unflatObject){
      if(typeof unflatObject[i]!='object'){
       ans[i]=unflatObject[i];
      }
      else{
          var sub=flatten(unflatObject[i]);
          for(var j in sub){
              ans[i+'.'+j]=sub[j];
          }
      }
  }
  return ans;
}



// Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
function unflatten(flatObject) {
  // Write your code here
  const result = {};
  for (let key in flatObject) {
    const parts = key.split('.');
    let curr = result;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const nextPart = parts[i + 1];
      const isArray = nextPart !== undefined && !isNaN(nextPart);
      if (i === parts.length - 1) {
        curr[part] = flatObject[key];
      } else {
        if (!(part in curr)) {
          curr[part] = isArray ? [] : {};
        }
        curr = curr[part];
      }
    }
  }
  return result;
}
