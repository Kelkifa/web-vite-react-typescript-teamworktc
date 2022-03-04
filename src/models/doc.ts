export interface Doc {
	_id: string;
	name: string;
	isGetDetail?: boolean;
	contentList: DocContent[];
}

export interface DocContent {
	title: string;
	_id: string;
	data?: string;
}
