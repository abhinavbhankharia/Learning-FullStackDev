 //here JS does not follow document order as settimeout is executed after the time duration hence showing asynchronous behaviour

 function hello() {
    console.log("welcome to adv javascript" );
 }

 setTimeout(() => {
    hello()
 }, 2000);

 for (let i = 0; i < 10; i++) {
    console.log(i);
 }