"use_strict"




class Rotor {

	constructor(p, id, tn){
		this.position = p;
		this.id = id;
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
	getId() { console.log(this.id); }
	getForwardPermutation() { console.log(this.forward_permutation); }
	getTurnoverNotch() { console.log(this.turnover_notch); }
}

let I = new Rotor("L", 1, "QR");
I.getPosition();
I.getId();
I.getForwardPermutation();
I.getTurnoverNotch();