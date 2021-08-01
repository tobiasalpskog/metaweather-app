import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./App.css";

import Weather from "./components/Weather";
import Location from "./components/Location";

import Footer from "./components/Footer";

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

async function getNearestCityByLocation(lat, long) {
	const res = await fetch(
		`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
	);
	const data = await res.json();

	/* Format: [
		{
			distance: 0123,
			title: "City name",
			latt_long: "32132132, 321321321"
			location_type: City,
			woeid: 32145513
		}
	 ]
	  */

	const nearestData = data[0];
	return nearestData;
}

function App() {
	const [city, setCity] = useState("");
	const [location, setLocation] = useState([0, 0]);
	const [weatherDataToday, setWeatherDataToday] = useState({});
	const [weeklyWeatherData, setWeeklyWeatherData] = useState([]);

	useEffect(() => {
		if (location[0] !== 0 && location[1] !== 0) {
			getWeatherData(location[0], location[1]);
		}
	}, [location]);

	function updateLocation(latitude, longitude) {
		setLocation([latitude, longitude]);
	}

	async function getWeatherData() {
		// Use real location
		const nearestCityInfo = await getNearestCityByLocation(
			location[0],
			location[1]
		);

		// Update city..
		setCity(nearestCityInfo.title);

		const woeid = nearestCityInfo.woeid;

		const weatherRes = await fetch(
			`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
		);

		const data = await weatherRes.json();

		const weatherData = data.consolidated_weather[0];

		// Change to loop through properties. If they are number, set precision.
		weatherData.min_temp = weatherData.min_temp.toPrecision(3);
		weatherData.max_temp = weatherData.max_temp.toPrecision(3);
		weatherData.the_temp = weatherData.the_temp.toPrecision(3);
		weatherData.visibility = weatherData.visibility.toPrecision(3);
		weatherData.wind_speed = weatherData.wind_speed.toPrecision(3);

		setWeatherDataToday(weatherData);

		const weeklyData = data.consolidated_weather.slice(1);
		setWeeklyWeatherData(weeklyData);
	}

	// Should check if we have a city.
	// If not, we display the welcome message.
	return (
		<div className="App">
			<div className="outer-wrapper">
				<header>
					<Location updateLocation={updateLocation} />
				</header>
				<main>
					<div className="layout">
						{city ? (
							<Weather
								city={city}
								weatherDataToday={weatherDataToday}
								weeklyWeatherData={weeklyWeatherData}
							/>
						) : (
							<AnimatePresence>
								<div className="hfull flex column centered">
									<motion.h1
										variants={fadeIn}
										initial="hidden"
										animate="show"
										className="text centered p-2 italic"
									>
										Welcome!
									</motion.h1>
									<motion.div className="text centered p-4 italic">
										{createSpanOrchestration(welcomeMessage)}
									</motion.div>
								</div>
							</AnimatePresence>
						)}
					</div>
				</main>
				{/* <Footer /> */}
			</div>
		</div>
	);
}

export default App;
