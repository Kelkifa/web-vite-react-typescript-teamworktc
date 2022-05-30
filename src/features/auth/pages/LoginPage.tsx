import * as React from "react";

import {FastField, Field, Formik} from "formik";
import {authActions, getAuthLoginStatus, getAuthUser} from "../authSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import AuthInputField from "../components/AuthInputField";
import BaseButton from "../../../components/form/BaseButton";
import {startSectionBackgroundStyle} from "../../../components/StartSection";

// import {useNavigate} from "react-router-dom";

export const styles = {
	container:
		"mx-auto w-full md:w-[600px] bg-mygreendark2 py-12 text-black rounded-sm",
	title: "text-[2rem] font-bold text-center pb-8 font-icon",
	input: "w-full rounded-lg bg-black text-white p-[0.5rem]",
	button:
		"bg-black text-white hover:text-mygreendark2 font-bold hover:border-none transition-all duration-500 h-[36px] rounded-2xl mt-2",
	form: "flex flex-col gap-y-6 px-4",
};
export default function LoginPage() {
	const loginStatus = useAppSelector(getAuthLoginStatus);

	const user = useAppSelector(getAuthUser);

	const dispatch = useAppDispatch();
	const initialValues: {username: string; password: string} = {
		username: user && user.username ? user.username : "",
		password: "",
	};

	const handleSubmit = (values: {username: string; password: string}) => {
		dispatch(authActions.login({...values}));
	};

	return (
		<div className={startSectionBackgroundStyle}>
			<div className={styles.container}>
				<h1 className={styles.title}>Đăng Nhập</h1>
				<Formik initialValues={initialValues} onSubmit={handleSubmit}>
					{formikProps => {
						const {handleSubmit} = formikProps;

						return (
							<form onSubmit={handleSubmit} className={styles.form}>
								<FastField
									inputClass={styles.input}
									name="username"
									label="Tài khoản"
									placeHolder="Nhập tài khoản"
									component={AuthInputField}
								/>
								<FastField
									name="password"
									inputClass={styles.input}
									label="Mật Khẩu"
									placeHolder="Nhập mật khẩu"
									type="password"
									component={AuthInputField}
								/>
								{loginStatus?.error === true && (
									<div className="text-baseRed">{loginStatus.message}</div>
								)}
								<BaseButton
									className={styles.button}
									type="submit"
									loading={loginStatus?.loading}
								>
									Đăng Nhập
								</BaseButton>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
