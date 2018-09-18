import React, { Fragment } from 'react'
import { Tabs, Tab } from "../components"
import MaltInventoryTableContainer from "../containers/maltInventoryTableContainer"
import MaltInventoryTableSearchBarContainer from "../containers/maltInventoryTableSearchBarContainer"
import HopsInventoryTableContainer from "../containers/hopsInventoryTableContainer"
import HopsInventoryTableSearchBarContainer from "../containers/hopsInventoryTableSearchBarContainer"
import YeastInventoryTableContainer from "../containers/yeastInventoryTableContainer"
import YeastInventoryTableSearchBarContainer from "../containers/yeastInventoryTableSearchBarContainer"
import OtherInventoriesTableContainer from "../containers/otherInventoriesTableContainer"
import OtherInventoriesTableSearchBarContainer from "../containers/otherInventoriesTableSearchBarContainer"

const MaltComponent = (
  <Fragment key="Malt">
    <h2>Malt</h2>
    <MaltInventoryTableSearchBarContainer />
    <MaltInventoryTableContainer />
  </Fragment>
)

const HopsComponent = (
  <Fragment key="Hops">
    <h2>Hops</h2>
    <HopsInventoryTableSearchBarContainer />
    <HopsInventoryTableContainer />
  </Fragment>
)

const YeastComponent = (
  <Fragment key="Yeast">
    <h2>Yeast</h2>
    <YeastInventoryTableSearchBarContainer />
    <YeastInventoryTableContainer />
  </Fragment>
)

const OtherComponent = (
  <Fragment key="Other">
    <h2>Other</h2>
    <OtherInventoriesTableSearchBarContainer />
    <OtherInventoriesTableContainer />
  </Fragment>
)

const Inventories = () => (
	<div style={{width: "75%"}}>
    <h1>Inventories</h1>
    <Tabs>
      <Tab key="Malt" label="Malt" component={MaltComponent} active={true} />
      <Tab key="Hops" label="Hops" component={HopsComponent} active={false} />
      <Tab key="Yeat" label="Yeast" component={YeastComponent} active={false} />
      <Tab key="Other" label="Other" component={OtherComponent} active={false} />
    </Tabs>
  </div>
)

export default Inventories