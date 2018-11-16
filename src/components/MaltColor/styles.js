import { srmToRGB } from "../../utils"

export default {
	container: {
		borderRadius: "20px",
		padding: "4px",
		position: "relative",
		height: "16px"
	},
	value: value => {
		let width = "25px"
		if(value > 99){
			width = "30px"
		}

		if(value > 999){
			width = "40px"
		}
		return {
			position: "absolute",
	    top: "0px",
	    left: value > 999 ? "-9px" : "-5px",
	    background: "rgb(250, 250, 250)",
	    borderRadius: "50%",
	    width,
	    height: "25px",
	    justifyContent: "center",
	    display: "flex",
	    alignItems: "center"
	  }
	},
	color: srm => "#" + srmToRGB(srm)
}