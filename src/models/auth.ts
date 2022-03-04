export interface Auth {
	fullname: string;
	username: string;
	password: string;
	[key: string]: string;
}

export type AuthLogin = Omit<Auth, "fullname">;
