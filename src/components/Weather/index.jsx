import React, { useState, useEffect } from "react";

import Main from "./Main";
import Weekly from "./Weekly";
import Details from "./Details";

function Weather({ city, weatherDataToday, weeklyWeatherData }) {
	const [isShowingDetails, setIsShowingDetails] = useState(false);

	// Need data for today and the following 5-6 days.

	function toggleExpandedView() {
		if (isShowingDetails) {
			document.getElementById("selected-city").scrollIntoView({
				block: "end",
				inline: "start",
				behavior: "smooth",
			});
			setTimeout(() => setIsShowingDetails((prevState) => !prevState), 400);
		} else {
			setIsShowingDetails((prevState) => !prevState);
		}
	}

	// let weeklyWeatherData = [
	// 	{
	// 		id: 6338597142659072,
	// 		weather_state_name: "Heavy Rain",
	// 		weather_state_abbr: "hr",
	// 		wind_direction_compass: "W",
	// 		created: "2021-07-30T18:56:03.047953Z",
	// 		applicable_date: "2021-07-31",
	// 		min_temp: 13.645,
	// 		max_temp: 21.665,
	// 		the_temp: 20.415,
	// 		wind_speed: 5.521634776433628,
	// 		wind_direction: 270.6665349984058,
	// 		air_pressure: 1008.5,
	// 		humidity: 65,
	// 		visibility: 10.082990336435218,
	// 		predictability: 77,
	// 	},
	// 	{
	// 		id: 5077006065598464,
	// 		weather_state_name: "Showers",
	// 		weather_state_abbr: "s",
	// 		wind_direction_compass: "NNW",
	// 		created: "2021-07-30T18:56:02.045827Z",
	// 		applicable_date: "2021-08-01",
	// 		min_temp: 13.815,
	// 		max_temp: 19.195,
	// 		the_temp: 18.8,
	// 		wind_speed: 4.390209989156658,
	// 		wind_direction: 335.4949601910147,
	// 		air_pressure: 1010.5,
	// 		humidity: 71,
	// 		visibility: 10.225595025053686,
	// 		predictability: 73,
	// 	},
	// 	{
	// 		id: 6065516947963904,
	// 		weather_state_name: "Showers",
	// 		weather_state_abbr: "s",
	// 		wind_direction_compass: "ENE",
	// 		created: "2021-07-30T18:56:02.164634Z",
	// 		applicable_date: "2021-08-02",
	// 		min_temp: 13.56,
	// 		max_temp: 20.23,
	// 		the_temp: 20.564999999999998,
	// 		wind_speed: 3.670067091990774,
	// 		wind_direction: 66.20227905307691,
	// 		air_pressure: 1014.5,
	// 		humidity: 55,
	// 		visibility: 12.346645589755827,
	// 		predictability: 73,
	// 	},
	// 	{
	// 		id: 6630717464248320,
	// 		weather_state_name: "Showers",
	// 		weather_state_abbr: "s",
	// 		wind_direction_compass: "SSW",
	// 		created: "2021-07-30T18:56:01.685583Z",
	// 		applicable_date: "2021-08-03",
	// 		min_temp: 13.06,
	// 		max_temp: 21.549999999999997,
	// 		the_temp: 21.505,
	// 		wind_speed: 4.406435946827859,
	// 		wind_direction: 206.17486254334403,
	// 		air_pressure: 1014.0,
	// 		humidity: 57,
	// 		visibility: 12.672244094488189,
	// 		predictability: 73,
	// 	},
	// 	{
	// 		id: 6385540027908096,
	// 		weather_state_name: "Heavy Rain",
	// 		weather_state_abbr: "hr",
	// 		wind_direction_compass: "WSW",
	// 		created: "2021-07-30T18:56:04.552902Z",
	// 		applicable_date: "2021-08-04",
	// 		min_temp: 13.18,
	// 		max_temp: 20.240000000000002,
	// 		the_temp: 18.31,
	// 		wind_speed: 4.852022786924362,
	// 		wind_direction: 240.0,
	// 		air_pressure: 1006.0,
	// 		humidity: 81,
	// 		visibility: 9.487716734271853,
	// 		predictability: 77,
	// 	},
	// ];

	return (
		<>
			<Main
				data={weatherDataToday}
				city={city}
				isShowingDetails={isShowingDetails}
				toggleExpandedView={toggleExpandedView}
			/>
			<div className="flex column">
				<Details
					data={weatherDataToday}
					isShowingDetails={isShowingDetails}
					toggleExpandedView={toggleExpandedView}
				/>
				<Weekly weeklyData={weeklyWeatherData} />
			</div>
		</>
	);
}

export default Weather;
