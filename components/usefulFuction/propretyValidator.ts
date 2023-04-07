export const isMail = (mail: string) => {
	let expressionReguliere =
		/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
	if (expressionReguliere.test(mail)) return true;
	else false;
	return false;
};

export const isPhoneNumber = (number: string) => {
	if (Number(number)) return true;
	if (number[0] == "+") {
		const newNumber = number.split("");
		delete newNumber[0];
		if (Number(newNumber.join("")) && newNumber.length > 9) return true;
		else return false;
	} else return false;
};

export const isValidContactValue = (contact: string) => {
	if (isMail(contact)) return true;
	if (isPhoneNumber(contact)) return true;
	return false;
};

export const isTwoWord = (words: string) => {
	if (words.split(" ").length == 2 && words.split(" ")[1].length > 2)
		return true;
	return false;
};
