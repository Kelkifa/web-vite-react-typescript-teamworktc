import {useEffect, useState} from "react";

import {DataResponse} from "../models";

export function useDataStatus<T>(
	defaultValue: T,
	defaultStatus?: {loading: boolean; error?: string}
): [
	T,
	{loading: boolean; error?: string},
	(data: Promise<DataResponse<T>>) => Promise<void>
] {
	const [dataInfo, setDataInfo] = useState<T>(defaultValue);
	const [status, setStatus] = useState<{loading: boolean; error?: string}>(
		defaultStatus ? defaultStatus : {loading: true}
	);

	const getData = async (data: Promise<DataResponse<T>>) => {
		try {
			setStatus({loading: true});
			const response = await data;
			if (response.success === true) {
				setStatus({loading: false});
				setDataInfo(response.response);
				return;
			}
			setStatus({loading: false, error: "Server gặp sự cố"});
		} catch (err) {
			console.log(err);
			setStatus({loading: false, error: "Server gặp sự cố"});
		}
	};

	return [dataInfo, status, getData];
}
