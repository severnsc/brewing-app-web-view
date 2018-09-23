import React from 'react';
import renderer from "react-test-renderer"
import { Flash } from "../components"
import { green } from "../components/constants"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Flash", () => {

	it("renders a Flash component", () => {
		const flash = renderer.create(<Flash message="message" />)
		const tree = flash.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("outputs the message prop", () => {
		const flash = shallow(<Flash message="hello" />)
		expect(flash.find("span").text()).toBe("hello")
	})

	it("has background of papayawhip", () => {
		const flash = shallow(<Flash message="hello" />)
		expect(flash.find("span").prop("style").background).toBe("papayawhip")
	})

	it("has padding of 5px 10px", () => {
		const flash = shallow(<Flash message="hello" />)
		expect(flash.find("span").prop("style").padding).toBe("5px 10px")
	})

	it("has borderLeft of 3px solid green", () => {
		const flash = shallow(<Flash message="hello" />)
		expect(flash.find("span").prop("style").borderLeft).toBe("3px solid " + green)
	})

	it("has color hsl(0, 0%, 13%)", () => {
		const flash = shallow(<Flash message="hello" />)
		expect(flash.find("span").prop("style").color).toBe("hsl(0, 0%, 13%)")
	})

	it("passes style props through", () => {
		const flash = shallow(<Flash message="hello" style={{position: "absolute"}} />)
		expect(flash.find("span").prop("style").position).toBe("absolute")
	})

})