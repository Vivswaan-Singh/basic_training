/*
1. RegExp_password = /^[^.](?!.*\.\.)[a-zA-Z0-9!$'.#%&*+-\/=?}{|~^_`]+[^.]$/
2. RegExp_email = /^[^.](?!.*\.\.)[A-Za-z0-9.]{6,30}(?<!\.)@[a-z0-9-]+\.[a-z]{2,}$/
3. RegExp_creditCard = /^(?:\d{4}[-\s]?){4}\d{4,7}$/;
*/

//4. Write a regex function to distinguish and pick the values of email address, phone number from the below paragraph

const str="Lorem ipsum dolor 9221122108 sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida. mytraining@deqode.com Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet luctus venenatis lectus magna fringilla. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. +91-20200-21210 Sagittis orci a scelerisque purus semper eget duis. Nulla pharetra diam sit amet nisl suscipit. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Fusce (+91)-20200-21210 ut placerat mt@test.inc orci nulla. Pharetra vel turpis nunc eget lorem dolor. Tristique senectus et netus et malesuada."
const emailre=/\b[^.](?!.*\.\.)[a-z.]+(?<!\.)@[a-z0-9-]+\.[a-z]{2,}\b/g;
const phonere = /(?:\+91[-\s]?)?\(?\d{5}\)?[-\s]?\d{5}/g;
const emails = str.match(emailre);
const phones = str.match(phonere);

console.log(emails,phones);

//5. Implement the setTimeout function using native javascript only. 

function customTimeout(callback,delay){
    const start=Date.now();
    while(Date.now()-start<delay){;}
    callback();
}

//6. Implement a javascript Array having the following prototype functions without using Native javascript array:

function Arr(){
    this.length=0;
    this.push= function (...params){
        for(let x of params){
            this[this.length++]=x;
        }
    };
    this.pop=function (){
        if(this.length==0) return undefined;
        let x=this[this.length-1];
        delete this[this.length-1];
        this.length--;
        return x;
    };
    this.shift=function(){
        if(this.length==0) return undefined;
        let x=this[0];
        for(let i=0;i<this.length-1;i++){
            this[i]=this[i+1];
        }
        this.length--;
        delete this[this.length];
        return x;
    }
    this.getLength=function (){return this.length;};
    this.indexOf=function (x,start){
        if((start)>=this.length) return -1;
        if((start)<-1*this.length) start=0;
        else if(start<0 && start>-1*this.length){
            start+=this.length;;
        }
        for(let i=start;i<this.length;i++){
            if(this[i]==x) return i;
        }
        return -1;
    }
    this.unshift=function(...params){
            temp=new Arr();
            for(let i of params){
                temp.push(i);
            };
            for(let i=temp.length-1;i>-1;i--){
                this.unshift_indiv(temp[i]);
            }
            delete temp;
    }
    this.unshift_indiv=function(x){
        this[this.length]=-1;
        this.length++;
        for(let i=this.length-1;i>0;i--){
            this[i]=this[i-1];
        }
        this[0]=x;
    }
    this.forEach=function(callback){
        for(let i=0;i<this.length-1;i++){
            callback(this[i]);
        }
    }
    this.splice=function(start,delcnt,...params){
        if(start<-1*this.length) start=0;
        else if(start<0 && start>-1*this.length){
            start+=this.length;
        }
        else if(start>=this.length){
            for(let x of params){
                this.push(x);
                delcnt--;
                if(delcnt<=0) return;
            }
            return ;
        }
        let i=start,cnt=0;
        for(let x of params){
            this[i++]=x;cnt++;
            if(i>=this.length || i>=start+delcnt) break;
        }
        newdelcnt=delcnt-cnt;
        while(i<start+delcnt && i<this.length && newdelcnt--){
            for(let j=i;j<this.length-1;j++){
                this[j]=this[j+1];
            }
            this.pop();
        }
    }
}

//7. Provided a function that checks the validity of string and returns results via a callback. Check if values in array (see below example) are valid or not.

function validateString(input, callback) { //given in task as it is
    setTimeout(function () {
      // input is said to be valid if it is a lowercase string
      if (typeof input === "string" && input === input.toLowerCase()) {
        return callback(null, true)
      }
      return callback(new Error('Invalid string'), null)
    }, 500)
  
  }
  const input = ['first', 'Second', 'thiRd', 4, false, 'true'];
  let finalResult={}; 
  function validateAsync(value) {
      return new Promise((resolve) => {
          validateString(value, (err, result) => {
            resolve({ [String(value)]: result === true });
          });
        });
  }
  Promise.all(input.map(validateAsync)).then(results => {
      finalResult = Object.assign({}, ...results);
  }).finally(()=>{console.log(finalResult);});
  
