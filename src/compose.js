import {
  isUsernameUnique,
  createUser,
  loginUser
} from "./adapters/userAdapter"

export const validateUsernameAsync = async username => {

  const usernameIsUnique = 
    await isUsernameUnique(username).catch(e => e)

  return usernameIsUnique

}

export const createUserAsync = async (username, password, email) => {

  const userCreated = await createUser(username, password, email).catch(e => e)
  
  return userCreated

}

export const loginUserAsync = async (username, password) => {

	 const userLoggedIn = await loginUser(username, password).catch(e => e)

   return userLoggedIn

}