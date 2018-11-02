import React from 'react';
import renderer from "react-test-renderer"
import { Weight } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("weight component", () => {

	it("renders a weight component", () => {
		const weight = renderer.create(<Weight amount={0} unit="imperial" />)
		const tree = weight.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders a span", () => {
		const weight = shallow(<Weight amount={0} unit="imperial" />)
		expect(weight.find("span").length).toBe(1)
	})

	it("renders lbs and oz when the unit prop is imperial", () => {
		const weight = shallow(<Weight unit="imperial" amount={1} />)
		const matchGroup = weight.text().match(/(lb).*(oz)/)
		expect(matchGroup[1]).toBe("lb")
		expect(matchGroup[2]).toBe("oz")
	})

	it("renders kg and g when the unit prop is metric", () => {
		const weight = shallow(<Weight unit="metric" amount={1} />)
		const matchGroup = weight.text().match(/(kg).*(g)/)
		expect(matchGroup[1]).toBe("kg")
		expect(matchGroup[2]).toBe("g")
	})

	describe("when the unit prop is imperial", () => {

		it("renders 1 lb, 0 oz when the amount prop is 1", () => {
			const weight = shallow(<Weight unit="imperial" amount={1} />)
			expect(weight.text()).toBe("1 lb, 0 oz")
		})

		it("renders 2 lbs, 0 oz when the amount prop is 2", () => {
			const weight = shallow(<Weight unit="imperial" amount={2} />)
			expect(weight.text()).toBe("2 lbs, 0 oz")
		})

		it("renders 1 lb, 2 oz when the amount prop is 1.125", () => {
			const weight = shallow(<Weight unit="imperial" amount={1.125} />)
			expect(weight.text()).toBe("1 lb, 2 oz")
		})

		it("renders 2 lbs, 8 oz when the amount prop is 2.5", () => {
			const weight = shallow(<Weight unit="imperial" amount={2.5} />)
			expect(weight.text()).toBe("2 lbs, 8 oz")
		})

	})

	describe("when the unit prop is metric", () => {

		it("renders 1 kg, 0 g when the amount prop is 1", () => {
			const weight = shallow(<Weight unit="metric" amount={1} />)
			expect(weight.text()).toBe("1 kg, 0 g")
		})

		it("renders 2 kgs, 0 g when the amount prop is 2", () => {
			const weight = shallow(<Weight unit="metric" amount={2} />)
			expect(weight.text()).toBe("2 kgs, 0 g")
		})

		it("renders 1 kg, 200 g when the amount prop is 1.2", () => {
			const weight = shallow(<Weight unit="metric" amount={1.2} />)
			expect(weight.text()).toBe("1 kg, 200 g")
		})

		it("renders 1 kg, 0.1 g when the amount prop is 1.0001", () => {
			const weight = shallow(<Weight unit="metric" amount={1.0001} />)
			expect(weight.text()).toBe("1 kg, 0.1 g")
		})

		it("renders 2 kgs, 0 g when the amount prop is 2", () => {
			const weight = shallow(<Weight unit="metric" amount={2} />)
			expect(weight.text()).toBe("2 kgs, 0 g")
		})

		it("renders 2 kgs, 100 g when the amount prop is 2.1", () => {
			const weight = shallow(<Weight unit="metric" amount={2.1} />)
			expect(weight.text()).toBe("2 kgs, 100 g")
		})

		it("renders 2 kgs, 100.1 g when the amount prop is 2.1001", () => {
			const weight = shallow(<Weight unit="metric" amount={2.1001} />)
			expect(weight.text()).toBe("2 kgs, 100.1 g")
		})

	})

})