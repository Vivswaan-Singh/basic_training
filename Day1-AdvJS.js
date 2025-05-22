//1. Create a function to calculate the factorial of a number using closure
function factorial(){
    let cache={};
    function fact(n){
        if(n<0) return -1;
        if(n==0 || n==1) return 1;
        if(!cache[n]) cache[n]=n*fact(n-1);
        console.log(n,cache[n]);
        return cache[n];
    }
    return fact;
}

//2. Write a JavaScript program to test if the first character of a string is uppercase or not, if not then set the first character to uppercase
function capitalise(str){
    str=str.trim();
    if(str[0]>='a' && str[0]<='z'){
        return str[0].toUpperCase()+str.slice(1);
    }
    return str;
}

/*3. Create a constructor function Calculator that creates objects with 3 methods:

read() asks for two values using prompt and remembers them in object properties.

sum() returns the sum of these properties.

mul() returns the multiplication product of these properties.*/
function Calculator(){
    this.x=0;
    this.y=0;
    this.read=function (){
        this.x=(prompt("Enter first no: ",0));
        this.y=(prompt("Enter second no: ",0));
    }
    this.sum=function (){
        return this.x+this.y;
    }
    this.mul=function (){
        return this.x*this.y;
    }
}

//Deep clone Javascript Object (without using any internal methods of cloning). All properties along with functions, prototypes should get cloned to target objects.
function deepClone(obj){
    if(typeof(obj)!='object'|| obj==null){
        return obj;
    }
    var ans={};
    ans.__proto__=obj.__proto__;
    for(let i in obj){
        if(typeof(obj[i])!='object'){
            ans[i]=obj[i];
        }
        else{
            ans[i]=deepClone(obj[i]);
        }
    }
    return ans;
}