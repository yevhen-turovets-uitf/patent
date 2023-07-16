const validators = [ 5, 9, 10, 12, 13, 15 ];


const textMasks = {
	PHONE: {
		mask: [ '+', 7, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/ ],
		placeholder: '+7 (XXX) XXX-XX-XX',
		unmask: str => str ? '+' + str.replace ( /\D+/g, '' ) : ''
	},
	SNILS: {
		mask: [ /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/ ],
		placeholder: 'XXX XXX XXX XX',
		unmask: str => str.replace ( /\D+/g, '' )
	},
	PASSPORT: {
		mask: [ /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/ ],
		placeholder: 'XXXX XXXXXX',
		unmask: str => str.replace ( /\D+/g, '' )
	},
	options: {
		guide: false
	}
};

validators.forEach (
	length => {
		const name = `Len${ length }NumberValidator`,
			mask = new Array ( length ).fill ( /\d/ ),
			placeholder = mask.map ( () => 'X' ).join ( '' );

		textMasks[ name ] = { mask, placeholder };
	}
);

export default textMasks;
