import {SERVER_URL} from "../api/axiosClient";
import io from "socket.io-client";

// const ENDPOINT = "http://localhost:8080";

const socket = io(SERVER_URL.replace("/api", ""), {
	withCredentials: true,
	extraHeaders: {
		"my-custom-header": "abcd",
	},
});

export default socket;
