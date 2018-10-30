"use_strict"




class Rotor {

	constructor(p, ind, tn){
		this.position = p;
		this.index = ind;
		this.forward_permutation = this.mixing();
		this.turnover_notch = tn;
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

	getPosition() { console.log(this.position); }
	getIndex() { console.log(this.index); }
	getForwardPermutation() { console.log(this.forward_permutation); }
	getTurnoverNotch() { console.log(this.turnover_notch); }
}

let I = new Rotor("L", 1, "QR");
I.getPosition();
I.getIndex();
I.getForwardPermutation();
I.getTurnoverNotch();