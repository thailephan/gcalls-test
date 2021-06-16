import React from "react";

import { Button, Row, Col } from "react-bootstrap";

const PADCELLVALUES = [
	[1, 4, 7, "*"],
	[2, 5, 8, 0],
	[3, 6, 9, "#"],
];

export default function DialPadLayout(props) {
	const {
	phoneNumber,
	call,
	changePhoneNumberInput,
	clearPhoneNumberInput,
	disableCallButton,
	showCallToolTip,
	changePhoneNumberCell,
} = props;
	return (
		<Col style={styles.dialPadLayout}>
			<Row style={styles.dialPadHeader}>
				<input
					value={phoneNumber}
					type="text"
					style={styles.phoneNumberInput}
					onChange={changePhoneNumberInput}
				/>
				<Button
					onClick={clearPhoneNumberInput}
					style={{
						border: "none",
						backgroundColor: "white",
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="black"
						className="bi bi-x"
						viewBox="0 0 16 16"
					>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
					</svg>
				</Button>
			</Row>
			<Row>
				{PADCELLVALUES.map((cells) => (
					<Col key={`${cells.length + cells[0]}`}>
						{cells.map((cell) => (
							<Row key={cell}>
								<Button
									style={{ padding: "1rem 3rem" }}
									block
									variant="info"
									onClick={() => changePhoneNumberCell(cell)}
								>
									{cell}
								</Button>
							</Row>
						))}
					</Col>
				))}
				<Col>
					<Button
						title={showCallToolTip()}
						block
						style={{ height: "100%" }}
						variant="info"
						onClick={call}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="white"
							className="bi bi-telephone"
							viewBox="0 0 16 16"
						>
							<path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
						</svg>
					</Button>
				</Col>
			</Row>
		</Col>
	);
}

const styles = {
	phoneNumberInput: {
		border: "none",
		height: "100%",
		padding: ".6rem 1rem",
		flex: 1,
	},
	dialPadLayout: {
		width: "100%",
		padding: ".5rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	dialPadHeader: {
		border: ".1rem solid #5558",
		height: "50px",
		margin: "1rem",
		width: "30%",
		minWidth: "400px",
		maxWidth: "600px",
		display: "flex",
		flexDirection: "row",
	},
};
