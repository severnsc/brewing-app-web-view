import {
  signupViewModel,
  userViewModel
} from './viewModel'

export const validateUsernamePresenter = dispatchIsUsernameUniqueAsync => {

  return async username => {

    const isUsernameUnique = 
      await dispatchIsUsernameUniqueAsync(username).catch(e => e)

    const signupModel = signupViewModel(isUsernameUnique)

    return signupModel

  }

}

export const createUserPresenter = dispatchCreateUserAsync => {

  return async (username, password, email) => {

    const user = await dispatchCreateUserAsync(username, password, email)
    const userModel = userViewModel(user)

    return userModel

  }

}