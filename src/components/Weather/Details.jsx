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
					<p>{`Visibility: ${data.visibility}`}</p>
					<p>{`Wind: ${data.wind_speed} ${data.wind_direction_compass}`}</p>
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
