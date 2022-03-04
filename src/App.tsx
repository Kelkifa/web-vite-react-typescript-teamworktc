import "./App.css";
import "./styles/scroll.scss";
import "./styles/index.scss";

import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import Auth from "./features/auth";
import Doc from "./features/doc";
import Group from "./features/group";
import HomePage from "./features/home/pages/HomePage";
import MainLayout from "./components/layouts/MainLayout";
import NeedGroupContainer from "./components/common/NeedGroupContainer";
import Note from "./features/note";
import {authActions} from "./features/auth/authSlice";
import {groupActions} from "./features/group/groupSlice";
import {useAppDispatch} from "./app/hooks";
import {useEffect} from "react";

// import "./styles/gridLibrary.scss";

function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(authActions.firstAccess());
		dispatch(groupActions.getGroup());
	}, []);
	return (
		<Router>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route
						path="note/*"
						element={
							<NeedGroupContainer>
								<Note />
							</NeedGroupContainer>
						}
					/>
					<Route
						path="doc/*"
						element={
							<NeedGroupContainer>
								<Doc />
							</NeedGroupContainer>
						}
					/>
					<Route
						path="group/*"
						element={
							<NeedGroupContainer>
								<Group />
							</NeedGroupContainer>
						}
					/>
					<Route path="home" element={<HomePage />} />
					<Route path="auth/*" element={<Auth />} />
					<Route path="" element={<HomePage />} />
				</Route>
				<Route path="*" element={<div>Not found</div>} />
			</Routes>
		</Router>
	);
}

export default App;
