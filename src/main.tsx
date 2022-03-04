import "./index.css";

import App from "./App";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import {store} from "./app/store";

// ReactDOM.render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<App />
// 		</Provider>
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );

const rootElement = document.getElementById("root");

if (rootElement !== null && rootElement.hasChildNodes()) {
	ReactDOM.hydrate(
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>,
		rootElement
	);
} else {
	ReactDOM.render(
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>,
		rootElement
	);
}
