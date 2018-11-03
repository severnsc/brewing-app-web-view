import React from 'react';
import renderer from "react-test-renderer"
import { ConvertMaltColor } from "../components"
import { convertColor } from "../utils"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("convert malt color component", () => {

	it("renders a convert malt color component", () => {
		const convertMaltColor = renderer.create(<ConvertMaltColor />)
		const tree = convertMaltColor.toJSON()
		expect(tree).toMatchSnapshot()
	})

	describe("when from is SRM and to is L", () => {

		it("renders a MaltColor component with unit prop L", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="SRM" to="L" />)
			expect(convertMaltColor.find("MaltColor").prop("unit")).toBe("L")
		})

		it("converts the value properly and passes to value prop", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="SRM" to="L" value={1} />)
			const convertedValue = convertColor("SRM", "L", 1)
			expect(convertMaltColor.find("MaltColor").prop("value")).toBe(convertedValue)
		})

	})

	describe("when from is L and to is SRM", () => {

		it("renders a MaltColor component with unit prop SRM", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="L" to="SRM" />)
			expect(convertMaltColor.find("MaltColor").prop("unit")).toBe("SRM")
		})

		it("converts the value properly and passes to value prop", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="L" to="SRM" value={1} />)
			const convertedValue = convertColor("L", "SRM", 1)
			expect(convertMaltColor.find("MaltColor").prop("value")).toBe(convertedValue)
		})

	})

})