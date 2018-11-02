import React from 'react';
import renderer from "react-test-renderer"
import { ConvertWeight, Weight } from "../components"
import { convertLbsToKg, convertKgToLbs } from "../utils"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("convertWeight component", () => {

	it("renders a convertWeight component", () => {
		const convertWeight = renderer.create(<ConvertWeight from="metric" to="imperial" amount={1} />)
		const tree = convertWeight.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders a Weight component", () => {
		const convertWeight = shallow(<ConvertWeight from="metric" to="imperial" amount={1} />)
		expect(convertWeight.type()).toBe(Weight)
	})

	it("passes the to prop to the unit prop on the child Weight", () => {
		const convertWeight = shallow(<ConvertWeight from="imperial" to="metric" amount={1} />)
		expect(convertWeight.find("Weight").prop("unit")).toBe("metric")
	})

	it("converts the amount from the from imperial to metric", () => {
		const convertWeight = shallow(<ConvertWeight from="imperial" to="metric" amount={1} />)
		const convertedWeight = convertLbsToKg(1)
		expect(convertWeight.find("Weight").prop("amount")).toEqual(convertedWeight)
	})

	it("converts the amount from metric to imperial", () => {
		const convertWeight = shallow(<ConvertWeight from="metric" to="imperial" amount={1} />)
		const convertedWeight = convertKgToLbs(1)
		expect(convertWeight.find("Weight").prop("amount")).toEqual(convertedWeight)
	})

})