import React from 'react';
import renderer from "react-test-renderer"
import { Tab, Tabs } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("Tabs", () => {

	it('renders a tabs component', () => {
		const tabs = renderer.create(
			<Tabs>
				<div>Hello</div>
			</Tabs>
		)
		let tree = tabs.toJSON()
		expect(tree).toMatchSnapshot()
	});

	it("renders children", () => {
		const tabs = shallow(
			<Tabs>
				<div id="id">Hello</div>
			</Tabs>
		)
		expect(tabs.find("#id").length).toBe(1)
	})

})

describe("Tab", () => {

	it("renders a tab component", () => {
		const hello = <div id="hello">Hello</div>
		const tab = renderer.create(
			<Tab label="label" component={hello}/>
		)
		let tree = tab.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("outputs the label prop", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab label="label" component={hello} />
		)
		expect(tab.find("span").text()).toBe("label")
	})

	it("renders the component prop", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab label="label" component={hello} />
		)
		expect(tab.find("div#hello").length).toBe(1)
	})

})