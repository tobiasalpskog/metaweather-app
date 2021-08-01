export function celsiusToFahrenheit(celsius) {
	return (celsius * 9) / 5 + 32;
}

export function getMonthFromDate(date) {
	let month;

	switch (date.getMonth()) {
		case 1:
			month = "Jan";
			break;
		case 2:
			month = "Feb";
			break;
		case 3:
			month = "Mar";
			break;
		case 4:
			month = "Apr";
			break;
		case 5:
			month = "May";
			break;
		case 6:
			month = "Jun";
			break;
		case 7:
			month = "Jul";
			break;
		case 8:
			month = "Aug";
			break;
		case 9:
			month = "Sep";
			break;
		case 10:
			month = "Oct";
			break;
		case 11:
			month = "Nov";
			break;
		case 12:
			month = "Dec";
			break;
	}
	return month;
}
export function getWeekdayFromDate(dayNumber) {
	let day;

	switch (dayNumber) {
		case 0:
			day = "Monday";
			break;
		case 1:
			day = "Tuesday";
			break;
		case 2:
			day = "Wednesday";
			break;
		case 3:
			day = "Thursday";
			break;
		case 4:
			day = "Friday";
			break;
		case 5:
			day = "Saturday";
			break;
		case 6:
			day = "Sunday";
			break;
	}
	return day;
}

export function getImgAltFromWeatherAbbr(weather_abbr) {
	let alt;

	switch (weather_abbr) {
		case "sn":
			alt = "Snow falling from a cloud";
			break;
		case "sl":
			alt = "Sleet falling from a cloud";
			break;
		case "h":
			alt = "Hail falling from a cloud";
			break;
		case "t":
			alt = "A thunderstorm";
			break;
		case "hr":
			alt = "A cloud with heavy rain falling from it";
			break;
		case "lr":
			alt = "A cloud with light rain falling from it";
			break;
		case "s":
			alt = "A cloud with some rain and a sun";
			break;
		case "hc":
			alt = "Two clouds close to each other";
			break;
		case "lc":
			alt = "A cloud and a sun shining above it";
			break;
		case "c":
			alt = "A big bright sun";
			break;
	}

	return alt;
}

export function setPrecision(number, precision) {
	if (typeof number !== "number") {
		throw new Error("Parameter 'number' was not a number.");
	}
	let numberWithReducedPrecision = number.toPrecision(precision);
	return numberWithReducedPrecision;
}
