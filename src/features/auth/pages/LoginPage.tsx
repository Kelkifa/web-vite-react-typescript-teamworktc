import * as React from "react";

import {FastField, Formik} from "formik";

import AuthInputField from "../components/AuthInputField";
import {AuthLogin} from "../../../models";
import {authActions} from "../authSlice";
import {useAppDispatch} from "../../../app/hooks";

export const styles = {
	container: "mx-auto w-full md:w-[600px] bg-bgColor py-12",
	title: "text-2xl font-bold text-center pb-8",
	form: "flex flex-col gap-y-6 px-4",
};
export default function LoginPage() {
	const dispatch = useAppDispatch();
	const initialValues: {username: string; password: string} = {
		username: "",
		password: "",
	};

	const handleSubmit = (values: {username: string; password: string}) => {
		dispatch(authActions.login(values));
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Đăng Nhập</h1>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{formikProps => {
					const {handleChange, handleSubmit, handleBlur} = formikProps;

					return (
						<form onSubmit={handleSubmit} className={styles.form}>
							<FastField
								name="username"
								label="Tài khoản"
								placeHolder="Nhập tài khoản"
								component={AuthInputField}
							/>
							<FastField
								name="password"
								label="Mật Khẩu"
								placeHolder="Nhập mật khẩu"
								isPassword
								component={AuthInputField}
							/>
							<button
								className="bg-fuchsia-800/60 h-[36px] rounded-2xl mt-2"
								type="submit"
							>
								Đăng Nhập
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
