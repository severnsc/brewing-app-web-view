import React from "react"
import renderer from "react-test-renderer"
import { SettingsForm } from "../components"
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("SettingsForm", () => {

	it("renders a renders a form component", () => {
		const form = renderer.create(
			<SettingsForm onSubmit={() => {}} />
		)
		let tree = form.toJSON()
		expect(tree).toMatchSnapshot()
	})

	describe("weight input", () => {

		it("is named named weight", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight']").length).toBe(1)
		})

		it("is a select", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight']").type()).toBe('select')
		})

		it("has option with value 'imperial'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight'] > option[value='imperial']").length).toBe(1)
		})

		it("has option with text 'Imperial (lbs/oz)'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight'] > option[value='imperial']").text()).toBe('Imperial (lbs/oz)')
		})

		it("has option with value 'metric'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight'] > option[value='metric']").length).toBe(1)
		})

		it("has option with text 'Metric (kg/g)'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight'] > option[value='metric']").text()).toBe("Metric (kg/g)")
		})

		it("has value initialized to ''", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight']").prop("value")).toBe("")
		})

		it("should change the select value on change", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			form.find("[name='weight']").simulate("change", {target: {name: "weight", value: "metric"}})
			expect(form.find("[name='weight']").prop("value")).toBe("metric")
		})

		it("should initialize value to weight prop if it is set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} weight="imperial" />)
			expect(form.find("select[name='weight']").prop("value")).toBe("imperial")
		})

	})

	describe("liquid input", () => {

		it("has name liquid", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid']").length).toBe(1)
		})

		it("is a select tag", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid']").type()).toBe("select")
		})

		it("has option with value imperial", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid'] > option[value='imperial']").length).toBe(1)
		})

		it("has option with text 'Imperial (gal/oz)'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid'] > option[value='imperial']").text()).toBe("Imperial (gal/oz)")
		})

		it("has option with value metric", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid'] > option[value='metric']").length).toBe(1)
		})

		it("has option with text 'Metric (l/ml)", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid'] > option[value='metric']").text()).toBe("Metric (l/ml)")
		})

		it("has value initialized to ''", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='liquid']").prop("value")).toBe("")
		})

		it("updates value to selected option on change", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			form.find("select[name='liquid']").simulate("change", {target: {name: "liquid", value: "metric"}})
			expect(form.find("select[name='liquid']").prop("value")).toBe("metric")
		})

		it("should initialize value to liquid prop if set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} liquid="metric" />)
			expect(form.find("select[name='liquid']").prop("value")).toBe("metric")
		})

	})

	describe("currency input", () => {

		it("has name currency", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='currency']").length).toBe(1)
		})

		it("is a select tag", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='currency']").type()).toBe("select")
		})

		it("has option with value USD", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("option[value='USD']").length).toBe(1)
		})

		it("has option with text USD", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("option[value='USD']").text()).toBe("USD")
		})

		it("has option with value GBP", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("option[value='GBP']").length).toBe(1)
		})

		it("has option with text GBP", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("option[value='GBP']").text()).toBe("GBP")
		})

		it("has option with value EUR", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("option[value='EUR']").length).toBe(1)
		})

		it("has option with text EUR", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("option[value='EUR']").text()).toBe("EUR")
		})

		it("has value initialized to ''", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='currency']").prop("value")).toBe("")
		})

		it("changes the value to the selected option on change", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			form.find("select[name='currency']").simulate("change", {target: {name: "currency", value: "GBP"}})
			expect(form.find("select[name='currency']").prop("value")).toBe("GBP")
		})

		it("should initialize currency to prop if set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} currency="USD" />)
			expect(form.find("select[name='currency']").prop("value")).toBe("USD")
		})

	})

	describe("malt color input", () => {

		it("is a select tag with name malt color", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor']").length).toBe(1)
		})

		it("has an option with value 'SRM'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='SRM']").length).toBe(1)
		})

		it("has an option with text SRM", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='SRM']").text()).toBe("SRM")
		})

		it("has an option with value 'ECB", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='EBC']").length).toBe(1)
		})

		it("has an option with text EBC", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='EBC']").text()).toBe("EBC")
		})

		it("has an option with value L", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='L']").length).toBe(1)
		})

		it("has an option with text L", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='L']").text()).toBe("L")
		})

		it("has value initialized to ''", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor']").prop("value")).toBe("")
		})

		it("changes value to selected option on change", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			form.find("select[name='maltColor']").simulate("change", {target: {name: "maltColor", value: "SRM"}})
			expect(form.find("select[name='maltColor']").prop("value")).toBe("SRM")
		})

		it("should set the maltColor to prop if set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} maltColor="SRM" />)
			expect(form.find("select[name='maltColor']").prop("value")).toBe("SRM")
		})

	})

	describe("beer color input", () => {

		it("is a select with name beerColor", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor']").length).toBe(1)
		})

		it("has option with value SRM", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='SRM']").length).toBe(1)
		})

		it("has option with text SRM", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='SRM']").text()).toBe("SRM")
		})

		it("has option with value ECB", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='ECB']").length).toBe(1)
		})

		it("has option with text ECB", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='ECB']").text()).toBe("ECB")
		})

		it("has option with value L", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='L']").length).toBe(1)
		})

		it("has option with text L", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='L']").text()).toBe("L")
		})

		it("has value initialized to ''", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor']").prop("value")).toBe("")
		})

		it("changes the value to the selected option on change", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			form.find("select[name='beerColor']").simulate("change", {target: {name: "beerColor", value: "SRM"}})
			expect(form.find("select[name='beerColor']").prop("value")).toBe("SRM")
		})

		it("should set the beerColor to prop if set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} beerColor="SRM" />)
			expect(form.find("select[name='beerColor']").prop("value")).toBe("SRM")
		})

	})

	describe("submit button", () => {

		it("should have a input of type submit", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("input[type='submit']").length).toBe(1)
		})

		it("should have value 'Save settings'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("input[type='submit']").prop("value")).toBe("Save settings")
		})

	})

	describe("submitting", () => {

		it("should call event.preventDefault", () => {
			let preventDefaultCalled = false
			const preventDefault = () => {preventDefaultCalled = true}
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			form.simulate("submit", {preventDefault})
			expect(preventDefaultCalled).toBe(true)
		})

		it("should call the onSubmit prop", () => {
			let onSubmitCalled = false
			const onSubmit = () => {onSubmitCalled = true}
			const form = shallow(<SettingsForm onSubmit={onSubmit} />)
			form.simulate("submit", { preventDefault() {}})
			expect(onSubmitCalled).toBe(true)
		})

		it("should pass the state to the onSubmit prop", () => {
			let onSubmitArgs = []
			const onSubmit = (weight, liquid, currency, maltColor, beerColor) => {
				onSubmitArgs = [weight, liquid, currency, maltColor, beerColor]
			}
			const form = shallow(<SettingsForm onSubmit={onSubmit}/>)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "metric"}})
			form.find("select[name='liquid']").simulate("change", {target: {name: "liquid", value: "metric"}})
			form.find("select[name='currency']").simulate("change", {target: {name: "currency", value: "USD"}})
			form.find("select[name='maltColor']").simulate("change", {target: {name: "maltColor", value: "SRM"}})
			form.find("select[name='beerColor']").simulate("change", {target: {name: "beerColor", value: "SRM"}})
			form.simulate("submit", {preventDefault() {}})
			expect(onSubmitArgs).toEqual(["metric", "metric", "USD", "SRM", "SRM"])
		})

	})

})