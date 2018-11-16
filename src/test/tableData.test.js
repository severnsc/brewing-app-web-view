import React from 'react';
import renderer from "react-test-renderer"
import { TableData } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("table data component", () => {

	it("renders a table data component", () => {
		const tableData = renderer.create(<TableData />)
		const tree = tableData.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders a td", () => {
		const tableData = shallow(<TableData />)
		expect(tableData.find("td").length).toBe(1)
	})

	it("renders the value prop", () => {
		const tableData = shallow(<TableData value="hello" />)
		expect(tableData.text()).toBe("hello")
	})

	it("has borderBottom 1px solid hsl(0, 0%, 90%)", () => {
		const tableData = shallow(<TableData />)
		expect(tableData.find("td").prop("style").borderBottom).toBe("1px solid hsl(0, 0%, 90%)")
	})

	it("has padding: 20px 10px", () => {
		const tableData = shallow(<TableData />)
		expect(tableData.find("td").prop("style").padding).toBe("20px 10px")
	})

	it("has color: hsl(0, 0%, 22%)", () => {
		const tableData = shallow(<TableData />)
		expect(tableData.find("td").prop("style").color).toBe("hsl(0, 0%, 22%)")
	})

	it("merges style prop into the td style", () => {
		const tableData = shallow(<TableData style={{fontFamily: "arial"}} />)
		expect(tableData.find("td").prop("style").fontFamily).toBe("arial")
	})

})