import { motion } from "framer-motion";

const variants = {
	initial: { scale: 1, opacity: 0 },
	animate: {
		opacity: [0, 1, 1, 1, 1],
		scale: [0.2, 1.9, 1.2, 1.3, 1],
		color: "rgb(255, 152, 188)",
		transition: {
			duration: 1,
			delay: 4.5 + 1,
		},
	},
};

export default function Find({ updateLocation }) {
	function getLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) =>
				/* 
				Format: 
					{
						coords: {
							accuracy
							.
							.
							.
							latitude: number
							longitude: number
						}
						timestamp: number
					}
				*/
				updateLocation(position.coords.latitude, position.coords.longitude)
			);
		} else {
			console.log("Unavailble");
		}
	}

	return (
		<div className="relative">
			<motion.button
				className="transparent"
				variants={variants}
				initial="initial"
				animate="animate"
				onClick={getLocation}
			>
				<span className="material-icons md-36">my_location</span>
			</motion.button>
		</div>
	);
}
