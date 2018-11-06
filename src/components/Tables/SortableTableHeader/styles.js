const calcWidth = numberOfItems => 100/numberOfItems + "%"

export default {
	tableHead: {
		backgroundColor: "hsl(0, 0%, 95%)",
		color: "hsl(0, 0%, 50%)",
		cursor: "pointer"
	},
	th: numberOfItems => ({
		padding: "20px 10px",
		width: calcWidth(numberOfItems)
	})
}