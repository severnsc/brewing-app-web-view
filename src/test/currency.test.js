import React from 'react';
import renderer from "react-test-renderer"
import { Currency } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe.only("currency component", () => {

	it("renders a currency component", () => {
		const currency = renderer.create(<Currency amount={0} unit="USD"/>)
		const tree = currency.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders a span", () => {
		const currency = shallow(<Currency amount={0} unit="USD"/>)
		expect(currency.find("span").length).toBe(1)
	})

	it("outputs the amount prop", () => {
		const currency = shallow(<Currency amount={20} unit="USD" />)
		expect(currency.text()).toBe("$20.00")
	})

	it("outputs decimals if amount prop is a float", () => {
		const currency = shallow(<Currency amount={20.00} unit="USD" />)
		expect(currency.text()).toBe("$20.00")
	})

	it("renders a $ when unit is USD", () => {
		const currency = shallow(<Currency amount={0} unit="USD" />)
		expect(currency.contains("$")).toBe(true)
	})

	it("renders a £ when unit is GBP", () => {
		const currency = shallow(<Currency amount={0} unit="GBP" />)
		expect(currency.contains("£")).toBe(true)
	})

	it("renders a € sign when unit is EUR", () => {
		const currency = shallow(<Currency amount={0} unit="EUR" />)
		expect(currency.contains("€")).toBe(true)
	})

})