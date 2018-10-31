"use_strict"




class Rotor {

	constructor(p, ind, fd, rv, tn){
		this.position = p; // Left, Middle, Right
		this.index = ind; // 01 - 26
		this.forward_permutation = fd; // ABCDEFGHIJKLMNOPQRSTVWXYZ
		this.reverse_permutation = rv; // ZYXWVTSRQPONMLKJIHGFEDCBA
		this.turnover_notch = tn; // Q -> R
	}


 	mixing() {
		let array = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	    let m = array.length, t, i; 
		while (m) {
		    i = Math.floor(Math.random() * m--);
		    t = array[m];
		    array[m] = array[i];
		    array[i] = t;
		}
		return array;
	}

	getPosition() { console.log(this.position); return this.position; }
	getIndex() { console.log(this.index); return this.index }
	getForwardPermutation() { console.log(this.forward_permutation); return this.forward_permutation; }
	getReverscePermutation() { console.log(this.reverse_permutation); return this.reverse_permutation; }
	getTurnoverNotch() { console.log(this.turnover_notch); return this.turnover_notch; }
	incrementIndex() { this.index = (this.index + 1) % 26; }
}


class Enigma {

	constructor(r1,r2,r3) {
		this.leftRotor = r1;
		this.middleRotor = r2;
		this.rightRotor = r3;
	}
}
