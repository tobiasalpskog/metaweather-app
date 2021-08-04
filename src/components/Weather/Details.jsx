import { useEffect } from "react";

export default function Details({
	data,
	isShowingDetails,
	toggleExpandedView,
}) {
	/* 
	To display: 
		min and max temp
		wind status and direction
		humidity percentage
		visibility indicator 
		air pressure number
	*/
	useEffect(() => {
		if (isShowingDetails) {
			let container = document.getElementById("details-container");
			container.scrollIntoView({
				block: "end",
				inline: "start",
				behavior: "smooth",
			});
		}
	}, [isShowingDetails]);

	let windDirection;

	switch (data.wind_direction_compass) {
		case "N":
			windDirection = "north";
			break;
		case "NE":
			windDirection = "north_east";
			break;
		case "E":
			windDirection = "east";
			break;
		case "SE":
			windDirection = "south_east";
			break;
		case "S":
			windDirection = "south";
			break;
		case "SW":
			windDirection = "south_west";
			break;
		case "W":
			windDirection = "west";
			break;
		case "NW":
			windDirection = "north_west";
			break;
	}

	return (
		<>
			<div
				id="details-container"
				className={
					isShowingDetails
						? "transition smooth-6 delay-4 color bg expanded p-8 pt-0"
						: "transition smooth-6 color bg collapsed"
				}
			>
				<h2 className="text centered">Details</h2>
				<div className="grid 2">
					<p>{`Min: ${data.min_temp} Max: ${data.max_temp}`}</p>
					<p>{`Humidity: ${data.humidity}%`}</p>
					<p>{`Certainty: ${data.predictability}%`}</p>
					<p className="md-36">
						<span className="material-icons mr-2 mtb-auto md-36">
							visibility
						</span>
						{`${data.visibility}`}
					</p>
					<p className="md-36">
						<span className="md-24">{`${data.wind_direction_compass}`}</span>
						<span className="material-icons mr-2 mtb-auto md-36">
							{windDirection}
						</span>
						{`${data.wind_speed}`}{" "}
					</p>
				</div>
				<button
					className={
						isShowingDetails
							? "centered toggle transition smooth-6 delay-4 color bg expanded"
							: "centered toggle transition smooth-6 color bg collapsed"
					}
					onClick={() => toggleExpandedView()}
				>
					Hide Details
				</button>
			</div>
		</>
	);
}
