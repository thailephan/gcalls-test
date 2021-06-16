import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { UserAgent } from "./utils/UserAgent";
import Navbar from "./components/Navbar";
import CallLayout from "./components/CallLayout";
import DialPadLayout from "./components/DialPadLayout";
// import JsSIP from 'jssip';

const PHONE_NUMBER_REGEX = /^\d{6,12}$/g;

const ua = new UserAgent();
const jssipUa = ua.getUa();
var globalSession = null;

let callStartTimerInterval = null;

class App extends Component {
	state = {
		isPhoneNumberCallError: false,
		callingTime: 0,
		ua: null,
		callStatus: {
			isCalling: false,
			isCallingConfirm: false,
		},
		phoneNumber: "",
		isMuted: false,
		error: {
			notAllowedError: false,
			notFoundError: false,
		},
	};

	changePhoneNumberCell = (cell) => {
		this.setState({
			phoneNumber: this.state.phoneNumber + cell,
		});
	};

	changePhoneNumberInput = (e) => {
		this.setState({ phoneNumber: e.target.value });
	};

	call = () => {
		const { phoneNumber, callStatus } = this.state;
		if (phoneNumber.match(PHONE_NUMBER_REGEX)) {
			try {
				jssipUa.on("newRTCSession", (data) => {
					const { session } = data;
					globalSession = session;
					session.on("muted", this.sessionCallMutedHandler);
					session.on("unmuted", this.sessionCallMutedHandler);
					session.on("confirmed", this.sessionCallConfirmedHandler);
					session.on("ended", this.sessionCallEndedHandler);
					session.on("failed", this.sessionCallFailedHandler);
				});
				ua.call(`${phoneNumber}`);
			} catch (error) {
				console.log(error);
			}

			this.setState({
				ua,
				phoneNumber: "",
				callStatus: { ...callStatus, isCalling: true },
			});
		} else {
			this.setState({ isPhoneNumberCallError: true });
			setTimeout(() => {
				this.setState({ isPhoneNumberCallError: false });
			}, 2000);
		}
	};

	terminateCall = () => {
		const { ua, callStatus } = this.state;
		ua.terminatedCall();
		globalSession = null;
		this.setState({ callStatus: { ...callStatus, isCalling: false } });
	};

	disableCallButton = () => {
		const { phoneNumber, error } = this.state;
		const { notAllowedError, notFoundError } = error;
		console.log(
			!PHONE_NUMBER_REGEX.test(phoneNumber) || notAllowedError || notFoundError
		)
		if (!PHONE_NUMBER_REGEX.test(phoneNumber) || notAllowedError || notFoundError) {
			return true;
		};
		return false;
	};

	clearPhoneNumberInput = () => {
		this.setState({ phoneNumber: "" });
	};

	showCallToolTip = () => {
		const { phoneNumber, error } = this.state;
		const { notAllowedError, notFoundError } = error;

		if (!phoneNumber) {
			return "Vui lòng nhập số điện thoại cần liên lạc";
		}

		if (notFoundError) {
			return "Không tìm thấy thiết bị phù hợp, vui lòng kiểm tra lại";
		}

		if (notAllowedError) {
			return "Vui lòng cấp quyền truy cập vào tai nghe để thực hiện cuộc gọi";
		}

		return "Call";
	};

	require_UserMedia = async (options = { video: false, audio: true }) => {
		const { video, audio } = options;
		try {
			await navigator.mediaDevices.getUserMedia(
				{ video, audio },
				function (stream) {
					console.log(stream);
				},
				(error) => {
					console.log(error);
				}
			);
		} catch (error) {
			if (error.name.toLowerCase() === "notallowederror")
				this.setState((prevState) => ({
					...prevState,
					error: { ...prevState.error, notAllowedError: true },
				}));

			if (error.name.toLowerCase() === "notfounderror")
				this.setState((prevState) => ({
					...prevState,
					error: { ...prevState.error, notFoundError: true },
				}));
		}
	};

