import React from 'react';
import renderer from "react-test-renderer"
import { Lovibond } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("Lovibond", () => {

	it("renders a lovibond component", () => {
		const lov = renderer.create(
			<Lovibond value={10} />
		)
		let tree = lov.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders the value prop", () => {
		const lov = shallow(
			<Lovibond value={10} />
		)
		expect(lov.find("div").text()).toBe("10")
	})

	it("has background hsl(47, 100%, 79%) when value is 1", () => {
		const lov = shallow(
			<Lovibond value={1} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(47, 100%, 79%)")
	})

	it("has background hsl(45, 99%, 72%) when value is 2", () => {
		const lov = shallow(
			<Lovibond value={2} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(45, 99%, 72%)")
	})

	it("has background hsl(43, 99%, 65%) when value is 3", () => {
		const lov = shallow(
			<Lovibond value={3} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(43, 99%, 65%)")
	})

	it("has background hsl(43, 98%, 59%) when value is 4", () => {
		const lov = shallow(
			<Lovibond value={4} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(43, 98%, 59%)")
	})

	it("has background hsl(43, 100%, 49%) when value is 5", () => {
		const lov = shallow(
			<Lovibond value={5} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(43, 100%, 49%)")
	})

	it("has background hsl(41, 100%, 48%) when value is 6", () => {
		const lov = shallow(
			<Lovibond value={6} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(41, 100%, 48%)")
	})

	it("has background hsl(40, 100%, 47%) when value is 7", () => {
		const lov = shallow(
			<Lovibond value={7} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(40, 100%, 47%)")
	})

	it("has background hsl(38, 100%, 45%) when value is 8", () => {
		const lov = shallow(
			<Lovibond value={8} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(38, 100%, 45%)")
	})

	it("has background hsl(36, 100%, 45%) when value is 9", () => {
		const lov = shallow(
			<Lovibond value={9} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(36, 100%, 45%)")
	})

	it("has background hsl(34, 100%, 43%) when value is 10", () => {
		const lov = shallow(
			<Lovibond value={10} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(34, 100%, 43%)")
	})

	it("has background hsl(33, 100%, 42%) when value is 11", () => {
		const lov = shallow(
			<Lovibond value={11} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(33, 100%, 42%)")
	})

	it("has background hsl(32, 100%, 40%) when value is 12", () => {
		const lov = shallow(
			<Lovibond value={12} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(32, 100%, 40%)")
	})

	it("has background hsl(30, 100%, 39%) when value is 13", () => {
		const lov = shallow(
			<Lovibond value={13} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(30, 100%, 39%)")
	})

	it("has background hsl(29, 100%, 38%) when value is 14", () => {
		const lov = shallow(
			<Lovibond value={14} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(29, 100%, 38%)")
	})

	it("has background hsl(27, 100%, 36%) when value is 15", () => {
		const lov = shallow(
			<Lovibond value={15} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(27, 100%, 36%)")
	})

	it("has background hsl(27, 100%, 35%) when value is 16", () => {
		const lov = shallow(
			<Lovibond value={16} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(27, 100%, 35%)")
	})

	it("has background hsl(24, 100%, 34%) when value is 17", () => {
		const lov = shallow(
			<Lovibond value={17} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(24, 100%, 34%)")
	})

	it("has background hsl(23, 100%, 32%) when value is 18", () => {
		const lov = shallow(
			<Lovibond value={18} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(23, 100%, 32%)")
	})

	it("has background hsl(22, 100%, 31%) when value is 19", () => {
		const lov = shallow(
			<Lovibond value={19} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(22, 100%, 31%)")
	})

	it("has background hsl(21, 100%, 30%) when value is 20", () => {
		const lov = shallow(
			<Lovibond value={20} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(21, 100%, 30%)")
	})

	it("has background hsl(18, 100%, 29%) when value is 21", () => {
		const lov = shallow(
			<Lovibond value={21} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(18, 100%, 29%)")
	})

	it("has background hsl(16, 100%, 27%) when value is 22", () => {
		const lov = shallow(
			<Lovibond value={22} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(16, 100%, 27%)")
	})

	it("has background hsl(14, 100%, 25%) when value is 23", () => {
		const lov = shallow(
			<Lovibond value={23} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(14, 100%, 25%)")
	})

	it("has background hsl(14, 100%, 25%) when value is 24", () => {
		const lov = shallow(
			<Lovibond value={24} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(14, 100%, 25%)")
	})

	it("has background hsl(14, 100%, 24%) when value is 25", () => {
		const lov = shallow(
			<Lovibond value={25} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(14, 100%, 24%)")
	})

	it("has background hsl(14, 100%, 24%) when value is 26", () => {
		const lov = shallow(
			<Lovibond value={26} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(14, 100%, 24%)")
	})

	it("has background hsl(11, 100%, 21%) when value is 27", () => {
		const lov = shallow(
			<Lovibond value={27} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(11, 100%, 21%)")
	})

	it("has background hsl(8, 100%, 20%) when value is 28", () => {
		const lov = shallow(
			<Lovibond value={28} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(8, 100%, 20%)")
	})

	it("has background hsl(8, 100%, 19%) when value is 29", () => {
		const lov = shallow(
			<Lovibond value={29} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(8, 100%, 19%)")
	})

	it("has background hsl(6, 100%, 18%) when value is 30", () => {
		const lov = shallow(
			<Lovibond value={30} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(6, 100%, 18%)")
	})

	it("has background hsl(8, 100%, 17%) when value is 31", () => {
		const lov = shallow(
			<Lovibond value={31} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(8, 100%, 17%)")
	})

	it("has background hsl(6, 100%, 18%) when value is 32", () => {
		const lov = shallow(
			<Lovibond value={32} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(6, 100%, 18%)")
	})

	it("has background hsl(3, 88%, 17%) when value is 33", () => {
		const lov = shallow(
			<Lovibond value={33} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(3, 88%, 17%)")
	})

	it("has background hsl(2, 95%, 15%) when value is 34", () => {
		const lov = shallow(
			<Lovibond value={34} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(2, 95%, 15%)")
	})

	it("has background hsl(2, 89%, 14%) when value is 35", () => {
		const lov = shallow(
			<Lovibond value={35} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(2, 89%, 14%)")
	})

	it("has background hsl(2, 89%, 14%) when value is 36", () => {
		const lov = shallow(
			<Lovibond value={36} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(2, 89%, 14%)")
	})

	it("has background hsl(1, 78%, 13%) when value is 37", () => {
		const lov = shallow(
			<Lovibond value={37} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(1, 78%, 13%)")
	})

	it("has background hsl(1, 78%, 13%) when value is 38", () => {
		const lov = shallow(
			<Lovibond value={38} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(1, 78%, 13%)")
	})

	it("has background hsl(1, 78%, 13%) when value is 39", () => {
		const lov = shallow(
			<Lovibond value={39} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(1, 78%, 13%)")
	})

	it("has background hsl(0, 71%, 12%) when value is 40", () => {
		const lov = shallow(
			<Lovibond value={40} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(0, 71%, 12%)")
	})

	it("has background hsl(0, 0%, 0%) when value os 41+", () => {
		const lov = shallow(
			<Lovibond value={41} />
		)
		expect(lov.find("div").prop("style").background).toBe("hsl(0, 0%, 0%)")
	})

})