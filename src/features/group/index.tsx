import {Route, Routes} from "react-router-dom";

import GroupPage from "./pages/GroupPage";

export default function Group() {
	return (
		<Routes>
			<Route path="" element={<GroupPage />} />
		</Routes>
	);
}
