import React from 'react';
import renderer from "react-test-renderer"
import { Flash } from "../components"
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

})