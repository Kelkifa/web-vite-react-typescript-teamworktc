import {useEffect, useState} from "react";

interface MultiCheckboxFormProp {
	children: ({
		checkedData,
		onClick,
		onClickCheckAll,
	}: {
		checkedData: (string | undefined)[];
		onClick: (value: boolean, index: number) => void;
		onClickCheckAll: (value: boolean) => void;
	}) => JSX.Element;
	dataList: (string | undefined)[];
}

function MultiCheckboxForm({children, dataList}: MultiCheckboxFormProp) {
	const emptyDataList = dataList.map(value => undefined);
	const [checkedData, setCheckedData] =
		useState<(string | undefined)[]>(emptyDataList);

	useEffect(() => {
		setCheckedData(emptyDataList);
	}, [dataList]);
	const onClick = (value: boolean, index: number): void => {
		const copyCheckedData = [...checkedData];
		copyCheckedData[index] = value ? dataList[index] : undefined;
		setCheckedData(copyCheckedData);
	};
	const onClickCheckAll = (value: boolean): void => {
		if (!value) {
			setCheckedData(emptyDataList);
			return;
		}

		setCheckedData(dataList);
	};

	return <>{children({onClick, onClickCheckAll, checkedData})}</>;
}

export default MultiCheckboxForm;
