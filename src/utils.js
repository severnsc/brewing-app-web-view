import moment from "moment"

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

export const maltColor = type => {
	switch(type){
		case "EBC":
			return "EBC"

		case "L":
			return "L"

		default:
			return "SRM"
	}
}