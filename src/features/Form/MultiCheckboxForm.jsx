import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";

MultiCheckboxForm.propTypes = {
	dataList: PropTypes.array,
};

MultiCheckboxForm.defaultProps = {
	dataList: [1, 2, 3, 4],
};

function MultiCheckboxForm({dataList, children}) {
	const enptyDataArr = dataList.map(value => undefined);
	const [checkedData, setCheckedData] = useState(enptyDataArr);

	useEffect(() => {
		setCheckedData(dataList.map(value => undefined));
	}, []);

	/**
	 *
	 * @param {Boolean} value true: checked, false: note checked
	 * @param {*} index index of data in list
	 */
	const handleChange = (value, index) => {
		const copyCheckedData = [...checkedData];
		copyCheckedData[index] = value ? dataList[index] : undefined;
		setCheckedData(copyCheckedData);
	};

	/**
	 *
	 * @param {Boolean} value true: checked, false: note checked
	 */
	const handleCheckedAll = value => {
		if (!value) {
			setCheckedData(enptyDataArr);
			return;
		}

		setCheckedData(dataList);
	};

	return <>{children({handleChange, handleCheckedAll, checkedData})}</>;
}

export default MultiCheckboxForm;
