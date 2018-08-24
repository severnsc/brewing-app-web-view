import moment from "moment"

export const constructErrorMessage = (name, type, item) => 
  `${name} must be of type ${type}! Got value: ` + item

export const convertMsToMinutesSecondsString = ms => {
	const tempTime = moment.duration(ms)
	const hours = tempTime.hours()
	const minutes = tempTime.minutes()
	let seconds = tempTime.seconds()
	if(seconds < 10) seconds = "0" + seconds
	return `${hours}:${minutes}:${seconds}`
}

export const convertMinutesSecondsStringToMs = string => {
	const splitTime = string.split(":")
	return splitTime[0] * 60 * 60 * 1000 + splitTime[1] * 60 * 1000 + splitTime[2] * 1000
}