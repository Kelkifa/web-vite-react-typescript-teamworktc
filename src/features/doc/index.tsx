import {Route, Routes} from "react-router-dom";

import DocContentPage from "./pages/DocContentPage";
import DocLayout from "./components/DocLayout";
import DocPage from "./pages/DocPage";

export default function Doc() {
	return (
		<Routes>
			<Route path="" element={<DocLayout />}>
				<Route path=":docId/:contentId" element={<DocContentPage />} />
				<Route path="" element={<DocPage />} />
			</Route>
		</Routes>
	);
}
