import {User} from "./user";

export interface Group {
	_id: string;
	name: string;
	users: User[];
	type: "user" | "demo";
}
