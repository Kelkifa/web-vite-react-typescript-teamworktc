import {User} from "./user";

export interface Group {
	_id?: string;
	name?: string;
	users?: User[];
	loading?: boolean;
	type: "user" | "demo";
	adminId?: string;
}
