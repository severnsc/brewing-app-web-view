import React from 'react';
import renderer from "react-test-renderer"
import { Tab, Tabs } from "../components"
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("Tabs", () => {

	it('renders a tabs component', () => {
		const tabs = renderer.create(
			<Tabs>
				<Tab onClick={() => {}} id="id" active={true} label="tab1" component={<div key="tab1">Tab 1</div>} />
				<Tab onClick={() => {}} active={false} label="tab2" component={<div key="tab2">Tab 2</div>} />
			</Tabs>
		)
		let tree = tabs.toJSON()
		expect(tree).toMatchSnapshot()
	});

	it("renders children", () => {
		const tabs = mount(
			<Tabs>
				<Tab onClick={() => {}} id="id" active={true} label="tab1" component={<div id="tab1" key="tab1">Tab 1</div>} />
				<Tab onClick={() => {}} active={false} label="tab2" component={<div key="tab2">Tab 2</div>} />
			</Tabs>
		)
		expect(tabs.find("#tab1").length).toBe(1)
	})

	it("renders tabs", () => {
		const tabs = shallow(
			<Tabs>
				<Tab onClick={() => {}} active={true} label="tab1" component={<div key="tab1">Tab 1</div>} />
				<Tab onClick={() => {}} active={false} label="tab2" component={<div key="tab2">Tab 2</div>} />
				<Tab onClick={() => {}} active={false} label="tab3" component={<div key="tab3">Tab 3</div>} />
			</Tabs>
		)
		expect(tabs.find(Tab).length).toBe(3)
	})

	it("renders the child of the active tab", () => {
		const tabs = mount(
			<Tabs>
				<Tab onClick={() => {}} active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab onClick={() => {}} active={false} label="tab2" component={<div key="tab2">Tab 2</div>} />
				<Tab onClick={() => {}} active={false} label="tab3" component={<div key="tab3">Tab 3</div>} />
			</Tabs>
		)
		expect(tabs.find("#tab1").length).toBe(1)
	})

	it("does not render children of not active tabs", () => {
		const tabs = mount(
			<Tabs>
				<Tab onClick={() => {}} active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab onClick={() => {}} active={false} label="tab2" component={<div key="tab2" class="inactive">Tab 2</div>} />
				<Tab onClick={() => {}} active={false} label="tab3" component={<div key="tab3" class="inactive">Tab 3</div>} />
			</Tabs>
		)
		expect(tabs.find(".inactive").length).toBe(0)
	})

	it("changes the activeTab onClick", () => {
		const tabs = mount(
			<Tabs>
				<Tab active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab active={false} label="tab2" component={<div key="tab2" className="inactive">Tab 2</div>} />
				<Tab active={false} label="tab3" component={<div key="tab3" className="inactive">Tab 3</div>} />
			</Tabs>
		)
		tabs.find({label: "tab2"}).simulate("click")
		expect(tabs.find(".inactive").length).toBe(1)
	})

})

describe("Tab", () => {

	it("renders a tab component", () => {
		const hello = <div id="hello">Hello</div>
		const tab = renderer.create(
			<Tab onClick={() => {}} active={true} label="label" component={hello}/>
		)
		let tree = tab.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("outputs the label prop", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab onClick={() => {}} active={true} label="label" component={hello} />
		)
		expect(tab.find("li").text()).toBe("label")
	})

	it("calls onClick handler on click", () => {
		const hello = <div id="hello">Hello</div>
		const mockOnClick = jest.fn()
		const tab = shallow(
			<Tab onClick={() => {}} active={true} label="label" component={hello} onClick={mockOnClick} />
		)
		tab.find("li").simulate("click")
		expect(mockOnClick.mock.calls.length).toBe(1)
	})

})