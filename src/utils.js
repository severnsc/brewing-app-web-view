import moment from "moment"
import convert from "convert-units"

export const constructErrorMessage = (name, type, item) => 
  `${name} must be of type ${type}! Got value: ` + item

export const convertMsToMinutesSecondsString = ms => {
	const tempTime = moment.duration(ms)
	let hours = tempTime.hours()
	let minutes = tempTime.minutes()
	let seconds = tempTime.seconds()
	let times = [hours, minutes, seconds]
	times = times.map(time => time < 10 ? "0" + time : time)
	return `${times[0]}:${times[1]}:${times[2]}`
}

export const convertMinutesSecondsStringToMs = string => {
	const splitTime = string.split(":")
	return splitTime[0] * 60 * 60 * 1000 + splitTime[1] * 60 * 1000 + splitTime[2] * 1000
}

export const weightUnits = type => {
	switch(type){
		case "metric":
			return "(kg, g)"

		default:
			return "(lbs, oz)"
	}
}

export const convertKgToLbs = kg => convert(kg).from("kg").to("lb")

export const convertLbsToKg = lbs => convert(lbs).from("lb").to("kg")

export const convertWeight = (weight, originalUnits, convertedUnits) => {
	if(originalUnits === "imperial" && convertedUnits === "metric"){
		return convertLbsToKg(weight)
	}

	if(originalUnits === "metric" && convertedUnits === "imperial"){
		return convertKgToLbs(weight)
	}

	return weight
}

export const formatLbsOzString = weight => {
	const lbs = Math.trunc(weight)
	const oz = convert(weight - lbs).from("lb").to("oz")
	const lbsString = lbs <= 1 ? "lb" : "lbs"
	return `${lbs} ${lbsString}, ${oz} oz`
}

export const formatKgGString = weight => {
	const kgs = Math.trunc(weight)
	const g = convert(parseFloat((weight - kgs).toFixed(4))).from("kg").to("g")
	const kgsString = kgs <= 1 ? "kg" : "kgs"
	return `${kgs} ${kgsString}, ${g} g`
}

export const formatWeightString = (weight, units) => {
	if(units === "imperial"){
		return formatLbsOzString(weight)
	}

	if(units === "metric"){
		return formatKgGString(weight)
	}
}