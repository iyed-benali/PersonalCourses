var names = ["iyed", "ahmed"];
names.push("mounir");
// names.push(3)
// names[0] = 3   won't work 
var numbers = [1, 2, 3, 4];
numbers.push(3);
// numbers.push("ahmed") won't work 
var mixed = [1, "ahmed"];
// mixed.push(true) won't work
mixed.push("AZA");
mixed.push(3);
console.log(numbers, 'numbers', mixed, 'mixed', names, 'strings');
////////////////////////////////////////////////
var ninja = {
    num: 3,
    sur: "iyed",
    boolean: true,
    skills: []
};
// ninja = {  won't work cause we cannot change the ennistial schema for the object that we declared 
//     color : "red",
//     sur : "iyed",
//     boolean : true,
//     skills : []
// }
