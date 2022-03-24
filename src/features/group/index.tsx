import {Route, Routes} from "react-router-dom";

import GroupCreatePage from "./pages/GroupCreatePage";
import GroupDetail from "./pages/GroupDetail";
import GroupPage from "./pages/GroupPage";
import NeedGroupContainer from "../../components/common/NeedGroupContainer";
import NeedLogin from "../../components/common/NeedLogin";

export default function Group() {
	return (
		<Routes>
			<Route path="" element={<GroupPage />} />
			<Route
				path=":id"
				element={
					<NeedGroupContainer>
						<GroupDetail />
					</NeedGroupContainer>
				}
			/>
			<Route
				path="create"
				element={
					<NeedLogin>
						<GroupCreatePage />
					</NeedLogin>
				}
			/>
		</Routes>
	);
}
