import dashboard from "./dashboard"
import login from "./login"
import signup from "./signup"
import modal from "./modal"
import timersTable from "./timersTable"
import activeTimer from "./activeTimer"
import inventoriesTable from "./inventoriesTable"
import maltInventoryTable from "./maltInventoryTable"
import hopsInventoryTable from "./hopsInventoryTable"
import yeastInventoryTable from "./yeastInventoryTable"
import otherInventoriesTable from "./otherInventoriesTable"
import flash from "./flash"

export default {
	dashboard,
	login,
	signup,
	modal,
	timersTable,
	activeTimer,
	inventoriesTable,
	tables: [
		maltInventoryTable,
		hopsInventoryTable,
		yeastInventoryTable,
		otherInventoriesTable
	],
	flash
}