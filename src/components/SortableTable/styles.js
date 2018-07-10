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
		border: "1px solid",
		margin: "10px",
		borderCollapse: "collapse"
	},
	tableHead: {
		backgroundColor: "#e8e8e8"
	},
	tableHeadCell: {
		border: "1px solid",
		padding: "10px"
	},
	tableData: {
		border: "1px solid"
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