const person = {
    name : "abhinav",
    greet(){
        console.log(`Hi, I am ${this.name}`);
    },
};

person.greet()

const greetFunction = person.greet        //here context is lost and execution has non idea about the variables
greetFunction()

//to keep the context, we use the bind keyword. 
const boundGreet = person.greet.bind({name : "abhi"})   //binding the context and then passing the data

//bind, call and apply

// Task 1
const Person = {
    name: 'abhinav',
    introduce(){
        coonsole.log(`Hi, I am ${this.name}`)
    }
};
let boundIntroduce = Person.introduce.bind({name : "abhinav"})

// Task 2
function introduce() {
    return `Hi, my name is ${this.name}`;
}
let callIntroduce = introduce.call(Person);

// Task 3
function sum(a, b) {
    return a+b;
}
let sumApply = sum.apply(null, [1,2,3,4,5]);

