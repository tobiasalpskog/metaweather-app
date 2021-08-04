import imgLinks from "../../imgLinks";

import {
	getImgAltFromWeatherAbbr,
	getWeekdayFromDate,
	setPrecision,
} from "../../utils/conversions";

import CertaintyBar from "../CertaintyBar";

export default function Weekly({ weeklyData }) {
	/* 
	To display: img, weather type, temperature, certainty?
	*/
	return (
		<div className="card-container p-8">
			<h2 className="text centered">Weekly</h2>
			<div className="flex row centered">
				<div className="flex row scroll">
					{weeklyData.map((data, index) => {
						let date = new Date(data.applicable_date);
						return (
							<div
								className="grid row-1 col-2 mr-8"
								key={`weekly-data-${data.applicable_date}`}
							>
								<p className="text centered mb-0">
									{getWeekdayFromDate(date.getDay())}
								</p>
								<img
									src={imgLinks[data.weather_state_abbr]}
									alt={getImgAltFromWeatherAbbr(data.weather_state_abbr)}
									className="centered vfull mtb-6 self-start align-self-centered"
								/>
								{/* <span className="text centered">{data.weather_state_name}</span> */}
								<span className="text centered">
									{`${setPrecision(data.the_temp, 3)} °C`}
								</span>
								{/* <span className="text centered">{data.predictability}</span> */}
								<CertaintyBar certaintyPercentage={data.predictability} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
