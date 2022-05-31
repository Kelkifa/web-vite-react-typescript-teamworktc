import * as React from "react";

import {getAuthIsAuth} from "../../features/auth/authSlice";
import {toast} from "react-toastify";
import {useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";

export default function NeedLogin({children}: {children: JSX.Element | null}) {
	const isAuth = useAppSelector(getAuthIsAuth);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!isAuth) {
			toast.error("Bạn cần đăng nhập để thực hiện hành đông này");
			navigate("/");
		}
	}, [isAuth]);
	return children;
}
