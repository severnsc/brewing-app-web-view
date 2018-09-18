import React, { Component } from "react"
import PropTypes from "prop-types"
import { Tab } from ".."
import styles from "./styles"

class Tabs extends Component {

	state = {
		activeTab: ""
	}

	componentDidMount() {
		this.setState({ activeTab: this.props.children.find(child => child.props.active).props.label })
	}

	changeActiveTab = label => {
		this.setState({ activeTab: label })
	}

	render() {

		const { children } = this.props
		const { activeTab } = this.state

		return(
			<div>
				<ol style={styles.header}>
					{children.map(child => (
						<Tab
							key={child.props.label}
							onClick={this.changeActiveTab}
							label={child.props.label}
							active={child.props.label === activeTab}
							component={child.props.component}
						/>
					))}
				</ol>
				<div>
					{children.map(child => (
						child.props.label === activeTab ? child.props.component : null
					))}
				</div>
			</div>
		)

	}

}

Tabs.propTypes = {
	children: PropTypes.array.isRequired
}

export default Tabs