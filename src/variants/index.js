let popAnim = {
	initial: { scale: 1, opacity: 0 },
	animate: {
		opacity: [0, 1, 1, 1, 1],
		scale: [0.2, 1.9, 1.2, 1.3, 1],
		color: "rgb(255, 152, 188)",
		transition: {
			duration: 1,
			delay: 0.7 + 1,
		},
	},
};

const fadeIn = {
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
	hidden: {
		opacity: 0,
	},
};

const container = {
	show: {
		opacity: 1,
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

export { popAnim, fadeIn, container, item };
