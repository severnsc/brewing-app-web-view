import React from 'react';
import renderer from "react-test-renderer"
import { MaltColor } from "../components"
import { srmToRGB } from "../utils"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("malt color component", () => {

	it("renders a malt color component", () => {
		const maltColor = renderer.create(<MaltColor value={0} srmValue={0} />)
		const tree = maltColor.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders the value prop", () => {
		const maltColor = shallow(<MaltColor value={1} srmValue={1} />)
		expect(maltColor.find("span").text()).toBe("1")
	})

	it("sets the background to converted srmToRGB value", () => {
		const maltColor = shallow(<MaltColor srmValue={1} value={2} />)
		const rgbValue = "#" + srmToRGB(1)
		expect(maltColor.find("div").prop("style").background).toBe(rgbValue)
	})

})