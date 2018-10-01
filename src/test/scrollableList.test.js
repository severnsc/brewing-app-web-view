import React from 'react';
import renderer from "react-test-renderer"
import { ScrollableList } from "../components"
import { green } from "../components/constants"
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("ScrollableList", () => {

	it("renders a ScrollableList component", () => {
		const list = renderer.create(
			<ScrollableList data={[]} renderItem={() => {}} />
		)
		let tree = list.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders the header from the header prop", () => {
		const header = (
			<div id="header">
				<span>Name</span>
				<span>Amount</span>
			</div>
		)
		const list = shallow(
			<ScrollableList
				header={header}
				data={[]}
				renderItem={() => {}}
			/>
		)
		expect(list.find("#header").childAt(0).text()).toBe("Name")
		expect(list.find("#header").childAt(1).text()).toBe("Amount")
	})

	it("renders the data following the renderItem prop", () => {
		const data = [{key:1, name: "Name", amount: "Amount"}]
		const renderItem = item => (
			<div id="row" key={item.key}>
				<span>{item.name}</span>
				<span>{item.amount}</span>
			</div>
		)
		const list = shallow(
			<ScrollableList
				data={data}
				renderItem={renderItem}
			/>
		)
		expect(list.find("#row").childAt(0).text()).toBe("Name")
		expect(list.find("#row").childAt(1).text()).toBe("Amount")
	})

	it("passes the style prop through to the wrapping div", () => {
		const list = shallow(
			<ScrollableList
				data={[]}
				renderItem={() => {}}
				style={{background: "red"}}
			/>
		)
		expect(list.find("div").prop("style").background).toBe("red")
	})

})