import {Route, Routes} from "react-router-dom";

import NotePage from "./pages/NotePage";
import React from "react";

function Note() {
	return (
		<Routes>
			<Route path="" element={<NotePage />} />
		</Routes>
	);
}

export default Note;
