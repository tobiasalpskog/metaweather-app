import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const NO_RESULTS = "No results found";

let variants = {
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

const cities = [
	{
		distance: 39213,
		title: "Copenhagen",
		location_type: "City",
		woeid: 554890,
		latt_long: "55.676311,12.569350",
	},
	{
		distance: 234018,
		title: "Gothenburg",
		location_type: "City",
		woeid: 890869,
		latt_long: "57.701328,11.96689",
	},
	{
		distance: 315538,
		title: "Hamburg",
		location_type: "City",
		woeid: 656958,
		latt_long: "53.553341,9.992450",
	},
	{
		distance: 354665,
		title: "Berlin",
		location_type: "City",
		woeid: 638242,
		latt_long: "52.516071,13.376980",
	},
	{
		distance: 407393,
		title: "Bremen",
		location_type: "City",
		woeid: 641142,
		latt_long: "53.075089,8.8047",
	},
	{
		distance: 433539,
		title: "Hanover",
		location_type: "City",
		woeid: 657169,
		latt_long: "52.372269,9.73815",
	},
	{
		distance: 487493,
		title: "Leipzig",
		location_type: "City",
		woeid: 671072,
		latt_long: "51.3452,12.38594",
	},
	{
		distance: 489223,
		title: "Oslo",
		location_type: "City",
		woeid: 862592,
		latt_long: "59.912281,10.749980",
	},
	{
		distance: 496540,
		title: "Stockholm",
		location_type: "City",
		woeid: 906057,
		latt_long: "59.332169,18.062429",
	},
	{
		distance: 518245,
		title: "Dresden",
		location_type: "City",
		woeid: 645686,
		latt_long: "51.053631,13.74081",
	},
];

export default function Search({ updateLocation }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [cityQuery, setCityQuery] = useState("");
	const [results, setResults] = useState([]);
	const [selectedCity, setSelectedCity] = useState("");
	const textInputRef = useRef(null);
	const [listStyle, setListStyle] = useState({});

	useEffect(() => {
		variants = {
			initial: { scale: 1, opacity: 0 },
			animate: {
				scale: 1,
				opacity: 1,
				color: "rgb(255, 152, 188)",
			},
		};
	}, []);

	useEffect(() => {
		const newResults = cities.filter((city) =>
			city.title.toLowerCase().startsWith(cityQuery.toLowerCase())
		);
		if (cityQuery !== "") {
			if (newResults.length === 0) {
				setResults([{ title: NO_RESULTS }]);
			} else {
				setResults(newResults);
			}
			changeListStyle();
		}
	}, [cityQuery]);

	function changeListStyle() {
		let inputElement = document.getElementById("city-input");
		let resultListElement = document.getElementById("result-list");

		if (resultListElement) {
			let style = {
				top: `${inputElement.offsetHeight}px`,
			};
			setListStyle(style);
		}
	}

	function selectCity(city) {}

	function onChange(value) {
		setCityQuery(value.target.value);
	}

	function toggleExpansion(e) {
		e.preventDefault();
		setIsExpanded((prevState) => !prevState);
	}

	return (
		<div className="relative flex row center">
			{isExpanded ? (
				<>
					<input
						type="text"
						value={cityQuery}
						onChange={onChange}
						onBlur={toggleExpansion}
						id="city-input"
						autoComplete="off"
					/>
					{cityQuery !== "" && (
						<ul
							className="absolute bg-secondary p-4 m-0"
							id="result-list"
							style={listStyle}
						>
							{results.map((city) => {
								if (city.title !== NO_RESULTS) {
									return (
										<li
											className="p-2"
											key={`queryResults-${city}`}
											onClick={() => selectCity(city)}
										>
											{city.title}
										</li>
									);
								} else {
									return (
										<li
											className="p-2"
											key={`queryResults-${city}`}
											className="text italic"
										>
											{city.title}
										</li>
									);
								}
							})}
						</ul>
					)}
					<motion.button
						className="transparent"
						variants={variants}
						initial="initial"
						animate="animate"
						onClick={toggleExpansion}
					>
						<span className="material-icons md-36">search</span>
					</motion.button>
				</>
			) : (
				<motion.button
					className="transparent"
					variants={variants}
					initial="initial"
					animate="animate"
					onClick={toggleExpansion}
				>
					<span className="material-icons md-36">search</span>
				</motion.button>
			)}
		</div>
	);
}
