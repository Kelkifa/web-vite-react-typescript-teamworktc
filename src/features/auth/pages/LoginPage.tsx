import * as React from "react";

import {FastField, Formik} from "formik";
import {
	authActions,
	getAuthLoginStatus,
	getAuthNavigateURL,
	getAuthUser,
} from "../authSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

import AuthInputField from "../components/AuthInputField";
import {AuthLogin} from "../../../models";
import BaseButton from "../../../components/form/BaseButton";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const styles = {
	container: "mx-auto w-full md:w-[600px] bg-bgColor py-12",
	title: "text-2xl font-bold text-center pb-8",
	form: "flex flex-col gap-y-6 px-4",
};
export default function LoginPage() {
	const navigate = useNavigate();

	const loginStatus = useAppSelector(getAuthLoginStatus);
	const navigateURL = useAppSelector(getAuthNavigateURL);

	const user = useAppSelector(getAuthUser);

	const dispatch = useAppDispatch();
	const initialValues: {username: string; password: string} = {
		username: user && user.username ? user.username : "",
		password: "",
	};

	useEffect(() => {
		if (loginStatus?.error === false) {
			navigate(navigateURL);
		}
		return () => {
			dispatch(authActions.clearLoginStatus());
		};
	}, [loginStatus]);

	const handleSubmit = (values: {username: string; password: string}) => {
		dispatch(authActions.login({...values}));
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
							{loginStatus?.error === true && (
								<div className="text-baseRed">{loginStatus.message}</div>
							)}
							<BaseButton
								className="bg-fuchsia-800/60 h-[36px] rounded-2xl mt-2"
								type="submit"
								text="Đăng Nhập"
								loading={loginStatus?.loading}
							>
								Đăng Nhập
							</BaseButton>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
