import React from 'react';
import renderer from "react-test-renderer"
import { Tab, Tabs } from "../components"
import { green } from "../components/constants"
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

	it("has hsl(0, 0%, 22%) colored header", () => {
		const tabs = mount(
			<Tabs>
				<Tab active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab active={false} label="tab2" component={<div key="tab2" className="inactive">Tab 2</div>} />
				<Tab active={false} label="tab3" component={<div key="tab3" className="inactive">Tab 3</div>} />
			</Tabs>
		)
		const header = tabs.find("ol")
		expect(header.prop("style").background).toBe("hsl(0, 0%, 22%)")
	})

	it("has header 10px marginBottom", () => {
		const tabs = mount(
			<Tabs>
				<Tab active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab active={false} label="tab2" component={<div key="tab2" className="inactive">Tab 2</div>} />
				<Tab active={false} label="tab3" component={<div key="tab3" className="inactive">Tab 3</div>} />
			</Tabs>
		)
		const header = tabs.find("ol")
		expect(header.prop("style").marginBottom).toBe("10px")
	})

	it("has display flex", () => {
		const tabs = mount(
			<Tabs>
				<Tab active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab active={false} label="tab2" component={<div key="tab2" className="inactive">Tab 2</div>} />
				<Tab active={false} label="tab3" component={<div key="tab3" className="inactive">Tab 3</div>} />
			</Tabs>
		)
		const header = tabs.find("ol")
		expect(header.prop("style").display).toBe("flex")
	})

	it("has justifyContent space-around", () => {
		const tabs = mount(
			<Tabs>
				<Tab active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab active={false} label="tab2" component={<div key="tab2" className="inactive">Tab 2</div>} />
				<Tab active={false} label="tab3" component={<div key="tab3" className="inactive">Tab 3</div>} />
			</Tabs>
		)
		const header = tabs.find("ol")
		expect(header.prop("style").justifyContent).toBe("space-around")
	})

	it("has box-shadow rgba(0, 0, 0, 0.2) 0px 4px 6px 0px", () => {
		const tabs = mount(
			<Tabs>
				<Tab active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab active={false} label="tab2" component={<div key="tab2" className="inactive">Tab 2</div>} />
				<Tab active={false} label="tab3" component={<div key="tab3" className="inactive">Tab 3</div>} />
			</Tabs>
		)
		const box = tabs.find("div").first()
		expect(box.prop("style").boxShadow).toBe("rgba(0, 0, 0, 0.2) 0px 4px 6px 0px")
	})

	it("has 20px padding", () => {
		const tabs = mount(
			<Tabs>
				<Tab active={true} label="tab1" component={<div key="tab1" id="tab1">Tab 1</div>} />
				<Tab active={false} label="tab2" component={<div key="tab2" className="inactive">Tab 2</div>} />
				<Tab active={false} label="tab3" component={<div key="tab3" className="inactive">Tab 3</div>} />
			</Tabs>
		)
		const box = tabs.find("div").first()
		expect(box.prop("style").padding).toBe("20px")
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

	it("displays inline-block style", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab onClick={() => {}} active={true} label="label" component={hello} />
		)
		expect(tab.find("li").prop("style").display).toBe("inline-block")
	})

	it("has 10px padding", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab onClick={() => {}} active={true} label="label" component={hello} />
		)
		expect(tab.find("li").prop("style").padding).toBe("10px")
	})

	it("has color hsla(0, 0%, 100%, 0.9) when active", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab onClick={() => {}} active={true} label="label" component={hello} />
		)
		expect(tab.find("li").prop("style").color).toBe("hsla(0, 0%, 100%, 0.9)")
	})

	it("has borderBottom 3px solid green when active", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab onClick={() => {}} active={true} label="label" component={hello} />
		)
		expect(tab.find("li").prop("style").borderBottom).toBe("3px solid " + green)
	})

	it("has color hsl(0, 0%, 76%) when not active", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab onClick={() => {}} active={false} label="label" component={hello} />
		)
		expect(tab.find("li").prop("style").color).toBe("hsl(0, 0%, 76%)")
	})

	it("has cursor as pointer", () => {
		const hello = <div id="hello">Hello</div>
		const tab = shallow(
			<Tab onClick={() => {}} active={true} label="label" component={hello} />
		)
		expect(tab.find("li").prop("style").cursor).toBe("pointer")
	})

})