import constructErrorMessage from "./utils"

export const signupViewModel = (isUsernameUnique = true, error = "") => {

  if(typeof isUsernameUnique !== "boolean"){
    throw new TypeError(constructErrorMessage("isUsernameUnique", "boolean", isUsernameUnique))
  }

  if(typeof error !== "string"){
    throw new TypeError(constructErrorMessage("error", "string", error))
  }

  return {
    isUsernameUnique,
    error
  }

}

export const userViewModel = user => {

  if(typeof user !== "object" && !Array.isArray(user)){
    throw new TypeError(constructErrorMessage("user", "object", user))
  }

  if(typeof user.username !== "string"){
    throw new TypeError(constructErrorMessage("username", "string", user.username))
  }

  if(typeof user.email !== "string"){
    throw new TypeError(constructErrorMessage("email", "string", user.email))
  }

  return {
    username: user.username,
    email: user.email
  }

}

export const loginViewModel = (error = "") => {

  if(typeof error !== "string"){
    throw new TypeError(constructErrorMessage("error", "string", error))
  }

  return {
    error
  }

}

export const dashboardViewModel = (dashboardTableSort = {sortBy: "Item name", order: "asc"}, dashboardTableFilterString = "", dashboardItemLimit = 25, dashboardTableCurrentPage = 0) => {

  if(typeof dashboardTableSort !== "object"){
    throw new TypeError(constructErrorMessage("dashboardTableSort", "object", dashboardTableSort))
  }

  if(Object.keys(dashboardTableSort) !== ["sortBy", "order"]){
    throw new Error("dashboardTableSort object must only have keys sortBy and order")
  }

  if(!Object.values(dashboardTableSort).every(value => typeof value === "string")){
    throw new TypeError("All values of dashboardTableSort must be of type string!")
  }

  if(!["asc", "desc"].includes(dashboardTableSort.order)){
    throw new Error("Order must equal either 'asc' or 'desc'")
  }

  if(typeof dashboardTableFilterString !== ""){
    throw new TypeError(constructErrorMessage("dashboardTableFilterString", "string", dashboardTableFilterString))
  }

  if(typeof dashboardItemLimit !== "number"){
    throw new TypeError(constructErrorMessage("dashboardItemLimit", "number", dashboardItemLimit))
  }

  if(typeof dashboardTableCurrentPage !== "number"){
    throw new TypeError(constructErrorMessage("dashboardTableCurrentPage", "number", dashboardTableCurrentPage))
  }

  return {
    dashboardTableSort,
    dashboardTableFilterString,
    dashboardItemLimit,
    dashboardTableCurrentPage
  }

}