//1. Write a function testNum that takes a number as an argument and returns a Promise that tests if the value is less than or higher than the value 10.

function testNum(x){
    return new Promise((res,rej)=>{
        if(x>10) res("BIG");
        else rej("SMALL")
    })
}

//2. Write two functions that use Promises that you can chain! The first function, makeAllCaps(), will take in an array of words and capitalize them, and then the second function, sortWords(), will sort the words in alphabetical order. If the Array contains anything but Strings, it should throw an error.

function makeAllCaps(arr){
    return new Promise((res,rej)=>{
        for(let i=0;i<arr.length;i++){
            if(typeof arr[i]!='string'){
                 rej(`Invalid input at index ${i}`);
            }
            else{ 
                arr[i]=arr[i].toUpperCase();
            }
        }
        res(arr);
    })
}
function sortWords(arr){
    arr.sort((c1,c2)=> c1.charCodeAt()<c2.charCodeAt());
}
arr=["Hi",123,"AORld"];
makeAllCaps(arr).then(sortWords).catch(console.log).finally(()=>console.log(arr));

//3. Using Promise create a function named 'sleep' that should invoke a callback function after x seconds. NOTE: sleep function should not block the call stack.

function sleep(callback,x){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            callback();
        },x*1000);
        res("Out of sleep");
        rej("Something went wrong");
    })
}

//4. Let's assume that we have a for loop that prints 0 to 10 at random intervals (0 to 6 seconds). We need to modify it using promises to print sequentially 0 to 10. For example, if 0 takes 6 seconds to print and 1 takes two seconds to print, then 1 should wait for 0 to print, and so on.

function wait(i){
    return new Promise((res)=>{
        let delay=Math.floor(Math.random()*6000);
        setTimeout(function() {
            console.log(i);
            res();
        }, delay);
    })
}
async function count(){
    for(let i = 0; i < 10; i++) {
        await wait(i);
    } 
}

//5. The following recursive code will cause a stack overflow if the array "somelist" is too large. How can you fix this and still retain the recursive pattern?

var somelist = readVeryLongList();

var nextItem = function() {

   var item = somelist.pop();

   if (item) {

       // process the list item...

       setTimeOut(nextItem,0);

   }
};

//6. Modify the snippet to print values from 0 to 9.


// Modification 1
for(let i = 0; i < 10; i++) {

   setTimeout(function() {

     console.log(i); 

   }, 10);

} 

//Modification 2
for(var i = 0; i < 10; i++) {

   ((num)=>{setTimeout(function() {

     console.log(num); 

   }, 10)})(i);

} 
