import React from 'react';
import renderer from "react-test-renderer"
import { Pagination } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("pagination", () => {

	it("renders a pagination component", () => {
		const pagination = renderer.create(<Pagination totalPages={2} page={0} />)
		const tree = pagination.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("does not render a previous button if page is 0", () => {
		const pagination = shallow(<Pagination totalPages={2} page={0} />)
		expect(pagination.findWhere(n => 
			n.text() === "< Previous" && n.type() === "span").length
		).toBe(0)
	})

	it("renders a span with text < Previous is page is > 0", () => {
		const pagination = shallow(<Pagination totalPages={2} page={1} />)
		expect(pagination.findWhere(n => 
			n.text() === "< Previous" && n.type() === "span").length
		).toBe(1)
	})

	it("renders a span with text Next > if page < totalPages", () => {
		const pagination = shallow(<Pagination totalPages={2} page={1} />)
		expect(pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span").length
		).toBe(1)
	})

	it("does not render a next button if page === totalPages", () => {
		const pagination = shallow(<Pagination page={2} totalPages={2} />)
		expect(pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span").length
		).toBe(0)
	})

})