	onUserMediaDeviceChange = () => {
		navigator.mediaDevices.ondevicechange = (event) => {
			navigator.mediaDevices.enumerateDevices().then((devices) => {
				let hasNoInputAudioDevice = true;
				let notFoundError = false,
					notAllowedError = false;
				if (devices.length === 0) {
					notFoundError = true;
				}
				else
				devices.forEach(function (device) {
					// let [kind, type, direction] =
					let [_, type, direction] = device.kind.match(/(\w+)(input|output)/i);

					if (type === "audio" && direction === "input") {
						hasNoInputAudioDevice = false;
					}
				});

				if (hasNoInputAudioDevice) {
					notAllowedError = true;
				}

				this.setState((prevState) => ({
					...prevState,
					error: { ...prevState.error, notFoundError, notAllowedError },
				}));
			});
		};
	};

	componentDidMount() {
		this.require_UserMedia();
		this.onUserMediaDeviceChange();
	}

	componentWillUnmount() {
		navigator.mediaDevices.ondevicechange = null;
		clearInterval(callStartTimerInterval);
	}
	sessionCallMutedAction = () => {
		const { isMuted } = this.state;
		console.log(globalSession);
		if (isMuted) {
			globalSession.unmute();
		} else {
			globalSession.mute();
		}
		this.setState({ isMuted: !isMuted });
	};

	sessionCallAceptedHandler = (data) => {
		console.log("This is acepted");
		console.log(data);
		callStartTimerInterval = setInterval(() => {
			this.setState({ callingTime: this.state.callingTime + 1 });
		}, 1001);
	};
	sessionCallConfirmedHandler = (data) => {
		console.log("This is confirm");
		console.log(data);
		const { callStatus } = this.state;
		this.setState({ callStatus: { ...callStatus, isCallingConfirm: true } });
	};
	sessionCallFailedHandler = (data) => {
		console.log("This is failed");
		console.log(alert("Call end: " + data.cause));
		const { callStatus } = this.state;
		this.setState({ callStatus: { ...callStatus, isCalling: false } });
	};
	sessionCallEndedHandler = (data) => {
		console.log("This is end");
		console.log(data);
		const { callStatus } = this.state;
		this.setState({ callStatus: { ...callStatus, isCalling: false } });
	};
	sessionCallMutedHandler = (_) => {
		const { isMuted } = this.state;
		if (isMuted) {
			console.log("Session Call unmuted");
		} else {
			console.log("Session Call muted");
		}
	};

	render() {
		const {
			isPhoneNumberCallError,
			isMuted,
			callingTime,
			callStatus,
			phoneNumber,
			error : {notAllowedError, notFoundError}
		} = this.state;
		return (
			<div>
				<Navbar
					phoneNumber={phoneNumber}
					call={this.call}
					disableCallButton={!PHONE_NUMBER_REGEX.test(phoneNumber) || notAllowedError || notFoundError}
					changePhoneNumberInput={this.changePhoneNumberInput}
				/>
				{isPhoneNumberCallError && (
					<Alert style={styles.alert} variant={"danger"}>
						Số điện thoại bạn nhập vào không phù hợp
					</Alert>
				)}
				<div style={{ backgroundColor: "#eee5", width: "100%" }}>
					{this.state.callStatus.isCalling ? (
						<CallLayout
							sessionCallMutedAction={this.sessionCallMutedAction}
							callStatus={callStatus}
							callingTime={callingTime}
							isMuted={isMuted}
							terminateCall={this.terminateCall}
							phoneNumber={phoneNumber}
						/>
					) : (
						<DialPadLayout
							phoneNumber={phoneNumber}
							call={this.call}
							changePhoneNumberInput={this.changePhoneNumberInput}
							clearPhoneNumberInput={this.clearPhoneNumberInput}
							disableCallButton={!PHONE_NUMBER_REGEX.test(phoneNumber) || notAllowedError || notFoundError}
							showCallToolTip={this.showCallToolTip}
							changePhoneNumberCell={this.changePhoneNumberCell}
						/>
					)}
				</div>
			</div>
		);
	}
}

const styles = {
	alert: {
		margin: 0,
		display: "flex",
		justifyContent: "center",
		width: "100%",
	},
};

export default App;
