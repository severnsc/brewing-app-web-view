import React from 'react';
import renderer from "react-test-renderer"
import { SRM } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("srm component", () => {

	it("renders a SRM component", () => {
		const srm = renderer.create(<SRM value={0} />)
		const tree = srm.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it("renders a div", () => {
		const srm = shallow(<SRM value={0} />)
		expect(srm.find("div").length).toBe(1)
	})

	it("renders the value prop", () => {
		const srm = shallow(<SRM value={1} />)
		expect(srm.text()).toBe("1")
	})

	describe("the container", () => {

		it("has borderRadius 20px", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("div").prop("style").borderRadius).toBe("20px")
		})

		it("has padding 4px", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("div").prop("style").padding).toBe("4px")
		})

		it("has position relative", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("div").prop("style").position).toBe("relative")
		})

		it("has height 16px", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("div").prop("style").height).toBe("16px")
		})

		it("has background #F3F993 when value is 1", () => {
			const srm = shallow(<SRM value={1} />)
			expect(srm.find("div").prop("style").background).toBe("#F3F993")
		})

		it("has background #F5F75C when value is 2", () => {
			const srm = shallow(<SRM value={2} />)
			expect(srm.find("div").prop("style").background).toBe("#F5F75C")
		})

		it("has background #F6F513 when value is 3", () => {
			const srm = shallow(<SRM value={3} />)
			expect(srm.find("div").prop("style").background).toBe("#F6F513")
		})

		it("has background #EAE615 when value is 4", () => {
			const srm = shallow(<SRM value={4} />)
			expect(srm.find("div").prop("style").background).toBe("#EAE615")
		})

		it("has background #E0D01B when value is 5", () => {
			const srm = shallow(<SRM value={5} />)
			expect(srm.find("div").prop("style").background).toBe("#E0D01B")
		})

		it("has background #D5BC26 when value is 6", () => {
			const srm = shallow(<SRM value={6} />)
			expect(srm.find("div").prop("style").background).toBe("#D5BC26")
		})

		it("has background #CDAA37 when value is 7", () => {
			const srm = shallow(<SRM value={7} />)
			expect(srm.find("div").prop("style").background).toBe("#CDAA37")
		})

		it("has background #C1963C when value is 8", () => {
			const srm = shallow(<SRM value={8} />)
			expect(srm.find("div").prop("style").background).toBe("#C1963C")
		})

		it("has background #BE8C3A when value is 9", () => {
			const srm = shallow(<SRM value={9} />)
			expect(srm.find("div").prop("style").background).toBe("#BE8C3A")
		})

		it("has background #BE823A when value is 10", () => {
			const srm = shallow(<SRM value={10} />)
			expect(srm.find("div").prop("style").background).toBe("#BE823A")
		})

		it("has background #C17A37 when value is 11", () => {
			const srm = shallow(<SRM value={11} />)
			expect(srm.find("div").prop("style").background).toBe("#C17A37")
		})

		it("has background #BF7138 when value is 12", () => {
			const srm = shallow(<SRM value={12} />)
			expect(srm.find("div").prop("style").background).toBe("#BF7138")
		})

		it("has background #BC6733 when value is 13", () => {
			const srm = shallow(<SRM value={13} />)
			expect(srm.find("div").prop("style").background).toBe("#BC6733")
		})

		it("has background #B26033 when value is 14", () => {
			const srm = shallow(<SRM value={14} />)
			expect(srm.find("div").prop("style").background).toBe("#B26033")
		})

		it("has background #A85839 when value is 15", () => {
			const srm = shallow(<SRM value={15} />)
			expect(srm.find("div").prop("style").background).toBe("#A85839")
		})

		it("has background #985336 when value is 16", () => {
			const srm = shallow(<SRM value={16} />)
			expect(srm.find("div").prop("style").background).toBe("#985336")
		})

		it("has background #8D4C32 when value is 17", () => {
			const srm = shallow(<SRM value={17} />)
			expect(srm.find("div").prop("style").background).toBe("#8D4C32")
		})

		it("has background #7C452D when value is 18", () => {
			const srm = shallow(<SRM value={18} />)
			expect(srm.find("div").prop("style").background).toBe("#7C452D")
		})

		it("has background #6B3A1E when value is 19", () => {
			const srm = shallow(<SRM value={19} />)
			expect(srm.find("div").prop("style").background).toBe("#6B3A1E")
		})

		it("has background #5D341A when value is 20", () => {
			const srm = shallow(<SRM value={20} />)
			expect(srm.find("div").prop("style").background).toBe("#5D341A")
		})

		it("has background #4E2A0C when value is 21", () => {
			const srm = shallow(<SRM value={21} />)
			expect(srm.find("div").prop("style").background).toBe("#4E2A0C")
		})

		it("has background #4A2727 when value is 22", () => {
			const srm = shallow(<SRM value={22} />)
			expect(srm.find("div").prop("style").background).toBe("#4A2727")
		})

		it("has background #361F1B when value is 23", () => {
			const srm = shallow(<SRM value={23} />)
			expect(srm.find("div").prop("style").background).toBe("#361F1B")
		})

		it("has background #261716 when value is 24", () => {
			const srm = shallow(<SRM value={24} />)
			expect(srm.find("div").prop("style").background).toBe("#261716")
		})

		it("has background #231716 when value is 25", () => {
			const srm = shallow(<SRM value={25} />)
			expect(srm.find("div").prop("style").background).toBe("#231716")
		})

		it("has background #19100F when value is 26", () => {
			const srm = shallow(<SRM value={26} />)
			expect(srm.find("div").prop("style").background).toBe("#19100F")
		})

		it("has background #16100F when value is 27", () => {
			const srm = shallow(<SRM value={27} />)
			expect(srm.find("div").prop("style").background).toBe("#16100F")
		})

		it("has background #120D0C when value is 28", () => {
			const srm = shallow(<SRM value={28} />)
			expect(srm.find("div").prop("style").background).toBe("#120D0C")
		})

		it("has background #100B0A when value is 29", () => {
			const srm = shallow(<SRM value={29} />)
			expect(srm.find("div").prop("style").background).toBe("#100B0A")
		})

		it("has background #050B0A when value is 30", () => {
			const srm = shallow(<SRM value={30} />)
			expect(srm.find("div").prop("style").background).toBe("#050B0A")
		})

		it("has background black when value is 31+", () => {
			const srm = shallow(<SRM value={31} />)
			expect(srm.find("div").prop("style").background).toBe("black")
		})

	})

	describe("the value", () => {

		it("should have position absolute", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").position).toBe("absolute")
		})

		it("should have top 0px", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").top).toBe("0px")
		})

		it("should have left -5px", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").left).toBe("-5px")
		})

		it("should have background rgb(250, 250, 250)", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").background).toBe("rgb(250, 250, 250)")
		})

		it("should have borderRadius 50%", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").borderRadius).toBe("50%")
		})

		it("should have width 25px", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").width).toBe("25px")
		})

		it("should have height 25px", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").height).toBe("25px")
		})

		it("should have justifyContent center", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").justifyContent).toBe("center")
		})

		it("should have display flex", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").display).toBe("flex")
		})

		it("should have alignItems center", () => {
			const srm = shallow(<SRM value={0} />)
			expect(srm.find("span").prop("style").alignItems).toBe("center")
		})

	})

})