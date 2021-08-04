import { useEffect } from "react";

import { motion } from "framer-motion";

import { fadeIn, fadeOut } from "../../variants";

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
			<motion.div
				id="details-container"
				className={
					isShowingDetails
						? "transition smooth-6 delay-4 color bg expanded p-8 pt-0"
						: "transition smooth-6 color bg collapsed"
				}
				initial="hidden"
				animate="animate"
				variants={fadeIn}
				exit={fadeOut}
				layout
			>
				<h2 className="text centered">Details</h2>
				<div className="grid 2 align-center justify-center">
					<p>
						<span>Max: </span>
						<span className="pl-4 pr-4">{`${data.max_temp} °C`}</span>
						<span className="pl-4">Min: </span>
						<span className="pr-2 pl-4">{`${data.min_temp} °C`}</span>
					</p>
					<p>
						<span>Humidity: </span>
						<span className="pl-4">{`${data.humidity}%`}</span>
					</p>
					<p>
						<span>Certainty: </span>
						<span className="pl-4">{`${data.predictability}%`}</span>
					</p>
					<p>
						<span>Visibility: </span>
						<span className="ml-4">{`${data.visibility}`}</span>
					</p>
					<p>
						<span>Wind: </span>
						<span className="ml-4">{`${data.wind_speed}`}</span>
						{" m/s"}
						<span className="material-icons ml-4 mtb-auto">
							{windDirection}
						</span>
						<span className="ml-2">{`${data.wind_direction_compass}`}</span>
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
			</motion.div>
		</>
	);
}
