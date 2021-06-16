import JsSIP from "jssip";

import { PROXY, WEBSOCKET } from "../utils/constants";
class UserAgent {
	ua = null;
	callOptions = null;

	constructor() {
		this.ua = new JsSIP.UA(this.configuration);

		this.callOptions = {
			eventHandlers: this.eventHandlers,
			mediaConstraints: {audio: true, video: false},
		};

		this.ua.start();
	}

	socket = new JsSIP.WebSocketInterface(WEBSOCKET);

	configuration = {
		sockets: [this.socket],
		uri: `sip:107@${PROXY}`,
		password: "test1107",
		session_timers: false,
	};

	getUa = () => {
		return this.ua;
	};

	eventHandlers = {
		progress: function (e) {
			console.log("call is in progress");
		},
		failed: function (e) {
			console.log(e);
			console.log("call failed with cause: " + e.cause);
		},
		ended: function (e) {
			console.log("call ended with cause: " + e.cause);
		},
		confirmed: function (e) {
			console.log("call confirmed");
		},
	};

	setCallOptions = (mediaConstraints = { audio: true, video: false }, eventHandlers=this.eventHandlers) =>  {
		this.options = {
			eventHandlers,
			mediaConstraints,
		};
	}
		
	call = (phoneNumber, options=this.callOptions) => {
		this.ua.call(phoneNumber, options);
		// this.ua.call(phoneNumber, true, false,this.eventHandlers );
	}
	terminatedCall = () => {
		this.ua.terminateSessions();
	}
}
export { UserAgent };
