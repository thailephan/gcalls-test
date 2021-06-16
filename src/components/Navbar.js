import React, { Component } from "react";
import { Button, Toast } from "react-bootstrap";

export default class Navbar extends Component {
	state = {
		isCallToastShow: false,
	};

	toggleCallToast = () => {
		const { isCallToastShow } = this.state;
		this.setState({ isCallToastShow: !isCallToastShow });
	};
	makeACallFromToast = () => {
		this.props.call();
		this.toggleCallToast();
	};

	render() {
		const { isCallToastShow } = this.state;
		const {phoneNumber, disableCallButton} = this.props;
		return (
			<div>
				<nav style={styles.navbar}>
					<div>icon</div>
					<div style={styles.leftNavbar}>
						<Toast
							show={isCallToastShow}
							onClose={this.toggleCallToast}
							animation={false}
							style={styles.callToast}
						>
							<Toast.Header>
								<strong className="mr-auto">Make a call</strong>
							</Toast.Header>

							<Toast.Body>
								<input
									type="text"
									defaultValue={phoneNumber}
									style={{ padding: "5px 10px" }}
									onChange={this.props.changePhoneNumberInput}
								/>
								<Button 
								disabled = {disableCallButton}
									style={{ margin: "10px" }}
									onClick={this.makeACallFromToast}
								>
									Call
								</Button>
							</Toast.Body>
						</Toast>
						<button style={styles.callIcon} onClick={this.toggleCallToast}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="black"
								class="bi bi-telephone"
								viewBox="0 0 16 16"
							>
								<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
							</svg>
						</button>
						<p style={styles.username}>Hello, {"anonymous"}</p>
					</div>
				</nav>
			</div>
		);
	}
}

const styles = {
	username: {
		margin: "0 2rem",
	},
	callIcon: {
		borderRadius: "50%",
		border: "1px solid #0009",
		backgroundColor: "#fff",
		width: "40px",
		height: "40px",
	},
	callToast: {
		position: "absolute",
		top: "3rem",
		left: "-12rem",
		zIndex: 1,
		backgroundColor: "white",
	},
	navbar: {
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		height: "5rem",
		width: "100%",
		boxShadow: '1px 1px 10px 2px #EEE3',
	},
	leftNavbar: {
		position: "relative",
		display: "flex",
		flexDirection: "row",
	},
};
