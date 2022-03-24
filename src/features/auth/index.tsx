import {Route, Routes} from "react-router-dom";

import LoggedMidleware from "../../components/common/LoggedMidleware";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function Auth() {
	return (
		<Routes>
			<Route
				path="login"
				element={
					<LoggedMidleware>
						<LoginPage />
					</LoggedMidleware>
				}
			/>
			<Route
				path="register"
				element={
					<LoggedMidleware>
						<RegisterPage />
					</LoggedMidleware>
				}
			/>
			<Route path="verify-email" />
		</Routes>
	);
}
