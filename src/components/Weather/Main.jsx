import { motion, AnimatePresence } from "framer-motion";

import imgLinks from "../../imgLinks";

import {
	getMonthFromDate,
	getImgAltFromWeatherAbbr,
} from "../../utils/conversions";

export default function Main({
	city,
	data,
	toggleExpandedView,
	isShowingDetails,
}) {
	let alt = getImgAltFromWeatherAbbr(data.weather_state_abbr);

	const date = new Date();
	let month = getMonthFromDate(date);

	const container = {
		show: {
			opacity: 1,
		},
		hidden: {
			opacity: 0,
		},
	};

	const fadeIn = {
		show: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
		hidden: {
			opacity: 0,
		},
	};

	const item = {
		show: (transitionDelay) => ({
			opacity: 1,
			transition: {
				delay: 1 + transitionDelay,
			},
		}),
		hidden: { opacity: 0 },
	};

	const location = {
		show: (locationDelay) => ({
			opacity: 1,
			transition: {
				delay: locationDelay,
			},
		}),
		hidden: { opacity: 0 },
	};

	const search = {
		show: (searchDelay) => ({
			opacity: 1,
			transition: {
				delay: searchDelay,
			},
		}),
		hidden: { opacity: 0 },
	};

	const welcomeMessage =
		"Please search for a city or use your current location to view the weather near you".split(
			" "
		);

	function computeDelay(delay, index, pauses) {
		return delay * index + pauses * 1.4;
	}

	function addDelay(word, index, delay, pauseObject) {
		let pauses = pauseObject.pauses;

		let transitionDelay;

		if (word === "search") {
			// Want same delay on search and location
			pauseObject.inc();
		} else if (word === "location") {
			pauseObject.inc();
		}

		transitionDelay = computeDelay(delay, index, pauses);

		return (
			<motion.span
				custom={transitionDelay}
				variants={item}
				initial="hidden"
				animate="show"
				key={`orchestration-span-${transitionDelay}`}
			>
				{`${word} `}
			</motion.span>
		);
	}

	function createSpanOrchestration(messageArray) {
		let delay = 0.3;

		const pauseObject = {
			currentPauses: 0,
			get pauses() {
				return this.currentPauses;
			},
			inc() {
				this.currentPauses++;
			},
		};

		const orchestration = messageArray.map((word, index) => {
			return addDelay(word, index, delay, pauseObject);
		});

		return orchestration;
	}

	return (
		<section className="main p-8 pt-0 flex column space-between">
			{city !== "" ? (
				<>
					<div>
						<p className="material-icons md-36 vfull red text centered mb-0">
							room
						</p>
						<h1 className="text centered mtb-0" id="selected-city">
							{city}
						</h1>
					</div>
					{data.the_temp !== undefined && (
						<>
							<div className="flex column center">
								<img
									src={imgLinks[data.weather_state_abbr]}
									alt={alt}
									className="centered v40 self-start"
								/>
								<p className="text centered p-2 huge mt-0 mb-0">{`${data.the_temp} °C`}</p>
								<span className="text centered p-2">
									{data.weather_state_name}
								</span>
							</div>
							<span className="text centered p-2">
								{`Today — ${new Date().toDateString().slice(0, -5)}`}
							</span>
							<button
								className={
									isShowingDetails
										? "centered toggle transition smooth-6 color bg collapsed"
										: "centered toggle transition smooth-6 color bg expanded"
								}
								onClick={() => toggleExpandedView()}
							>
								Show Details
							</button>
						</>
					)}
				</>
			) : (
				<AnimatePresence>
					<div className="h80 flex column centered">
						<motion.h1
							variants={fadeIn}
							initial="hidden"
							animate="show"
							className="text centered p-2 italic"
						>
							Welcome!
						</motion.h1>
						<motion.div className="text centered p-2 italic">
							{createSpanOrchestration(welcomeMessage)}
						</motion.div>
					</div>
				</AnimatePresence>
			)}
		</section>
	);
}