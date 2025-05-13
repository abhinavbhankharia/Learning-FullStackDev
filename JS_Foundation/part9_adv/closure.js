function outer() {
    let counter = 4
    return function inner() {
        counter++
        return counter
    }
}

let increment = outer()
console.log(increment());
