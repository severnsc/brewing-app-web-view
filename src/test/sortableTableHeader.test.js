import React from 'react';
import renderer from "react-test-renderer"
import { SortableTableHeader } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("sortable table header component", () => {

	it("renders a sortable table header component", () => {
		const sortableTableHeader = renderer.create(
			<SortableTableHeader
				columns={[]}
				onClick={() => {}}
			/>
		)
		const tree = sortableTableHeader.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders a thead", () => {
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={[]}
				onClick={() => {}}
			/>
		)
		expect(sortableTableHeader.find("thead").length).toBe(1)
	})

	it("renders a tr as child of thead", () => {
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={[]}
				onClick={() => {}}
			/>
		)
		expect(sortableTableHeader.find("thead tr").length).toBe(1)
	})

	it("renders a th for each item in the columns array prop", () => {
		const columns = ["column1", "column2"]
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				onClick={() => {}}
			/>
		)
		expect(sortableTableHeader.find("th").length).toBe(2)
	})

	it("sets each th text equal to text of item in columns array prop", () => {
		const columns = ["column1", "column2"]
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				onClick={() => {}}
			/>
		)
		sortableTableHeader.find("th").forEach((n, i) => 
			expect(n.text().includes(columns[i])).toBe(true)
		)
	})

	it("renders a sort indicator in the th whose text equals the sortBy prop", () => {
		const columns = ["column1", "column2"]
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				sortBy="column1"
				onClick={() => {}}
			/>
		)
		expect(sortableTableHeader.findWhere(n => 
			n.text() === "column1 ∧" && n.type() === "th").length
		).toBe(1)
	})

	it("renders a ∧ in the column that equals sortBy if sortOrder is asc", () => {
		const columns = ["column1", "column2"]
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				sortBy="column2"
				sortOrder="asc"
				onClick={() => {}}
			/>
		)
		expect(sortableTableHeader.findWhere(n => 
			n.text() === "column2 ∧" && n.type() === "th").length
		).toBe(1)
	})

	it("renders a ∨ in the column that equals sortBy if sortOrder is desc", () => {
		const columns = ["column1", "column2"]
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				sortBy="column2"
				sortOrder="desc"
				onClick={() => {}}
			/>
		)
		expect(sortableTableHeader.findWhere(n => 
			n.text() === "column2 ∨" && n.type() === "th").length
		).toBe(1)
	})

	it("renders the first item in columns as asc if sortBy and sortOrder are undefined", () => {
		const columns = ["column1", "column2"]
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				onClick={() => {}}
			/>
		)
		const node = sortableTableHeader.findWhere(n => 
			n.text().includes("∧") && n.type() === "th")
		expect(node.text().includes("column1")).toBe(true)
	})

	it("calls the onClick prop on th click", () => {
		const columns = ["column1", "column2"]
		let onClickCalled = false
		const onClick = () => {
			onClickCalled = true
		}
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				onClick={onClick}
			/>
		)
		sortableTableHeader.findWhere(n => 
			n.text().includes("column1") && n.type() === "th").simulate("click")
		expect(onClickCalled).toBe(true)	
	})

	it("passes the clicked column name to the onClick prop on th click", () => {
		const columns = ["column1", "column2"]
		let onClickArg = null
		const onClick = name => {
			onClickArg = name
		}
		const sortableTableHeader = shallow(
			<SortableTableHeader
				columns={columns}
				onClick={onClick}
			/>
		)
		sortableTableHeader.findWhere(n => 
			n.text().includes("column1") && n.type() === "th").simulate("click")
		expect(onClickArg).toBe("column1")	
	})

	describe("styles", () => {

		it("has backgroundColor hsl(0, 0%, 95%) on the thead", () => {
			const sortableTableHeader = shallow(
				<SortableTableHeader
					columns={[]}
					onClick={() => {}}
				/>
			)
			expect(
				sortableTableHeader.find("thead").prop("style").backgroundColor
			).toBe("hsl(0, 0%, 95%)")
		})

		it("has color hsl(0, 0%, 50%) on the thead", () => {
			const sortableTableHeader = shallow(
				<SortableTableHeader
					columns={[]}
					onClick={() => {}}
				/>
			)
			expect(
				sortableTableHeader.find("thead").prop("style").color
			).toBe("hsl(0, 0%, 50%)")
		})

		it("has cursor pointer on the thead", () => {
			const sortableTableHeader = shallow(
				<SortableTableHeader
					columns={[]}
					onClick={() => {}}
				/>
			)
			expect(
				sortableTableHeader.find("thead").prop("style").cursor
			).toBe("pointer")
		})

		it("has padding 20px 10px on each th", () => {
			const columns = ["column1", "column2"]
			const sortableTableHeader = shallow(
				<SortableTableHeader
					columns={columns}
					onClick={() => {}}
				/>
			)
			sortableTableHeader.find("th").forEach(n => 
				expect(n.prop("style").padding).toBe("20px 10px"))
		})

		it("has width equal to 100/columns.length % on each th", () => {
			const columns = ["column1", "column2"]
			const sortableTableHeader = shallow(
				<SortableTableHeader
					columns={columns}
					onClick={() => {}}
				/>
			)
			sortableTableHeader.find("th").forEach(n => 
				expect(n.prop("style").width).toBe(100/columns.length + "%"))
		})

	})

})