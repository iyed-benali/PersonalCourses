let character : string
let age : number
let isBigger : boolean


age = 30 
character = 'Mario' 
isBigger =true

//arrays 
let array : string[] = []
array= ['Mushroom', 'Princess Peach']
array.push("ahmed")
//unions types 

let mixed :(string|number|boolean)[]=[]

mixed.push("ahmed")
mixed.push(3)
mixed.push(true)
console.log(mixed)

let uid : string|number
uid = "ahmed",
uid = 3 
//objects
let ninjaOne : object;
ninjaOne = {name:'iyed',age: 30}
ninjaOne = []
console.log(ninjaOne)



let ninjaTwo : {
    name : string,
    age : number,
    arr : []
}

ninjaTwo = {
    name : "ahmed",
    age : 30,
    arr: []
}