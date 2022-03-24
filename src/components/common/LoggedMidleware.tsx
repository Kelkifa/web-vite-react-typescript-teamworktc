import {useAppSelector} from "../../app/hooks";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function LoggedMidleware({
	children,
}: {
	children: JSX.Element | null;
}) {
	const isAuth = useAppSelector(state => state.auth.isAuth);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuth) navigate("/");
	}, [isAuth]);

	if (!isAuth) return children;

	return <div>note found</div>;
}
