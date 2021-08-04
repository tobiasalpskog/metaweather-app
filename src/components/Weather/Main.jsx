import { motion, AnimatePresence } from "framer-motion";

import imgLinks from "../../imgLinks";

import { fadeIn, fadeOut, list, item } from "../../variants";

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

	return (
		<div className="transition all smooth-6">
			<section className="main p-8 pt-0 flex column space-between lg-fixed">
				<motion.div variants={fadeIn} initial="hidden" animate="animate">
					<p className="material-icons md-36 vfull red text centered mb-0">
						room
					</p>
					<h1 className="text centered mtb-0" id="selected-city">
						{city}
					</h1>
				</motion.div>
				<AnimatePresence exitBeforeEnter initial={false}>
					{data.the_temp && (
						<>
							<motion.img
								src={imgLinks[data.weather_state_abbr]}
								alt={alt}
								className="centered v40 self-start"
								variants={fadeIn}
								initial="hidden"
								animate="animate"
								exit={fadeOut}
								key={`anim-img-${city}`}
							/>
							<motion.p
								className="text centered p-2 huge mt-0 mb-0"
								variants={fadeIn}
								initial="hidden"
								animate="animate"
								exit={fadeOut}
								key={`anim-temp-${city}`}
							>{`${data.the_temp} °C`}</motion.p>
							<motion.span
								className="text centered p-2"
								variants={fadeIn}
								initial="hidden"
								animate="animate"
								exit={fadeOut}
								key={`anim-state-${city}`}
							>
								{data.weather_state_name}
							</motion.span>
							<motion.span
								className="text centered p-2"
								variants={fadeIn}
								initial="hidden"
								animate="animate"
								exit={fadeOut}
								key={`anim-date-${city}`}
							>
								{`Today — ${new Date().toDateString().slice(0, -5)}`}
							</motion.span>
							<motion.button
								className={
									isShowingDetails
										? "centered toggle transition smooth-6 color bg collapsed"
										: "centered toggle transition smooth-6 color bg expanded"
								}
								onClick={() => toggleExpandedView()}
								variants={fadeIn}
								initial="hidden"
								animate="animate"
								exit={fadeOut}
								key={`anim-toggleDetails-${city}`}
							>
								Show Details
							</motion.button>
						</>
					)}
				</AnimatePresence>
			</section>
		</div>
	);
}
