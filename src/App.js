import React, { useState, useEffect } from "react";

import "./App.css";

import Weather from "./components/Weather";
import Location from "./components/Location";

import Footer from "./components/Footer";

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

	return (
		<div className="App">
			<div className="outer-wrapper">
				<header>
					<Location updateLocation={updateLocation} />
				</header>
				<main>
					<div className="layout">
						<Weather
							city={city}
							weatherDataToday={weatherDataToday}
							weeklyWeatherData={weeklyWeatherData}
						/>
					</div>
				</main>
				<Footer />
			</div>
		</div>
	);
}

export default App;
