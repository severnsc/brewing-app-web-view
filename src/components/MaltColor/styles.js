import { srmToRGB } from "../../utils"

export default {
	container: {
		borderRadius: "20px",
		padding: "4px",
		position: "relative",
		height: "16px"
	},
	value: {
		position: "absolute",
    top: "0px",
    left: "-5px",
    background: "rgb(250, 250, 250)",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center"
	},
	color: l => "#" + srmToRGB(l)
}