import {Route, Routes} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function Auth() {
	return (
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route path="register" element={<RegisterPage />} />
		</Routes>
	);
}
