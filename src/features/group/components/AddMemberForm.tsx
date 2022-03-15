import {FastField, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import BaseInputField from "../../../components/form/BaseInputField";
import {groupActions} from "../groupSlice";

interface FormValue {
	data: string;
}
export default function AddMemberForm() {
	const dispatch = useAppDispatch();
	const groupId = useAppSelector(state => state.group.selectedGroup?._id);
	const initialValues: FormValue = {
		data: "",
	};

	const handleSubmit = (values: FormValue) => {
		if (!groupId) return;
		const processValue = values.data.replaceAll(" ", "").split(",");
		console.log(processValue);
		dispatch(groupActions.addMembers({groupId, userList: processValue}));
	};
	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formikProps => {
					const {handleSubmit} = formikProps;

					return (
						<form className="flex gap-2" onSubmit={handleSubmit}>
							<FastField
								name="data"
								placeHolder="username1, username2,..."
								component={BaseInputField}
								className="flex-grow"
							/>

							<button className="bg-tim rounded-r-xl px-8" type="submit">
								Thêm
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
