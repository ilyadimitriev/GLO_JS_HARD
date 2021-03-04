const validMain = new Validator({
	selector: `#form1`,
	method: {
		'form1-phone': [
			[`notEmpty`],
			[`pattern`, `phone`]
		],
		'form1-email': [
			[`notEmpty`],
			[`pattern`, `email`]
		],
		'form1-name': [
			[`notEmpty`],
			[`pattern`, `text`]
		]
	},
});
validMain.init();

const validFooter = new Validator({
	selector: `#form2`,
	method: {
		'form2-phone': [
			[`notEmpty`],
			[`pattern`, `phone`]
		],
		'form2-email': [
			[`notEmpty`],
			[`pattern`, `email`]
		],
		'form2-name': [
			[`notEmpty`],
			[`pattern`, `text`]
		],
		'form2-message': [
			[`notEmpty`],
			[`pattern`, `text`]
		]
	},
});
validFooter.init();

const validPopUp = new Validator({
	selector: `#form3`,
	method: {
		'form3-phone': [
			[`notEmpty`],
			[`pattern`, `phone`]
		],
		'form3-email': [
			[`notEmpty`],
			[`pattern`, `email`]
		],
		'form3-name': [
			[`notEmpty`],
			[`pattern`, `text`]
		]
	},
});
validPopUp.init();
