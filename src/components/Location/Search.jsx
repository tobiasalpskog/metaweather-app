import { motion } from "framer-motion";

const variants = {
	initial: { scale: 1, opacity: 0 },
	animate: {
		opacity: [0, 1, 1, 1, 1],
		scale: [0.2, 1.9, 1.2, 1.3, 1],
		color: [
			"rgb(255, 152, 188)",
			"rgb(255, 230, 240",
			"rgb(255, 152, 188)",
			"rgb(255, 230, 240",
			"rgb(255, 152, 188)",
		],
		transition: {
			duration: 1,
			delay: 0.7 + 1,
		},
	},
};

export default function Search() {
	return (
		<div className="relative">
			<motion.button
				className="transparent"
				variants={variants}
				initial="initial"
				animate="animate"
			>
				<span className="material-icons md-36">search</span>
			</motion.button>
		</div>
	);
}
