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

})