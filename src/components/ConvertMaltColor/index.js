import React from "react"
import PropTypes from "prop-types"
import { MaltColor } from ".."
import { convertColor } from "../../utils"

const ConvertMaltColor = ({ from, to, value }) => {

	const convertedColor = convertColor(from, to, value)

	let srmValue
	if(from === "SRM"){
		srmValue = value
	}else{
		srmValue = convertColor(from, "SRM", value)
	}

	return <MaltColor srmValue={srmValue} value={convertedColor} />

}

ConvertMaltColor.propTypes = {
	from: PropTypes.oneOf(["SRM", "L", "EBC"]).isRequired,
	to: PropTypes.oneOf(["SRM", "L", "EBC"]).isRequired,
	value: PropTypes.number.isRequired
}

export default ConvertMaltColor