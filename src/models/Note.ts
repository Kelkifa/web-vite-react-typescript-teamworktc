export interface Note {
	_id?: string;
	name: string;
	to: string | Date;
	from: string | Date;
	color: string;

	loading?: boolean;

	isSocket?: boolean;
}
