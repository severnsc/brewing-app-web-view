import React from "react"
import { MaltColor } from ".."
import { convertColor } from "../../utils"

const ConvertMaltColor = ({ from, to, value }) => {

	const convertedColor = convertColor(from, to, value)

	if(from === "SRM" && to === "L"){
		return <MaltColor unit="L" value={convertedColor} />
	}

	if(from === "L" && to === "SRM"){
		return <MaltColor unit="SRM" value={convertedColor} />
	}

	return null

}

export default ConvertMaltColor