const getById = (name) => {
	const el = document.getElementById(name);
	if (el === null) {
		alert(`Element with ID ${name} not present`);
	}

	return el;
};

const getInputElements = () => {
	/**
	 * @typedef {Object} InputElements
	 * @property {HTMLInputElement} fullName
	 * @property {HTMLInputElement} experience
	 * @property {HTMLInputElement} cgpa
	 * @property {HTMLInputElement} education
	 * @property {HTMLInputElement} about
	 * @property {HTMLInputElement} contact
	 * @property {HTMLInputElement} skills
	 * @property {HTMLInputElement} address
	 * @property {HTMLFormElement} cvForm
	 * @property {HTMLButtonElement} submitBtn
	 */

	/** @type {InputElements} */
	const res = {};

	for (const name of [
		"fullName",
		"experience",
		"cgpa",
		"education",
		"about",
		"contact",
		"skills",
		"address",
		"cvForm",
		"submitBtn",
	]) {
		const el = getById(name);
		if (!el) return null;
		res[name] = el;
	}

	return res;
};

document.addEventListener("DOMContentLoaded", (_) => {
	const elements = getInputElements();
	if (elements === null) return;

	const {
		fullName,
		experience,
		cgpa,
		education,
		about,
		contact,
		skills,
		address,
		cvForm,
		submitBtn,
	} = elements;

	submitBtn.addEventListener("click", (ev) => {
		ev.preventDefault();

		if (!cvForm.reportValidity()) {
			return;
		}

		alert("isOk");
	});
});
