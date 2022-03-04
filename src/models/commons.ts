export interface DataResponse<T> {
	success: boolean;
	message: string;
	response: T;
	token?: string;
}

export interface DataResponseToken<T> {
	success: boolean;
	message: string;
	response: T;
	token: string;
}

export type DefaultResponse = Omit<DataResponse<any>, "response">;
