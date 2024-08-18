export interface Landing {
	button: string;
}

export interface EmailInput {
	tile: string;
	error: string;
	placeHolder: string;
}

export interface PassWordInput {
	title: string;
	error: string;
	placeHolder: string;
}

export interface Auth {
	emailInput: EmailInput;
	passWordInput: PassWordInput;
	toastMessage: string;
}

export interface Dictionary {
	landing: Landing;
	auth: Auth;
}