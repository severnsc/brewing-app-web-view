export const constructErrorMessage = (name, type, item) => 
  `${name} must be of type ${type}! Got value: ` + item

export const convertMsToMinutesSecondsString = ms => {
	const minutes = Math.floor(ms/60000)
	let seconds = (ms/60000 - minutes)*60
	if(seconds < 10) seconds = "0" + seconds
	return `${minutes}:${seconds}`
}

export const convertMinutesSecondsStringToMs = string => {
	const splitTime = string.split(":")
	return splitTime[0] * 60 * 1000 + splitTime[1] * 1000
}