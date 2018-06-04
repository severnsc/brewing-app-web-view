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

export const tableViewModel = (itemLimit, currentPage) => {

  if(typeof itemLimit !== "number"){
    throw new TypeError(constructErrorMessage("itemLimit", "number", itemLimit))
  }

  if(typeof currentPage !== "number"){
    throw new TypeError(constructErrorMessage("currentPage", "number", currentPage))
  }

  return {
    itemLimit,
    currentPage
  }

}

export const filterableTableViewModel = (filterString) => {

  if(typeof filterString !== "string"){
    throw new TypeError(constructErrorMessage("filterString", "string", filterString))
  }

  return {
    filterString
  }

}

export const sortableTableViewModel = sortObject => {

  if(typeof sortObject !== "object"){
    throw new TypeError(constructErrorMessage("sortObject", "object", sortObject))
  }

  if(!Object.keys(sortObject).every(key => key === "sortBy" || key === "order")){
    throw new Error("sortObject object must only have keys sortBy and order")
  }

  if(!Object.values(sortObject).every(value => typeof value === "string")){
    throw new TypeError("All values of sortObject must be of type string!")
  }

  if(!["asc", "desc"].includes(sortObject.order)){
    throw new Error("Order must equal either 'asc' or 'desc'")
  }

  return {
    sortObject
  }

}