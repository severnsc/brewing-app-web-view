import React from "react"
import { SRM, Lovibond } from ".."

const MaltColor = ({ unit, value }) => {
	switch(unit){
		case "SRM":
			return <SRM value={value} />

		case "L":
			return <Lovibond value={value} />

		default:
			return null
	}
}

export default MaltColor