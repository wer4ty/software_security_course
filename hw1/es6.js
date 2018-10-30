"use_strict"

// Arrow function L2
function cicleArea1(r) {
	let PI = 3.14;
	return PI * r *r;
}

let cicleArea2 = (r) =>  {
	const PI = 3.14;
	return PI * r *r;
}

let cicleArea3 = r => 3.14 * r * r;

// console.log(cicleArea1(7));
// console.log(cicleArea2(7));
// console.log(cicleArea3(7));


// Template literals L3
let name = "Roma";
//console.log("My favorite person is "+ name + " because he is smells good");
//console.log(`My favorite person is ${name} because he is smells good`);

let a = 5;
let b = 7;

//console.log(`My favorite person is ${a + b} because he is smells good`);

// Spread operator L4
function addNumbers(a,b,c) {
//	console.log(a+b+c);
}

var nums = [3,4,5];
//addNumbers(nums[0], nums[1], nums[2]);
addNumbers(... nums);

var meats = ['bacon', 'ham'];
var food = ['apples', ...meats, 'kiwi', 'rise'];
//console.log(food);


// Classes L5 + Inheritance L6
class Person {

	constructor(name, age, weight){
		this.name = name;
		this.age = age;
		this.weight = weight;
	}

	displayName() {console.log(this.name); }
	displayAge() { console.log(this.age); }
	displayWeight() { console.log(this.weight);}
}

class Programmer extends Person {

	constructor(name, age, weight, language){
		super(name, age, weight);
		this.language = language;
	}

	displayLanguage() {console.log(this.language); }

}

let r = new Person('Roma', 25, 75);
let q = new Person('Qiwi', 24, 55);
//q.displayWeight();

let pp = new Programmer('RAs', 22, 80, 'JavaScript');
//pp.displayLanguage();


// Generators L6
function* sampleGenerator() {
	yield 'apples';
	yield 'bacon';
	console.log('ok this is a line after a bacon');
	yield 'corn';
}

let sample = sampleGenerator();
//console.log(sample.next());
console.log(sample.next().value);
console.log(sample.next().value);
console.log(sample.next().value);