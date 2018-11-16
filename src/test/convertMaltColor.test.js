import React from 'react';
import renderer from "react-test-renderer"
import { ConvertMaltColor } from "../components"
import { convertColor, LtoSRM } from "../utils"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("convert malt color component", () => {

	it("renders a convert malt color component", () => {
		const convertMaltColor = renderer.create(<ConvertMaltColor from="SRM" to="L" value={1} />)
		const tree = convertMaltColor.toJSON()
		expect(tree).toMatchSnapshot()
	})

	describe("when from is SRM and to is L", () => {

		it("converts the value properly and passes to value prop", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="SRM" to="L" value={1} />)
			const convertedValue = convertColor("SRM", "L", 1)
			expect(convertMaltColor.find("MaltColor").prop("value")).toBe(convertedValue)
		})

	})

	describe("when from is L and to is SRM", () => {

		it("converts the value properly and passes to value prop", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="L" to="SRM" value={1} />)
			const convertedValue = convertColor("L", "SRM", 1)
			expect(convertMaltColor.find("MaltColor").prop("value")).toBe(convertedValue)
		})

	})

	describe("when from is SRM", () => {

		it("passes the value prop to MaltColor component as srmValue prop", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="SRM" to="L" value={1} />)
			expect(convertMaltColor.find("MaltColor").prop("srmValue")).toBe(1)
		})

	})

	describe("when from is not SRM", () => {

		it("converts the value prop to SRM and passes it to the srmValue prop on MaltColor", () => {
			const convertMaltColor = shallow(<ConvertMaltColor from="L" to="EBC" value={1} />)
			const srmValue = LtoSRM(1)
			expect(convertMaltColor.find("MaltColor").prop("srmValue")).toBe(srmValue)
		})

	})

})