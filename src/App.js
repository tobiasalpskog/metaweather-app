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
	console.log(data);
	  */

	const nearestData = data[0];
	return nearestData;
}

function App() {
	// Should have the search list available here, then,
	// we send it to our Location component
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

		// console.log(nearestCityInfo);

		const weatherRes = await fetch(
			`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
		);

		const data = await weatherRes.json();

		const weatherData = data.consolidated_weather[0];
		// air_pressure: 1021;
		// applicable_date: "2021-07-29";
		// created: "2021-07-29T13:48:02.175090Z";
		// humidity: 55;
		// id: 5014471341768704;
		// max_temp: 19.16;
		// min_temp: 11.205;
		// predictability: 70;
		// the_temp: 18.89;
		// visibility: 14.813178537341923;
		// weather_state_abbr: "lc";
		// weather_state_name: "Light Cloud";
		// wind_direction: 207.19264487165236;
		// wind_direction_compass: "SSW";
		// wind_speed: 4.822235535491396;

		// const data = {
		// 	air_pressure: 1021,
		// 	applicable_date: "2021-07-29",
		// 	created: "2021-07-29T13:48:02.175090Z",
		// 	humidity: 55,
		// 	id: 5014471341768704,
		// 	max_temp: 19.16,
		// 	min_temp: 11.205,
		// 	predictability: 70,
		// 	the_temp: 18.89,
		// 	visibility: 14.813178537341923,
		// 	weather_state_abbr: "lc",
		// 	weather_state_name: "Light Cloud",
		// 	wind_direction: 207.19264487165236,
		// 	wind_direction_compass: "SSW",
		// 	wind_speed: 4.822235535491396,
		// };

		// Loop through properties. If they are number, set precision.
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
