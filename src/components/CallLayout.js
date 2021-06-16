import React from "react";
import { Button, Row, Col } from "react-bootstrap";

export default function CallLayout({
	callStatus,
	callingTime,
	isMuted,
	terminateCall,
	phoneNumber,
	sessionCallMutedAction,
}) {
	return (
		<Col style={styles.calllayout}>
			<Row style={{ fontSize: "18px", fontWeight: 700 }}>
				Calling... {phoneNumber}
			</Row>
			{callStatus.isCallingConfirm && <Row>{callingTime}</Row>}
			<Row style={styles.callActionLayout}>
				<Button
					title={isMuted ? "Unmute" : "Muted"}
					variant={isMuted ? "warning" : "primary"}
					onClick={sessionCallMutedAction}
				>
					{!isMuted ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							class="bi bi-mic"
							viewBox="0 0 16 16"
						>
							<path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
							<path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
						</svg>
					) : (
						<svg
							title="unmute"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							class="bi bi-mic-mute"
							viewBox="0 0 16 16"
						>
							<path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3z" />
							<path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
						</svg>
					)}
				</Button>
				<Button
					style={{ margin: "1rem" }}
					variant={"danger"}
					onClick={terminateCall}
				>
					End Call
				</Button>
			</Row>
		</Col>
	);
}

const styles = {
	callLayout: {
		background: "#666",
		color: "white",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	callActionLayout: {
		marginTop: "5rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
};
