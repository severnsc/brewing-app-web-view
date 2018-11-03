import React from "react"
import { MaltColor } from ".."
import { convertColor } from "../../utils"

const ConvertMaltColor = ({ from, to, value }) => {

	const convertedColor = convertColor(from, to, value)

	return <MaltColor value={convertedColor} />

}

export default ConvertMaltColor