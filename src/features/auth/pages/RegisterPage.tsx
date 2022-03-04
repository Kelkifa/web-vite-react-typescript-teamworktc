import * as React from "react";
import * as yup from "yup";

import {FastField, Formik} from "formik";

import {Auth} from "../../../models";
import AuthInputField from "../components/AuthInputField";
import {authActions} from "../authSlice";
import {styles} from "./LoginPage";
import {useAppDispatch} from "../../../app/hooks";

const schema = yup.object().shape({
	fullname: yup.string().required("This field is required"),
	username: yup
		.string()
		.max(20, "Tài khoản phải từ 4 đến 20")
		.min(4, "Tài khoản phải từ 4 đến 20")
		.required("This field is required"),
	password: yup
		.string()
		.max(20, "Mật khẩu phải từ 0 đến 20")
		.min(6, "Mật khẩu phải từ 0 đến 20")
		.matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
		.required("This field is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không chính xác"),
});

export default function RegisterPage() {
	const dispatch = useAppDispatch();
	const initialValues: Auth = {
		fullname: "",
		username: "",
		password: "",
		confirmPassword: "",
	};

	const handleSubmit = (values: Auth) => {
		dispatch(authActions.register(values));
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Đăng Ký</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				{formikProps => {
					const {handleChange, handleSubmit, handleBlur} = formikProps;

					return (
						<form onSubmit={handleSubmit} className={styles.form}>
							<FastField
								name="fullname"
								label="Họ và Tên"
								placeHolder="Nhập họ và tên"
								component={AuthInputField}
							/>
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
							<FastField
								name="confirmPassword"
								label="Xác Nhận Mật Khẩu"
								placeHolder="Nhập Lại mật khẩu"
								isPassword
								component={AuthInputField}
							/>
							<button
								className="bg-fuchsia-800/60 h-[36px] rounded-2xl mt-2"
								type="submit"
							>
								Đăng Ký
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
}
