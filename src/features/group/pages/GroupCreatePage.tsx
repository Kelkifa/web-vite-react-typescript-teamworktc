import * as React from "react";
import * as yup from "yup";

import {FastField, Formik} from "formik";
import {getGroupCreateStatus, groupActions} from "../groupSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import BaseButton from "../../../components/form/BaseButton";
import BaseInputField from "../../../components/form/BaseInputField";

const schema = yup.object().shape({
	name: yup.string().required("Bạn chưa nhập tên nhóm"),
});

interface CreateGroup {
	name: string;
}

export default function GroupCreatePage() {
	const dispatch = useAppDispatch();
	const status = useAppSelector(getGroupCreateStatus);

	const initialValues: CreateGroup = {
		name: "",
	};

	const handleSubmit = (values: CreateGroup, {resetForm}: {resetForm: any}) => {
		resetForm();
		dispatch(groupActions.create(values));
	};
	return (
		<div className="container bg-bgColor p-3 pb-10">
			<h1 className="text-baseRed text-center font-bold">Tạo nhóm</h1>

			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				{formikProp => {
					const {handleSubmit} = formikProp;
					return (
						<form onSubmit={handleSubmit}>
							<FastField
								name="name"
								placeHolder="Nhập tên nhóm..."
								label="Tên nhóm"
								component={BaseInputField}
							/>
							<BaseButton
								className="bg-tim rounded-xl w-full px-2 whitespace-nowrap mt-3"
								loading={status?.loading}
								type="submit"
							>
								Tạo nhóm
							</BaseButton>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
