import React from 'react';
import renderer from "react-test-renderer"
import { Pagination } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("pagination", () => {

	it("renders a pagination component", () => {
		const pagination = renderer.create(
			<Pagination
				totalPages={2}
				page={0}
				decrement={() => {}}
				increment={() => {}}
				updatePageNumber={() => {}}
			/>
		)
		const tree = pagination.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("does not render a previous button if page is 1", () => {
		const pagination = shallow(
			<Pagination
				totalPages={2}
				page={1}
				decrement={() => {}}
				increment={() => {}}
				updatePageNumber={() => {}}
			/>
		)
		expect(pagination.findWhere(n => 
			n.text() === "< Previous" && n.type() === "span").length
		).toBe(0)
	})

	it("renders a span with text < Previous is page is > 1", () => {
		const pagination = shallow(
			<Pagination
				totalPages={2}
				page={2}
				decrement={() => {}}
				increment={() => {}}
				updatePageNumber={() => {}}
			/>
		)
		expect(pagination.findWhere(n => 
			n.text() === "< Previous" && n.type() === "span").length
		).toBe(1)
	})

	it("renders a span with text Next > if page < totalPages", () => {
		const pagination = shallow(
			<Pagination
				totalPages={2}
				page={1}
				decrement={() => {}}
				increment={() => {}}
				updatePageNumber={() => {}}
			/>
		)
		expect(pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span").length
		).toBe(1)
	})

	it("does not render a next button if page === totalPages", () => {
		const pagination = shallow(
			<Pagination
				page={2}
				totalPages={2}
				decrement={() => {}}
				increment={() => {}}
				updatePageNumber={() => {}}
			/>
		)
		expect(pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span").length
		).toBe(0)
	})

	it("calls the decrement function on previous click", () => {
		let called = false
		const mock = () => {
			called = true
		}
		const pagination = shallow(
			<Pagination
				page={2}
				totalPages={2}
				decrement={mock}
				increment={() => {}}
				updatePageNumber={() => {}}
			/>
		)
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
		const pagination = shallow(
			<Pagination
				page={1}
				totalPages={2}
				decrement={() => {}}
				increment={mock}
				updatePageNumber={() => {}}
			/>
		)
		pagination.findWhere(n => 
			n.text() === "Next >" && n.type() === "span"
		).simulate("click")
		expect(called).toBe(true)
	})

	describe("next and previous controls", () => {

		it("has padding 0px 5px", () => {
			const pagination = shallow(
				<Pagination
					page={2}
					totalPages={3}
					decrement={() => {}}
					increment={() => {}}
					showPageNumbers={true}
					updatePageNumber={() => {}}
				/>
			)
			pagination.findWhere(n => 
				n.type() === "span" && (n.text().includes("Previous") || n.text().includes("Next"))
			).forEach(n => 
				expect(n.prop("style").padding).toBe("0px 5px")
			)
		})

	})

	describe("page numbers", () => {

		it("renders the page numbers if the showPageNumbers prop is true", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showPageNumbers={true}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "1" && n.type() === "span").length
			).toBe(1)
		})

		it("does not render the page numbers if the showPageNumbers prop is false", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "1" && n.type() === "span").length
			).toBe(0)
		})

		it("calls the updatePageNumber prop with the value onClick", () => {
			let updatePageNumberCalled = false
			let updatePageNumberArg = null
			const updatePageNumber = value => {
				updatePageNumberCalled = true
				updatePageNumberArg = value
			}
			const pagination = shallow(
				<Pagination
					page={1}
					totalPages={2}
					showPageNumbers={true}
					updatePageNumber={updatePageNumber}
					decrement={() => {}}
					increment={() => {}}
				/>
			)
			pagination.findWhere(n => 
				n.text() === "2" && n.type() === "span"
			).simulate("click")
			expect(updatePageNumberCalled).toBe(true)
			expect(updatePageNumberArg).toBe(2)
		})

		it("does not call the updatePageNumber prop if click on pageNumber of current page", () => {
			let updatePageNumberCalled = false
			let updatePageNumberArg = null
			const updatePageNumber = value => {
				updatePageNumberCalled = true
				updatePageNumberArg = value
			}
			const pagination = shallow(
				<Pagination
					page={1}
					totalPages={2}
					showPageNumbers={true}
					updatePageNumber={updatePageNumber}
					decrement={() => {}}
					increment={() => {}}
				/>
			)
			pagination.findWhere(n => 
				n.text() === "1" && n.type() === "span"
			).simulate("click")
			expect(updatePageNumberCalled).toBe(false)
		})

		it("has textDecoration underline", () => {
			const pagination = shallow(
				<Pagination
					page={1}
					totalPages={2}
					decrement={() => {}}
					increment={() => {}}
					showPageNumbers={true}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "2" && n.type() === "span").prop("style").textDecoration
			).toBe("underline")
		})

		it("has cursor pointer", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={2}
					decrement={() => {}}
					increment={() => {}}
					showPageNumbers={true}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "2" && n.type() === "span").prop("style").cursor
			).toBe("pointer")
		})

		it("has padding 0px 5px", () => {
			const pagination = shallow(
				<Pagination
					page={1}
					totalPages={2}
					decrement={() => {}}
					increment={() => {}}
					showPageNumbers={true}
					updatePageNumber={() => {}}
				/>
			)
			pagination.findWhere(n => 
				n.type() === "span" && !n.text().includes("Next"))
			.forEach(n => 
				expect(n.prop("style").padding).toBe("0px 5px"))
		})

		describe("current page number", () => {

			it("has fontWeight: bold", () => {
				const pagination = shallow(
					<Pagination
						page={1}
						totalPages={2}
						showPageNumbers={true}
						decrement={() => {}}
						increment={() => {}}
						updatePageNumber={() => {}}
					/>
				)
				expect(pagination.findWhere(n => 
					n.text() === "1" && n.type() === "span").prop("style").fontWeight
				).toBe("bold")
			})

			it("has textDecoration: none", () => {
				const pagination = shallow(
					<Pagination
						page={1}
						totalPages={2}
						showPageNumbers={true}
						decrement={() => {}}
						increment={() => {}}
						updatePageNumber={() => {}}
					/>
				)
				expect(pagination.findWhere(n => 
					n.text() === "1" && n.type() === "span").prop("style").textDecoration
				).toBe("none")
			})

			it("has cursor: default", () => {
				const pagination = shallow(
					<Pagination
						page={1}
						totalPages={2}
						showPageNumbers={true}
						decrement={() => {}}
						increment={() => {}}
						updatePageNumber={() => {}}
					/>
				)
				expect(pagination.findWhere(n => 
					n.text() === "1" && n.type() === "span").prop("style").cursor
				).toBe("default")
			})

		})

	})

	describe("items per page", () => {

		it("renders the items per page if showItemsPerPage prop is true", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={[5]}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.find("select").length).toBe(1)
		})

		it("does not render the items per page if showItemsPerPage is false", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.find("select").length).toBe(0)
		})

		it("has option tag for each item in itemsPerPageOptions prop", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={[5, 10, 15, 20]}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.find("option").length).toBe(4)
		})

		it("sets the option tag values equal to the itemsPerPageOptions values", () => {
			const itemsPerPageOptions = [5, 10, 15, 20]
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={itemsPerPageOptions}
					updatePageNumber={() => {}}
				/>
			)
			pagination.find("option").forEach((n, i) => 
				expect(n.prop("value")).toBe(itemsPerPageOptions[i])
			)
		})

		it("sets the option tag text equal to the itemsPerPageOptions values", () => {
			const itemsPerPageOptions = [5, 10, 15, 20]
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={itemsPerPageOptions}
					updatePageNumber={() => {}}
				/>
			)
			pagination.find("option").forEach((n, i) => 
				expect(n.text()).toBe(`${itemsPerPageOptions[i]}`)
			)
		})

		it("sets the select value equal to the itemsPerPage prop", () => {
			const itemsPerPageOptions = [5, 10, 15, 20]
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={itemsPerPageOptions}
					itemsPerPage={10}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.find("select").prop("value")).toBe(10)
		})

		it("calls the updateItemsPerPage prop with the value onChange", () => {
			const itemsPerPageOptions = [5, 10, 15, 20]
			let updateItemsPerPageCalled = false
			let updateItemsPerPageArg = null
			const updateItemsPerPage = value => {
				updateItemsPerPageCalled = true
				updateItemsPerPageArg = value
			}
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={itemsPerPageOptions}
					itemsPerPage={10}
					updateItemsPerPage={updateItemsPerPage}
					updatePageNumber={() => {}}
				/>
			)
			pagination.find("select").simulate("change", {target: {value: 10}})
			expect(updateItemsPerPageCalled).toBe(true)
			expect(updateItemsPerPageArg).toBe(10)
		})

		it("renders a span with text items per page", () => {
			const itemsPerPageOptions = [5, 10, 15, 20]
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={itemsPerPageOptions}
					itemsPerPage={10}
					updateItemsPerPage={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "items per page" && n.type() === "span").length
			).toBe(1)
		})

		it("has items per page text with marginLeft: 5px", () => {
			const itemsPerPageOptions = [5, 10, 15, 20]
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={itemsPerPageOptions}
					itemsPerPage={10}
					updateItemsPerPage={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "items per page"&& n.type() === "span"
			).prop("style").marginLeft).toBe("5px")
		})

		it("has margin 10px 0 0 0", () => {
			const itemsPerPageOptions = [5, 10, 15, 20]
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					showItemsPerPage={true}
					itemsPerPageOptions={itemsPerPageOptions}
					itemsPerPage={10}
					updateItemsPerPage={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "items per page"&& n.type() === "span"
			).parent().prop("style").margin).toBe("10px 0 0 0")
		})

	})

	describe("previous button style", () => {

		it("has text decoration underline", () => {
			const pagination = shallow(
				<Pagination
					page={2}
					totalPages={2}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "< Previous" && n.type() === "span"
			).prop("style").textDecoration).toBe("underline")
		})

		it("has cursor pointer", () => {
			const pagination = shallow(
				<Pagination
					page={2}
					totalPages={2}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "< Previous" && n.type() === "span"
			).prop("style").cursor).toBe("pointer")
		})

		it("has width: 86.73px", () => {
			const pagination = shallow(
				<Pagination
					page={2}
					totalPages={2}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "< Previous" && n.type() === "span"
			).prop("style").width).toBe("86.73px")
		})

	})

		describe("next button style", () => {

		it("has text decoration underline", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "Next >" && n.type() === "span"
			).prop("style").textDecoration).toBe("underline")
		})

		it("has cursor pointer", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "Next >" && n.type() === "span"
			).prop("style").cursor).toBe("pointer")
		})

		it("has width: 86.73px", () => {
			const pagination = shallow(
				<Pagination
					page={0}
					totalPages={1}
					decrement={() => {}}
					increment={() => {}}
					updatePageNumber={() => {}}
				/>
			)
			expect(pagination.findWhere(n => 
				n.text() === "Next >" && n.type() === "span"
			).prop("style").width).toBe("86.73px")
		})

	})

})