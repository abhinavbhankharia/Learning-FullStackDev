//generator function does not execute everthing at once, instead creates things on resume basis
//yield is used instead of return for each execution

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3; 
    
}

const gen = numberGenerator()
const genTwo = numberGenerator();

//console.log(gen);
//console.log(gen());
//console.log(numberGenerator());

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

console.log(genTwo.next().value);
console.log(genTwo.next().value);