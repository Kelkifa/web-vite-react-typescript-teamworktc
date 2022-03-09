export interface Note {
	_id?: string;
	title: string;
	to: string | Date;
	from: string | Date;
	todoList?: Todo[];
	color: string;

	loading?: boolean;
}

export interface Todo {
	_id?: string;
	todo: string;
	state: boolean;
	loading?: boolean;
}
