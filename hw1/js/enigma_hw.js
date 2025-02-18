// HW1 Software Security 338057227 Roma Chychkovych

class Substitutor {
	constructor() {
		this.baseAZ = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}

	isLetter(c) {
		// check if letter: true => return upper case letter
		let x = c.match(/[a-z]/i);
		if ( x !== null) {
			return x[0].toUpperCase();
		}
		// false return undefined
	  return x;
	}

	indexViaAZ(c) {
		if (c !== undefined) 
	 	return this.baseAZ.indexOf(c.toUpperCase()); 
	}

	circular_shift(ind) {
		console.time('circular_shift');
		if (ind > 26) { ind = ind - 26;}
		if(ind < 1) { ind = 26 - Math.abs(ind); }
		console.timeEnd('circular_shift');
		return ind;
	}
}	

class Translator extends Substitutor {
	constructor(az){
		super();
		this.az = az;
	}

	getAZ() { return this.az; }
	setAZ(az) { this.az = az; }

	simple_translate(c) {
		let ind = this.indexViaAZ(c);
		if (this.isLetter(c) === undefined) return;
		else if(ind !== -1 ) return this.az[ind];
		return c;
	}
}

class Plugboard extends Translator {
	constructor(az){
		super(az);
	}

	inputCheck(str) {
		//ZU HL CQ WM OA PY EB TR DN VI
		if (str === undefined || str === "") return true;
		else {

			let k = str.split(" ");
			if (k.length <= 1) { return false; }

			let i = 0;
			let tmp_arr = new Array(26);

			while (i<k.length) {
				let a_ind = this.indexViaAZ(k[i][0]);
				if (tmp_arr[a_ind] !== undefined) { return false; }
				else { tmp_arr[a_ind] = k[i][1]; }

				a_ind = this.indexViaAZ(k[i][1]);
				if (tmp_arr[a_ind] !== undefined) { return false; }
				else { tmp_arr[a_ind] = k[i][0]; }

				i++;
			}
			return true;
		}
	}

	translate(c) {
		if (this.az === undefined || this.az === "" ) { return c; }
		let tmp = this.az.split(" ");

		for (let i=0; i<tmp.length; i++) {
			let t = tmp[i].split("");
			if (t[0].toUpperCase() === c.toUpperCase()) { return t[1].toUpperCase(); }
			if (t[1].toUpperCase() === c.toUpperCase()) { return t[0].toUpperCase(); }
		}
		return c.toUpperCase();
	}
}

class Reflector extends Translator {
	constructor(az){
		super(az);
	}
}

class Rotor extends Translator {
	constructor(az, setting, offset, notch){
		super(az);
		this.offset = offset;
		this.setting = setting;
		this.notchLetter = notch;
		this.reverseAZ = new Array(26);
		this.reverseAZ[0] = " ";
	}

	getOffset() { return this.offset; }
	getSetting() { return this.setting; }
	getNotchLetter() { return this.notchLetter; }
	getReverse() { return this.reverseAZ; }

	setSetting(s) {this.setting = s; }
	setOffset(off) { this.offset = off; }

	incrementOffset() {
		this.offset++;
		if(this.offset > 26 || this.offset < 1) { this.offset = 1; }
	}

	translate_forward_reverse(c, direction) {
		console.time('translate_forward_reverse');

		let i1 = 1; // index to run over A-Z array
		let i2 = 1; // index to run over rotor's array
		
		// base AZ shifts
		i1 = this.indexViaAZ(c) + this.offset; // shift right (via offset)
		i1 = this.circular_shift(i1);
		i1 = i1 - this.setting;	// shift left (via setting)
		i1 = this.circular_shift(i1);

		// forward direction
		if (direction) {
			let l = this.az.charAt(i1);
			i1 = this.baseAZ.indexOf(l);
		}

		// reverse direction
		else {
			let d = this.reverseAZ.join("");
			let l = d.charAt(i1);
			i1 = this.baseAZ.indexOf(l);
		}

		// rotor AZ shifts
		i2 = i1 - this.offset; // shift left (via offset)
		i2 = this.circular_shift(i2);
		i2 = i2 + this.setting;	// shift right (via setting)
		i2 = this.circular_shift(i2); 


		console.timeEnd('translate_forward_reverse');
		return this.baseAZ.charAt(i2);
	}

	generateReverseAZ() {
		for (let i = 1; i<this.baseAZ.length; i++) {
			let a_ind = this.indexViaAZ(this.baseAZ[i]);
			let a_let = this.az.charAt(a_ind);
			a_ind = this.indexViaAZ(a_let);
			this.reverseAZ[a_ind] = this.baseAZ[i];
		}
 	}


