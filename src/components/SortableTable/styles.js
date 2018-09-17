const styles = {
	pageButton: {
		textDecoration: "underline",
    cursor:"pointer",
    width: "86.73px"
	},
	container: {
		display: "flex",
		"flexFlow": "column"
	},
	table: {
		margin: "10px",
		borderCollapse: "collapse",
		textAlign: "left"
	},
	tableHead: {
		backgroundColor: "hsl(0, 0%, 95%)",
		color: "hsl(0, 0%, 50%)",
		cursor: "pointer"
	},
	tableHeadCell: {
		padding: "20px 10px"
	},
	tableData: {
		borderBottom: "1px solid hsl(0, 0%, 90%)",
		padding: "20px 10px",
		color: "hsl(0, 0%, 22%)"
	},
	footer: {
		display: "flex",
		margin:"0 10px"
	},
	span: {
		flex: "1"
	},
	itemsPerPage: {
		marginLeft: "5px"
	}
}

styles.leftPageButton = {
	...styles.pageButton,
	textAlign: "left"
}

styles.rightPageButton = {
	...styles.pageButton,
	textAlign: "right"
}

export default styles