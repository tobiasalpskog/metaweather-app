import { useState, useEffect } from "react";

export default function CertaintyBar({ certaintyPercentage }) {
	const [bgColor, setBgColor] = useState("green");

	useEffect(() => {
		updateBgColor();
	}, []);
	// Want a bar :::::|--
	// Need to set width adaptively in %

	// Define color scheme.
	// red, orange, yellow, green

	function updateBgColor() {
		if (certaintyPercentage < 25) {
			setBgColor("red");
		} else if (certaintyPercentage >= 25 && certaintyPercentage < 50) {
			setBgColor("orange");
		} else if (certaintyPercentage >= 50 && certaintyPercentage < 75) {
			setBgColor("yellow");
		} else if (certaintyPercentage >= 75) {
			setBgColor("green");
		}
	}

	return (
		<>
			<div className="vfull flex column">
				<p className="text centered mtb-auto pr-1">Certainty</p>
				<div className="vfull flex row">
					<div
						className="bar percent"
						style={{
							backgroundColor: bgColor,
							width: `${certaintyPercentage}%`,
						}}
					></div>
					<div className="bar divider"></div>
					<div
						className="bar empty"
						style={{ width: `${100 - certaintyPercentage}%` }}
					></div>
				</div>
			</div>
		</>
	);
}
