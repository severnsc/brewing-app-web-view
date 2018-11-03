import React from 'react';
import renderer from "react-test-renderer"
import { MaltColor } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("malt color component", () => {

	it("renders a malt color component", () => {
		const maltColor = renderer.create(<MaltColor value={0} />)
		const tree = maltColor.toJSON()
		expect(tree).toMatchSnapshot()
	})

	describe("when unit prop is SRM", () => {

		it("renders a SRM component", () => {
			const maltColor = shallow(<MaltColor unit="SRM" value={0} />)
			expect(maltColor.find("SRM").length).toBe(1)
		})

		it("passes the value prop to SRM component", () => {
			const maltColor = shallow(<MaltColor unit="SRM" value={1} />)
			expect(maltColor.find("SRM").prop("value")).toBe(1)
		})

	})

	describe("when unit prop is L", () => {

		it("renders a Lovibond component", () => {
			const maltColor = shallow(<MaltColor unit="L" value={0} />)
			expect(maltColor.find("Lovibond").length).toBe(1)
		})

		it("passes the value prop to the Lovibond component", () => {
			const maltColor = shallow(<MaltColor unit="L" value={1} />)
			expect(maltColor.find("Lovibond").prop("value")).toBe(1)
		})

	})

})