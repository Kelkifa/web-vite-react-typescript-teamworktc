import {Route, Routes} from "react-router-dom";

import GroupDetail from "./pages/GroupDetail";
import GroupPage from "./pages/GroupPage";

export default function Group() {
	return (
		<Routes>
			<Route path="" element={<GroupPage />} />
			<Route path=":id" element={<GroupDetail />} />
		</Routes>
	);
}
