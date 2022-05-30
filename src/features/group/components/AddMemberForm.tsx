import {FastField, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import BaseButton from "../../../components/form/BaseButton";
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

	const handleSubmit = (
		values: FormValue,
		{resetForm}: {resetForm: () => void}
	) => {
		if (!groupId) return;
		dispatch(groupActions.invite({groupId, username: values.data}));
		resetForm();
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
								placeHolder="username"
								component={BaseInputField}
								className="flex-grow bg-black text-white"
							/>

							<BaseButton
								className="bg-black text-white rounded-r-xl px-8 hover:bg-[#2B2B2B]"
								type="submit"
							>
								Mời
							</BaseButton>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
