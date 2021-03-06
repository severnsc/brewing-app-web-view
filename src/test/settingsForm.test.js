import React from "react"
import renderer from "react-test-renderer"
import { SettingsForm } from "../components"
import { green } from "../components/constants"
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

const labelStyle = {
  display: "flex",
  flexFlow: "column",
  alignItems: "stretch",
  textAlign: "left",
  textTransform: "uppercase",
  color: "hsl(0, 0%, 50%)",
  fontSize: "0.75em",
  marginBottom: "10px"
}

const selectStyle = {
	margin:  "10px 0",
  fontSize: "1em"
}

describe("SettingsForm", () => {

	it("renders a renders a form component", () => {
		const form = renderer.create(
			<SettingsForm onSubmit={() => {}} />
		)
		let tree = form.toJSON()
		expect(tree).toMatchSnapshot()
	})

	describe("weight input", () => {

		it("has label for weight", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='weight']").length).toBe(1)
		})

		it("has a label with text weight", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='weight']").contains("Weight")).toBe(true)
		})

		it("has label with label style", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='weight']").prop("style")).toEqual(labelStyle)
		})

		it("has select with id weight", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("#weight").type()).toBe("select")
		})

		it("is named named weight", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight']").length).toBe(1)
		})

		it("is a select", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='weight']").type()).toBe('select')
		})

		it("has an option that is disabled", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='weight'] > option[disabled]").length).toBe(1)
		})

		it("has option with value of empty string", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='weight'] > option[value='']").length).toBe(1)
		})

		it("has disabled option with text '--- select weight units ---'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='weight'] > option[disabled]").text()).toBe("--- select weight units ---")
		})

		it("does not have a disabled option if the weight prop is set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} weight="imperial" />)
			expect(form.find("select[name='weight'] > option[disabled]").length).toBe(0)
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

		it("has margin 10px 0", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='weight']").prop("style").margin).toBe("10px 0")
		})

		it("has font size 1em", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='weight']").prop("style").fontSize).toBe("1em")
		})

	})

	describe("liquid input", () => {

		it("has label for liquid", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='liquid']").length).toBe(1)
		})

		it("has label with text liquid", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='liquid']").contains("Liquid")).toBe(true)
		})

		it("has label with labelStyle", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='liquid']").prop("style")).toEqual(labelStyle)
		})

		it("has select with id liquid", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("#liquid").type()).toBe("select")
		})

		it("has name liquid", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid']").length).toBe(1)
		})

		it("is a select tag", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='liquid']").type()).toBe("select")
		})

		it("has an option that is disabled", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='liquid'] > option[disabled]").length).toBe(1)
		})

		it("has option with value of empty string", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='liquid'] > option[value='']").length).toBe(1)
		})

		it("has disabled option with text '--- select liquid units ---'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='liquid'] > option[disabled]").text()).toBe("--- select liquid units ---")
		})

		it("does not have a disabled option if the liquid prop is set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} liquid="imperial" />)
			expect(form.find("select[name='liquid'] > option[disabled]").length).toBe(0)
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

		it("has margin 10px 0", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='liquid']").prop("style").margin).toBe("10px 0")
		})

		it("has font size 1em", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='liquid']").prop("style").fontSize).toBe("1em")
		})

	})

	describe("currency input", () => {

		it("has label for currency", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='currency']").length).toBe(1)
		})

		it("has label with text currency", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='currency']").contains("Currency")).toBe(true)
		})

		it("has label with labelStyle", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='currency']").prop("style")).toEqual(labelStyle)
		})

		it("has select with id currency", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("#currency").type()).toBe("select")
		})

		it("has name currency", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='currency']").length).toBe(1)
		})

		it("is a select tag", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("[name='currency']").type()).toBe("select")
		})

		it("has an option that is disabled", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='currency'] > option[disabled]").length).toBe(1)
		})

		it("has option with value of empty string", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='currency'] > option[value='']").length).toBe(1)
		})

		it("has disabled option with text '--- select currency units ---'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='currency'] > option[disabled]").text()).toBe("--- select currency units ---")
		})

		it("does not have a disabled option if the currency prop is set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} currency="USD" />)
			expect(form.find("select[name='currency'] > option[disabled]").length).toBe(0)
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

		it("has margin 10px 0", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='currency']").prop("style").margin).toBe("10px 0")
		})

		it("has font size 1em", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='currency']").prop("style").fontSize).toBe("1em")
		})

	})

	describe("malt color input", () => {

		it("has label for maltColor", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='maltColor']").length).toBe(1)
		})

		it("has label with text Malt color", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='maltColor']").contains("Malt color")).toBe(true)
		})

		it("has label with labelStyle", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='maltColor']").prop("style")).toEqual(labelStyle)
		})

		it("has select tag with id maltColor", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("#maltColor").type()).toBe("select")
		})

		it("is a select tag with name malt color", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor']").length).toBe(1)
		})

		it("has an option that is disabled", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[disabled]").length).toBe(1)
		})

		it("has option with value of empty string", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='']").length).toBe(1)
		})

		it("has disabled option with text '--- select maltColor units ---'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[disabled]").text()).toBe("--- select malt color units ---")
		})

		it("does not have a disabled option if maltColor prop is set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} maltColor="SRM"/>)
			expect(form.find("select[name='maltColor'] > option[disabled]").length).toBe(0)
		})

		it("has an option with value 'SRM'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='SRM']").length).toBe(1)
		})

		it("has an option with text SRM", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor'] > option[value='SRM']").text()).toBe("SRM")
		})

		it("has an option with value 'EBC", () => {
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

		it("has margin 10px 0", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor']").prop("style").margin).toBe("10px 0")
		})

		it("has font size 1em", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='maltColor']").prop("style").fontSize).toBe("1em")
		})

	})

	describe("beer color input", () => {

		it("has a label for beerColor", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='beerColor']").length).toBe(1)
		})

		it("has label with text Beer color", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='beerColor']").contains("Beer color")).toBe(true)
		})

		it("has label with labelStyle", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='beerColor']").prop("style")).toEqual(labelStyle)
		})

		it("has select with id beerColor", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("#beerColor").type()).toBe("select")
		})

		it("is a select with name beerColor", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor']").length).toBe(1)
		})

		it("has an option that is disabled", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[disabled]").length).toBe(1)
		})

		it("has option with value of empty string", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='']").length).toBe(1)
		})

		it("has disabled option with text '--- select beer color units ---'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[disabled]").text()).toBe("--- select beer color units ---")
		})

		it("does not have a disabled option if beerColor prop is set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} beerColor="SRM" />)
			expect(form.find("select[name='beerColor'] > option[disabled]").length).toBe(0)
		})

		it("has option with value SRM", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='SRM']").length).toBe(1)
		})

		it("has option with text SRM", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='SRM']").text()).toBe("SRM")
		})

		it("has option with value EBC", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='EBC']").length).toBe(1)
		})

		it("has option with text EBC", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor'] > option[value='EBC']").text()).toBe("EBC")
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

		it("has margin 10px 0", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor']").prop("style").margin).toBe("10px 0")
		})

		it("has font size 1em", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='beerColor']").prop("style").fontSize).toBe("1em")
		})

	})

	describe("date format input", () => {

		it("has a label for date format", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='dateFormat']").length).toBe(1)
		})

		it("has a label with text Date format", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='dateFormat']").contains("Date format")).toBe(true)
		})

		it("has a label with label style", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("label[htmlFor='dateFormat']").prop("style")).toEqual(labelStyle)
		})

		it("has select with id dateFormat", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("#dateFormat").type()).toBe("select")
		})

		it("has select with name dateFormat", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat']").length).toBe(1)
		})

		it("has a disabled option", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[disabled]").length).toBe(1)
		})

		it("has a disabled option with value ''", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[disabled]").prop("value")).toBe("")
		})

		it("has a disabled option with text --- select date format ---", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[disabled]").text()).toBe("--- select date format ---")
		})

		it("does not display disabled option if dateFormat prop is set", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} dateFormat={"MM/DD/YYYY"} />)
			expect(form.find("select[name='dateFormat'] > option[disabled]").length).toBe(0)
		})

		it("has an option with value 'MM/DD/YYYY'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[value='MM/DD/YYYY']").length).toBe(1)
		})

		it("has an option with text 'MM/DD/YYYY'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[value='MM/DD/YYYY']").text()).toBe("MM/DD/YYYY")
		})

		it("has an option with value 'MM/DD/YY'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[value='MM/DD/YY']").length).toBe(1)
		})

		it("has an option with text 'MM/DD/YY'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[value='MM/DD/YY']").text()).toBe("MM/DD/YY")
		})

		it("has an option with value 'YYYY-MM-DD'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[value='YYYY-MM-DD']").length).toBe(1)
		})

		it("has an option with text 'YYYY-MM-DD'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat'] > option[value='YYYY-MM-DD']").text()).toBe("YYYY-MM-DD")
		})

		it("should initialize with value of ''", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat']").prop("value")).toBe("")
		})

		it("should change the value on change", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			form.find("select[name='dateFormat']").simulate("change", {target: {name: "dateFormat", value: "MM/DD/YYYY"}})
			expect(form.find("select[name='dateFormat']").prop("value")).toBe("MM/DD/YYYY")
		})

		it("should set the value equal to the prop", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} dateFormat="MM/DD/YYYY" />)
			expect(form.find("select[name='dateFormat']").prop("value")).toBe("MM/DD/YYYY")
		})

		it("should have style equal to select style", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("select[name='dateFormat']").prop("style")).toEqual(selectStyle)
		})

	})

	describe("submit button", () => {

		const button = {
			fontSize: "1em",
	    padding: "10px",
	    borderRadius: "20px",
	    color: "hsla(0, 0%, 100%, 0.85)",
	    background: green,
	    border: "none",
	    appearance: "none",
	    "WebkitAppearance": "none",
	    "MozAppearance": "none",
	    cursor: "pointer",
	    minWidth: "10em"
	  }

	  const disabled = {
			background: "hsl(0, 0%, 90%)",
			cursor: "default"
		}

		it("should have a input of type submit", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("input[type='submit']").length).toBe(1)
		})

		it("should have value 'Save settings'", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("input[type='submit']").prop("value")).toBe("Save settings")
		})

		it("should be disabled on mount", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("input[type='submit']").prop("disabled")).toBe(true)
		})

		it("should be enabled when a input value changes from initial value", () => {
			const form = shallow(
				<SettingsForm
					onSubmit={() => {}}
					weight="imperial"
					liquid="imperial"
					currency="USD"
					maltColor="SRM"
					beerColor="SRM"
					dateFormat="MM/DD/YYYY"
				/>
			)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "metric"}})
			expect(form.find("input[type='submit']").prop("disabled")).toBe(false)
		})

		it("should be disabled if any inputs are empty strings", () => {
			const form = shallow(
				<SettingsForm
					onSubmit={() => {}}
					weight="imperial"
					liquid="imperial"
					currency="USD"
					maltColor="SRM"
					beerColor="SRM"
				/>
			)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: ""}})
			expect(form.find("input[type='submit']").prop("disabled")).toBe(true)
		})

		it("should be enabled if all values are not empty strings and at least one value updated from initial value", () => {
			const form = shallow(
				<SettingsForm
					onSubmit={() => {}}
					weight="imperial"
					liquid="imperial"
					currency="USD"
					maltColor="SRM"
					beerColor="SRM"
					dateFormat="MM/DD/YYYY"
				/>
			)
			expect(form.find("input[type='submit']").prop("disabled")).toBe(true)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "EBC"}})
			expect(form.find("input[type='submit']").prop("disabled")).toBe(false)
		})

		it("should have button style when disabled is false", () => {
			const form = shallow(
				<SettingsForm
					onSubmit={() => {}}
					weight="imperial"
					liquid="imperial"
					currency="USD"
					maltColor="SRM"
					beerColor="SRM"
					dateFormat="MM/DD/YYYY"
				/>
			)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "EBC"}})
			expect(form.find("input[type='submit']").prop("style")).toEqual(button)
		})

		it("should have disabled style when disabled is true", () => {
			const form = shallow(<SettingsForm onSubmit={() => {}} />)
			expect(form.find("input[type='submit']").prop("style")).toEqual({...button, ...disabled})
		})

	})

	describe("submitting", () => {

		it("should call event.preventDefault", () => {
			let preventDefaultCalled = false
			const preventDefault = () => {preventDefaultCalled = true}
			const form = mount(<SettingsForm onSubmit={() => {}} />)
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
			const onSubmit = (weight, liquid, currency, maltColor, beerColor, dateFormat) => {
				onSubmitArgs = [weight, liquid, currency, maltColor, beerColor, dateFormat]
			}
			const form = shallow(<SettingsForm onSubmit={onSubmit}/>)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "metric"}})
			form.find("select[name='liquid']").simulate("change", {target: {name: "liquid", value: "metric"}})
			form.find("select[name='currency']").simulate("change", {target: {name: "currency", value: "USD"}})
			form.find("select[name='maltColor']").simulate("change", {target: {name: "maltColor", value: "SRM"}})
			form.find("select[name='beerColor']").simulate("change", {target: {name: "beerColor", value: "SRM"}})
			form.find("select[name='dateFormat']").simulate("change", {target: {name: "dateFormat", value: "MM/DD/YYYY"}})
			form.simulate("submit", {preventDefault() {}})
			expect(onSubmitArgs).toEqual(["metric", "metric", "USD", "SRM", "SRM", "MM/DD/YYYY"])
		})

		it("should reset the submit input back to disabled", () => {
			const form = shallow(
				<SettingsForm
					onSubmit={() => {}}
					weight="imperial"
					liquid="imperial"
					currency="USD"
					maltColor="SRM"
					beerColor="SRM"
				/>
			)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "EBC"}})
			form.simulate("submit", {preventDefault() {}})
			expect(form.find("input[type='submit']").prop("disabled")).toBe(true)
		})

		it("should be disabled if change input and then change it back", () => {
			const form = shallow(
				<SettingsForm
					onSubmit={() => {}}
					weight="imperial"
					liquid="imperial"
					currency="USD"
					maltColor="SRM"
					beerColor="SRM"
					dateFormat="MM/DD/YYYY"
				/>
			)
			const submit = "input[type='submit']"
			expect(form.find(submit).prop("disabled")).toBe(true)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "metric"}})
			expect(form.find(submit).prop("disabled")).toBe(false)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "imperial"}})
			expect(form.find(submit).prop("disabled")).toBe(true)
		})

		it("should be enabled if changed multiple and change one back", () => {
			const form = shallow(
				<SettingsForm
					onSubmit={() => {}}
					weight="imperial"
					liquid="imperial"
					currency="USD"
					maltColor="SRM"
					beerColor="SRM"
					dateFormat="MM/DD/YYYY"
				/>
			)
			const submit = "input[type='submit']"
			expect(form.find(submit).prop("disabled")).toBe(true)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "metric"}})
			form.find("select[name='liquid']").simulate("change", {target: {name: "liquid", value: "metric"}})
			expect(form.find(submit).prop("disabled")).toBe(false)
			form.find("select[name='weight']").simulate("change", {target: {name: "weight", value: "imperial"}})
			expect(form.find(submit).prop("disabled")).toBe(false)
		})

	})

})