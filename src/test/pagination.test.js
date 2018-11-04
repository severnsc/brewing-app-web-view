import React from 'react';
import renderer from "react-test-renderer"
import { Pagination } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("pagination", () => {

	it("renders a pagination component", () => {
		const pagination = renderer.create(<Pagination totalPages={2} page={0} decrement={() => {}} increment={() => {}} />)
		const tree = pagination.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("does not render a previous button if page is 0", () => {
		const pagination = shallow(<Pagination totalPages={2} page={0} decrement={() => {}} increment={() => {}} />)
		expect(pagination.findWhere(n => 
			n.text() === "< Previous" && n.type() === "span").length
		).toBe(0)
	})

	it("renders a span with text < Previous is page is > 0", () => {
		const pagination = shallow(<Pagination totalPages={2} page={1} decrement={() => {}} increment={() => {}} />)
		expect(pagination.findWhere(n => 
			n.text() === "< Previous" && n.type() === "span").length
		).toBe(1)
	})

	it("renders a span with text Next > if page < totalPages", () => {
		const pagination = shallow(<Pagination totalPages={2} page={1} decrement={() => {}} increment={() => {}} />)
		expect(pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span").length
		).toBe(1)
	})

	it("does not render a next button if page === totalPages", () => {
		const pagination = shallow(<Pagination page={2} totalPages={2} decrement={() => {}} increment={() => {}} />)
		expect(pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span").length
		).toBe(0)
	})

	it("calls the decrement function on previous click", () => {
		let called = false
		const mock = () => {
			called = true
		}
		const pagination = shallow(<Pagination page={1} totalPages={1} decrement={mock} increment={() => {}} />)
		pagination.findWhere(n => 
			n.text() === "< Previous" && n.type() === "span"
		).simulate("click")
		expect(called).toBe(true)
	})

	it("calls the increment function on next click", () => {
		let called = false
		const mock = () => {
			called = true
		}
		const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={mock} />)
		pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span"
		).simulate("click")
		expect(called).toBe(true)
	})

	describe("page numbers", () => {

		it("renders the page numbers if the showPageNumbers prop is true", () => {
			const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={() => {}} showPageNumbers={true} />)
			expect(pagination.findWhere(n => 
				n.text() === "1" && n.type() === "span").length
			).toBe(1)
		})

		it("does not render the page numbers if the showPageNumbers prop is false", () => {
			const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={() => {}} />)
			expect(pagination.findWhere(n => 
				n.text() === "1" && n.type() === "span").length
			).toBe(0)
		})


		it("has textDecoration underline", () => {
			const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={() => {}} showPageNumbers={true} />)
			expect(pagination.findWhere(n => 
				n.text() === "1" && n.type() === "span").prop("style").textDecoration
			).toBe("underline")
		})

		it("has cursor pointer", () => {
			const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={() => {}} showPageNumbers={true} />)
			expect(pagination.findWhere(n => 
				n.text() === "1" && n.type() === "span").prop("style").cursor
			).toBe("pointer")
		})

	})

	describe("previous button style", () => {

		it("has text decoration underline", () => {
			const pagination = shallow(<Pagination page={1} totalPages={1} decrement={() => {}} increment={() => {}} />)
			expect(pagination.findWhere(n => 
				n.text() === "< Previous" && n.type() === "span"
			).prop("style").textDecoration).toBe("underline")
		})

		it("has cursor pointer", () => {
			const pagination = shallow(<Pagination page={1} totalPages={1} decrement={() => {}} increment={() => {}} />)
			expect(pagination.findWhere(n => 
				n.text() === "< Previous" && n.type() === "span"
			).prop("style").cursor).toBe("pointer")
		})

		it("has width: 86.73px", () => {
			const pagination = shallow(<Pagination page={1} totalPages={1} decrement={() => {}} increment={() => {}} />)
			expect(pagination.findWhere(n => 
				n.text() === "< Previous" && n.type() === "span"
			).prop("style").width).toBe("86.73px")
		})

	})

		describe("next button style", () => {

		it("has text decoration underline", () => {
			const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={() => {}} />)
			expect(pagination.findWhere(n => 
				n.text() === "Next >" && n.type() === "span"
			).prop("style").textDecoration).toBe("underline")
		})

		it("has cursor pointer", () => {
			const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={() => {}} />)
			expect(pagination.findWhere(n => 
				n.text() === "Next >" && n.type() === "span"
			).prop("style").cursor).toBe("pointer")
		})

		it("has width: 86.73px", () => {
			const pagination = shallow(<Pagination page={0} totalPages={1} decrement={() => {}} increment={() => {}} />)
			expect(pagination.findWhere(n => 
				n.text() === "Next >" && n.type() === "span"
			).prop("style").width).toBe("86.73px")
		})

	})

})