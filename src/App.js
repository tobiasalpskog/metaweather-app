import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./App.css";

import Weather from "./components/Weather";
import Location from "./components/Location";

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

	// const data1 = {
	// 	id: 5078260196048896,
	// 	weather_state_name: "Light Cloud",
	// 	weather_state_abbr: "lc",
	// 	wind_direction_compass: "NW",
	// 	created: "2021-08-04T07:59:43.584220Z",
	// 	applicable_date: "2021-08-04",
	// 	min_temp: "12.3",
	// 	max_temp: "20.4",
	// 	the_temp: "19.7",
	// 	wind_speed: "3.28",
	// 	wind_direction: 309.1182428566674,
	// 	air_pressure: 1015,
	// 	humidity: 56,
	// 	visibility: "12.4",
	// 	predictability: 70,
	// };
	// const data2 = {
	// 	id: 6079332784013312,
	// 	weather_state_name: "Heavy Cloud",
	// 	weather_state_abbr: "hc",
	// 	wind_direction_compass: "SW",
	// 	created: "2021-08-04T08:01:04.566080Z",
	// 	applicable_date: "2021-08-04",
	// 	min_temp: "10.8",
	// 	max_temp: "21.1",
	// 	the_temp: "19.9",
	// 	wind_speed: "3.58",
	// 	wind_direction: 215.7634508624013,
	// 	air_pressure: 1014.5,
	// 	humidity: 45,
	// 	visibility: "11.8",
	// 	predictability: 71,
	// };

	// function toggleDummyData() {
	// 	if (city === "Copenhagen") {
	// 		setWeatherDataToday(data2);
	// 		setCity("Stockholm");
	// 	} else {
	// 		setWeatherDataToday(data1);
	// 		setCity("Copenhagen");
	// 	}
	// }

	async function getWeatherData() {
		// Use real location
		const nearestCityInfo = await getNearestCityByLocation(
			location[0],
			location[1]
		);

		// Update city..

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
		setCity(nearestCityInfo.title);

		const weeklyData = data.consolidated_weather.slice(1);
		setWeeklyWeatherData(weeklyData);
	}

	// Should check if we have a city.
	// If not, we display the welcome message.
	return (
		<div className="App">
			<div className="outer-wrapper">
				<header className="lg-fixed vfull">
					<Location updateLocation={updateLocation} />
				</header>
				<main>
					{/* <button onClick={toggleDummyData}>Toggle</button> */}
					{city ? (
						<div className="layout mh-center">
							<Weather
								city={city}
								weatherDataToday={weatherDataToday}
								weeklyWeatherData={weeklyWeatherData}
							/>
						</div>
					) : (
						<>
							<div className="hfull flex column centered mh-auto">
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
						</>
					)}
				</main>
				{/* <Footer /> */}
			</div>
		</div>
	);
}

export default App;