	notch() {
		if (this.indexViaAZ(this.notchLetter) === this.offset) {
			return true;
		}
		return false;
	}
}

class Enigma extends Substitutor {
	constructor(reflector, plugboard, leftRotor, middleRotor, rightRotor) {
	 super(); 
	 this.reflector = reflector;
	 this.plugboard = plugboard;
	 this.leftRotor = leftRotor;
	 this.middleRotor = middleRotor;
	 this.rightRotor = rightRotor;
	}

	setLeftRotor(rotor) { this.leftRotor = rotor; }
	setMiddleRotor(rotor) { this.middleRotor = rotor; }
	setRightRotor(rotor) { this.rightRotor = rotor; }

	getLeftRotor() { return this.leftRotor; }
	getMiddleRotor() { return this.middleRotor; }
	getRightRotor() { return this.rightRotor; }

	notchingCheck() {
	if (this.rightRotor.notch() || this.middleRotor.notch()) {
			if(this.middleRotor.notch()) {
				this.leftRotor.incrementOffset();
			}
			this.middleRotor.incrementOffset();
		}
		this.rightRotor.incrementOffset();
	}

	 encrypt(c) {
	 	console.time('encrypt');

	 	console.time('plugboard_translate_f');
		let step1 = this.plugboard.translate(c);
		console.timeEnd('plugboard_translate_f');

		this.notchingCheck();

		this.rightRotor.generateReverseAZ();
		this.middleRotor.generateReverseAZ();
		this.leftRotor.generateReverseAZ();

		let step2 = this.rightRotor.translate_forward_reverse(step1, true);
		let step3 = this.middleRotor.translate_forward_reverse(step2, true);
		let step4 = this.leftRotor.translate_forward_reverse(step3, true);

		console.time('reflector_translate');
		let step5 = this.reflector.simple_translate(step4);
		console.timeEnd('reflector_translate');

		let step6 = this.leftRotor.translate_forward_reverse(step5, false);
		let step7 = this.middleRotor.translate_forward_reverse(step6, false);
		let step8 = this.rightRotor.translate_forward_reverse(step7, false);

		console.time('plugboard_translate_r');
		let step9 = this.plugboard.translate(step8);
		console.timeEnd('plugboard_translate_r');


		console.timeEnd('encrypt');
		return step9;
	}
}

// Testing
let plu = new Plugboard(undefined); // empty
let ref = new Reflector(" YRUHQSLDPXNGOKMIEBFZCWVJAT"); 

let rotor1 = new Rotor(" EKMFLGDQVZNTOWYHXUSPAIBRCJ", 1, 1, "Q");
let rotor2 = new Rotor(" AJDKSIRUXBLHWTMCQGZNPYFVOE", 1, 1, "E");
let rotor3 = new Rotor(" BDFHJLCPRTXVZNYEIWGAKMUSQO", 1, 1, "V");
let rotor4 = new Rotor(" ESOVPZJAYQUIRHXLNFTGKDCMWB", 1, 1, "J");
let rotor5 = new Rotor(" VZBRGITYUPSDNHLXAWMJQOFECK", 1, 1, "Z");

// reflector, plugboard, leftRotor, middleRotor, rightRotor
let test_machine = new Enigma(ref, plu, rotor1, rotor2, rotor3);

function default_conf() {
	$("tr").removeClass("highlight");
	plu.setAZ(undefined); // empty

	rotor1.setOffset(1); $(".r_off1").val("1");
	rotor1.setSetting(1); $(".r_set1").val("1");

	rotor2.setOffset(1); $(".r_off2").val("1");
	rotor2.setSetting(1); $(".r_set2").val("1");

	rotor3.setOffset(1);	$(".r_off3").val("1");
	rotor3.setSetting(1);   $(".r_set3").val("1");

	rotor4.setOffset(1); 	$(".r_off4").val("1");
	rotor4.setSetting(1);	$(".r_set4").val("1");

	rotor5.setOffset(1);	$(".r_off5").val("1");
	rotor5.setSetting(1);	$(".r_set5").val("1");

	test_machine.setLeftRotor(rotor1);	$(".r_pos1").val("1");  $("#r1").addClass("highlight");
	test_machine.setMiddleRotor(rotor2); $(".r_pos2").val("2"); $("#r2").addClass("highlight");
	test_machine.setRightRotor(rotor3);	$(".r_pos3").val("3");  $("#r3").addClass("highlight");

	$(".r_pos4").val("0");
	$(".r_pos5").val("0");


}

