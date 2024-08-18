export interface Landing {
	button: string;
}

export interface EmailInput {
	title: string;
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
	submit: string;
}

export interface NavBar {
	home: string;
	account: string;
	workers: string;
	settings: string;
	entities: string;
}

export interface Home {
	as: string;
	signOut: string;
}

export interface Toast {
	error: string;
	successful: string;
}

export interface InputName {
	title: string;
	description: string;
	help: string;
	button: string;
	toast: Toast;
	error:string
}

export interface InputEmail {
	title: string;
	description: string;
	help: string;
	button: string;
}

export interface Account {
	title: string;
	inputName: InputName;
	inputEmail: InputEmail;
}

export interface Mode {
	light: string;
	dark: string;
	system: string;
}

export interface Setting {
	title: string;
	subTitle: string;
	text: string;
	modes: Mode;
}

export interface EmptyState {
	title: string;
	text: string;
	button: string;
}

export interface InputName {
	title: string;
	error: string;
}

export interface InputAddres {
	title: string;
	error: string;
}

export interface InputSalary {
	title: string;
	error: string;
}

export interface InputCi {
	title: string;
	error: string;
}

export interface InputPhoneNumber {
	title: string;
	error: string;
}

export interface Modal {
	titleCreate: string;
	titleUpdate: string;
	inputName: InputName;
	inputAddress: InputAddres;
	inputSalary: InputSalary;
	inputCi: InputCi;
	inputPhoneNumber: InputPhoneNumber;
}

export interface Pdf {
	button: string;
}

export interface Report {
	title: string;
	salaryTendency: string;
	salaryAverage: string;
	bestSalary: string;
}

export interface Day {
	sunday: string;
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
}

export interface Worker {
	title: string;
	emptyState: EmptyState;
	modal: Modal;
	pdf: Pdf;
	report: Report;
	days: Day;
}

export interface Dictionary {
	landing: Landing;
	auth: Auth;
	navBar: NavBar;
	home: Home;
	account: Account;
	settings: Setting;
	workers: Worker;
}