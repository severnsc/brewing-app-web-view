import constructErrorMessage from "./utils"

export const signupViewModel = isUsernameUnique => {

  if(typeof isUsernameUnique !== "boolean"){
    throw new TypeError(constructErrorMessage("isUsernameUnique", "boolean", isUsernameUnique))
  }

  return {
    isUsernameUnique
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