function new_conf() {
	$("tr").removeClass("highlight");

	if (!(plu.inputCheck($("#plugboard_setup").val()))) {
		error_display("Plugboard configuration wrong. Pay attention :) ");
	}

	plu.setAZ($("#plugboard_setup").val());

	rotor1.setOffset(parseInt($(".r_off1").val()));
	rotor1.setSetting(parseInt($(".r_set1").val()));

	rotor2.setOffset(parseInt($(".r_off2").val()));
	rotor2.setSetting(parseInt($(".r_set2").val()));

	rotor3.setOffset(parseInt($(".r_off3").val()));
	rotor3.setSetting(parseInt($(".r_set3").val()));

	rotor4.setOffset(parseInt($(".r_off4").val()));
	rotor4.setSetting(parseInt($(".r_set4").val()));

	rotor5.setOffset(parseInt($(".r_off5").val()));
	rotor5.setSetting(parseInt($(".r_set5").val()));

	function position_determine(v, rIndex) {
		let tmp_rotor, tmp;

		switch(rIndex) {
			case '1': tmp_rotor = rotor1; tmp = 1; break;
			case '2': tmp_rotor = rotor2; tmp = 2; break;
			case '3': tmp_rotor = rotor3; tmp = 3; break;
			case '4': tmp_rotor = rotor4; tmp = 4; break;
			case '5': tmp_rotor = rotor5; tmp = 5; break;
		}

		switch (v) {
			case '1': test_machine.setLeftRotor(tmp_rotor); $("#r"+tmp).addClass("highlight"); break;
			case '2': test_machine.setMiddleRotor(tmp_rotor); $("#r"+tmp).addClass("highlight"); break;
			case '3': test_machine.setRightRotor(tmp_rotor); $("#r"+tmp).addClass("highlight"); break;
			default: break;
		}
	}

	position_determine($(".r_pos1").val(), '1'); 
	position_determine($(".r_pos2").val(), '2'); 
	position_determine($(".r_pos3").val(), '3'); 
	position_determine($(".r_pos4").val(), '4'); 
	position_determine($(".r_pos5").val(), '5'); 

}

function update_offset() {
	$(".r_off1").val(rotor1.getOffset());
	$(".r_off2").val(rotor2.getOffset());
	$(".r_off3").val(rotor3.getOffset());
	$(".r_off4").val(rotor4.getOffset());
	$(".r_off5").val(rotor5.getOffset());
}

function letterCheck() {
	if (event.keyCode >= 48 && event.keyCode <= 57) {
	    return false;
	} else if (event.keyCode >= 65 && event.keyCode <= 90) {
	    return true;
	} else if (event.keyCode >= 97 && event.keyCode <= 122) {
	    return true;
	}
	return false;
}

function error_display(error_text) {
	$(".error_text").text(error_text);
	$(".shadow, .modal").fadeIn();
}

function error_close() {
	$(".shadow, .modal").fadeOut();
}

// primitive gui
$(function(){

	default_conf();
	$( "#plainttext" ).focus();

	$("#plainttext").keyup(function(){
		let x = $(this).val();
		
		//whitespace
		if ((x == ' ') || (x == '\t') || (x == '\n')) { 
			$("#message").val($("#message").val().concat(x));
			$("#plainttext").val(x[x.length-1]);
		}

		if (x.match(/[0-9]/i)) {
			error_display("Sorry I am enigma not a personal computer type only letters please");
		}

		if (letterCheck(x)) {
			// encryption
			$("#cifertext").val(test_machine.encrypt(x[x.length-1]));
			$("#plainttext").val(x[x.length-1]);
			$("#message").val($("#message").val().concat($("#cifertext").val()));
			update_offset();
		}

	});

	// clear input 
	$(".clear_btn").click(function(){
		$("#cifertext, #plainttext, #message").val("");
	});

	// reset enigma settings
	$("#reset_m").click(function() {
		default_conf();
	});

	// save new settings
	$("#save_m").click(function(){
		new_conf();
		$(".saved_action").fadeIn().delay(1000).fadeOut();
	});

	// lock the values 
	$(".locking").change(function(){
		let t = $(this).val();
		let id = $(this).attr('id');
		$(".locking").each(function() {
			if( $(this).val() === t && $(this).attr('id') !== id ) {
				$(this).val("0"); $(this).parent().parent().removeClass("highlight");
			}
		});
		$(this).parent().parent().addClass("highlight");
	});

	$( "#plugboard_setup" ).autocomplete({
      source: ["ZU HL CQ WM OA PY EB TR DN VI", "AT CE RL"]
    });

    //error reporting close
    $(".closeModal").click(function(){
    	error_close();
    });

});