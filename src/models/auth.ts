export interface Auth {
	fullname: string;
	username: string;
	email: string;
	password: string;
	[key: string]: string;
}

export type AuthLogin = Omit<Auth, "fullname">;

export interface ErrorStatus {
	loading?: boolean;
	error?: boolean;
	message?: string;
}

export interface InvitesResponse {
	_id: string;
	loading?: boolean;
	groupName: string;
	userInvite: string;
}
