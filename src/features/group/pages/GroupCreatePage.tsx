import * as React from "react";
import * as yup from "yup";

import {FastField, Formik} from "formik";
import {getGroupCreateStatus, groupActions} from "../groupSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import BaseButton from "../../../components/form/BaseButton";
import BaseInputField from "../../../components/form/BaseInputField";
import {startSectionBackgroundStyle} from "../../../components/StartSection";

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
		<div className={startSectionBackgroundStyle}>
			<div className="container mx-auto p-3 pb-10 bg-mygreendark2 text-black">
				<h1 className="text-[2rem] font-bold text-center">Tạo nhóm</h1>

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
									inputClassName="w-full rounded-lg bg-black text-white p-[0.5rem]"
									placeHolder="Nhập tên nhóm..."
									label="Tên nhóm"
									component={BaseInputField}
								/>
								<div className="text-center">
									<BaseButton
										className="px-6 bg-black text-white hover:text-mygreendark2 font-bold hover:border-none transition-all duration-500 h-[36px] rounded-3xl mt-2"
										loading={status?.loading}
										type="submit"
									>
										Tạo nhóm
									</BaseButton>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
