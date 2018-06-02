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

    const userCreated = await dispatchCreateUserAsync(username, password, email)
    
    if(userCreated){
      const userModel = userViewModel({username, password, email})
      return userModel
    }else{
      const signupModel = signupViewModel(
        true,
        "There was an error creating your account! Try again."
      )
      return signupModel
    }

  }

}