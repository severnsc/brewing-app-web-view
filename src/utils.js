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

const isInt = num => num % 1 === 0

export const formatLbsOzString = weight => {
	const lbs = Math.trunc(weight)
	const oz = convert(weight - lbs).from("lb").to("oz")
	const lbsString = lbs <= 1 ? "lb" : "lbs"
	return `${lbs} ${lbsString}, ${oz} oz`
}

export const formatKgGString = weight => {
	const kgs = Math.trunc(weight)
	let g = parseFloat(convert((weight - kgs)).from("kg").to("g").toFixed(1))
	if(isInt(g)) g = (g).toFixed(0)
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

export const SRMtoL = srm => (srm + 0.6) / 1.35
export const LtoSRM = l => (1.35 * l) - 0.6

export const convertColor = (from, to, value) => {
	if(from === "SRM" && to === "L"){
		return SRMtoL(value)
	}

	if(from === "L" && to === "SRM"){
		return LtoSRM(value)
	}

	return value
}

export const srmToRGB = srm => {
    // Returns an RGB value based on SRM
    var r=0, g=0, b=0;

    if (srm>=0 && srm<=1) {
        r = 240;
        g = 239;
        b = 181;
    } else if (srm>1 && srm<=2) {
        r = 233;
        g = 215;
        b = 108;
    } else if (srm>2) {
        // Set red decimal
        if (srm<70.6843) {        
            r = 243.8327-6.4040*srm+0.0453*srm*srm;
        } else {
            r = 17.5014;
        }
        // Set green decimal
        if (srm<35.0674) {
            g = 230.929-12.484*srm+0.178*srm*srm;
        } else {
            g = 12.0382;
        }
        // Set blue decimal
        if (srm<4) {
            b = -54*srm+216;
        } else if (srm>=4 && srm<7) {
            b = 0;
        } else if (srm>=7 && srm<9) {
            b = 13*srm-91;
        } else if (srm>=9 && srm<13) {
            b = 2*srm+8;
        } else if (srm>=13 && srm<17) {
            b = -1.5*srm+53.5;
        } else if (srm>=17 && srm<22) {
            b = 0.6*srm+17.8;
        } else if (srm>=22 && srm<27) {
            b = -2.2*srm+79.4;
        } else if (srm>=27 && srm<34) {
            b = -0.4285*srm + 31.5714;
        } else {
            b = 17;
        }
    }
    var red = doubleToHex(r);
    var green = doubleToHex(g);
    var blue = doubleToHex(b);
    return ""+red+green+blue;
}

function doubleToHex(d) {
    // Converts decimal in string to hex in string 
    var hexText = d.toString(16);
    var point = hexText.indexOf(".");
    if (point !== -1) {
        hexText = hexText.substring(0,point);
    }
    while (hexText.length < 2) {
        hexText = "0"+hexText;    
    }
    return hexText;
}